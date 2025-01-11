import { Skrape, SkrapeError } from "skrape-js";
import { z } from "zod";

const skrape = new Skrape({
  apiKey: import.meta.env.PUBLIC_SKRAPE_API_KEY,
});

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
    const result = await skrape.extract("https://news.ycombinator.com", schema);
    return result.topStories ?? [];
  } catch (error) {
    if (error instanceof SkrapeError) {
      console.error(
        "Skrape API error:",
        error.message,
        "Status:",
        error.status
      );
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
}
