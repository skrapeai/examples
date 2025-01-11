const API_KEY = import.meta.env.PUBLIC_SKRAPE_API_KEY;

import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

if (!API_KEY) {
  throw new Error("PUBLIC_SKRAPE_API_KEY is not set in environment variables");
}

const schema = z.object({
  topStories: z
    .array(
      z.object({
        title: z.string().describe("The title of the story"),
        url: z.string().describe("The URL of the story"),
        score: z.number().describe("The score of the story"),
        author: z.string().describe("The author of the story"),
        commentCount: z.number().describe("The number of comments"),
        storyId: z.number().describe("The ID of the story"),
      })
    )
    .min(20)
    .max(30),
});

export type HackerNewsStory = z.infer<typeof schema>["topStories"][number];

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
        schema: zodToJsonSchema(schema),
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
