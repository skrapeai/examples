const API_KEY = import.meta.env.PUBLIC_SKRAPE_API_KEY;

if (!API_KEY) {
  throw new Error("PUBLIC_SKRAPE_API_KEY is not set in environment variables");
}

export interface HackerNewsStory {
  title: string;
  url: string;
  score: number;
  author: string;
  commentCount: number;
}

export async function fetchHackerNewsStories(): Promise<HackerNewsStory[]> {
  try {
    const response = await fetch("https://skrape.ai/api/extract", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: "https://news.ycombinator.com",
        schema: {
          type: "object",
          properties: {
            topStories: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  title: { type: "string" },
                  url: { type: "string" },
                  score: { type: "number" },
                  author: { type: "string" },
                  commentCount: { type: "number" },
                },
              },
              minItems: 10,
              maxItems: 30,
            },
          },
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to fetch stories: ${response.status} ${errorText}`
      );
    }

    const data = await response.json();

    return data.result.topStories ?? [];
  } catch (error) {
    console.error("API error:", error);
    throw error;
  }
}
