import { useQuery } from "@tanstack/react-query";
import { type HackerNewsStory, fetchHackerNewsStories } from "../../lib/api";
import { StoryError } from "./story-error";
import { StoryItem } from "./story-item";
import { StorySkeletonLoader } from "./story-skeleton-loader";

export function StoryList() {
  const {
    data: stories,
    isLoading,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["stories"],
    queryFn: fetchHackerNewsStories,
    staleTime: 2 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000,
  });

  if (isLoading) {
    return <StorySkeletonLoader />;
  }

  if (error) {
    return <StoryError />;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      {isFetching && !isLoading && (
        <div className="fixed top-4 right-4 bg-orange-500 bg-opacity-95 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm shadow-lg transition-all duration-300 ease-in-out">
          <div className="flex items-center gap-2">
            <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
            Refreshing...
          </div>
        </div>
      )}
      {stories?.map((story: HackerNewsStory, index: number) => (
        <StoryItem
          key={`${story.title}-${story.url}`}
          story={story}
          index={index}
        />
      ))}
    </div>
  );
}
