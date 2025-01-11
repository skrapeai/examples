import os
import json
import time
import requests
import streamlit as st
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

# Initialize OpenAI client
client = OpenAI()
SKRAPE_API_KEY = os.getenv("SKRAPE_API_KEY")

def log_debug_info(title, content):
    with st.expander("🔍 Debug Info", expanded=False):
        st.markdown(f"**{title}**")
        st.markdown(content)

def get_wikipedia_url(title):
    return f"https://en.wikipedia.org/wiki/{title.replace(' ', '_')}"

def convert_to_markdown(url):
    start_time = time.time()
    st.write(f"🔗 Processing: {url}")
    skrape_url = "https://skrape.ai/api/markdown"
    headers = {
        "Authorization": f"Bearer {SKRAPE_API_KEY}",
        "Content-Type": "application/json"
    }
    data = {"url": url}
    
    response = requests.post(skrape_url, headers=headers, json=data)
    
    if response.status_code != 200:
        st.error(f"Skrape API error: {response.status_code}")
        raise Exception(f"Skrape API error: {response.status_code}")
    
    result = response.json()["result"]
    duration = time.time() - start_time
    
    log_debug_info("Skrape API Response", f"""
    - Response time: {duration:.2f}s
    - Content length: {len(result)} characters
    - First 100 chars: {result[:100]}...
    """)
    
    return result

def search_wikipedia(query):
    start_time = time.time()
    url = "https://en.wikipedia.org/w/api.php"
    params = {
        "action": "query",
        "format": "json",
        "list": "search",
        "srsearch": query
    }
    response = requests.get(url, params=params)
    results = response.json()
    duration = time.time() - start_time
    
    search_results = results['query']['search']
    result_titles = "\n".join([f"- {r['title']}" for r in search_results[:3]])
    
    log_debug_info("Wikipedia Search Results", f"""
    - Query time: {duration:.2f}s
    - Total results: {len(search_results)}
    - Top 3 matches:
    {result_titles}
    """)
    
    return results

def get_ai_response(query, context):
    start_time = time.time()
    messages = [
        {"role": "system", "content": "You are a helpful assistant that answers questions based on Wikipedia content. Keep answers concise and relevant."},
        {"role": "user", "content": f"Based on the following Wikipedia content, please answer this question: {query}\n\nContent: {context}"}
    ]
    
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=messages,
        temperature=0.7,
        max_tokens=500
    )
    
    duration = time.time() - start_time
    answer = response.choices[0].message.content
    
    log_debug_info("AI Response Stats", f"""
    - Processing time: {duration:.2f}s
    - Response length: {len(answer)} characters
    - First 100 chars: {answer[:100]}...
    """)
    
    return answer

# Streamlit UI
st.title("Wikipedia AI Assistant")
st.write("Ask me anything, and I'll search Wikipedia to help answer your question!")

# Initialize chat history
if "messages" not in st.session_state:
    st.session_state.messages = []

# Display chat history
for message in st.session_state.messages:
    with st.chat_message(message["role"]):
        st.markdown(message["content"])

# Chat input
if prompt := st.chat_input("What would you like to know?"):
    # Display user message
    st.chat_message("user").markdown(prompt)
    st.session_state.messages.append({"role": "user", "content": prompt})
    
    try:
        # Search Wikipedia
        with st.spinner("Searching Wikipedia..."):
            search_results = search_wikipedia(prompt)
            if search_results["query"]["search"]:
                # Get the first result and convert its URL
                first_result = search_results["query"]["search"][0]
                wiki_url = get_wikipedia_url(first_result["title"])
                
                # Convert HTML to markdown using Skrape
                markdown_content = convert_to_markdown(wiki_url)
                
                # Get AI response
                response = get_ai_response(prompt, markdown_content)
                
                # Display assistant response
                st.chat_message("assistant").markdown(response)
                st.session_state.messages.append({"role": "assistant", "content": response})
            else:
                st.error("No Wikipedia results found for your query.")
    except Exception as e:
        st.error(f"An error occurred: {str(e)}")
        st.write("Please try again with a different query.") 