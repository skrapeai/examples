import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { type HackerNewsStory, fetchHackerNewsStories } from "./lib/api";

function StoryList() {
  const {
    data: stories,
    isLoading,
    error,
    isFetching,
    isStale,
  } = useQuery({
    queryKey: ["stories"],
    queryFn: fetchHackerNewsStories,
    staleTime: 2 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000,
  });

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto space-y-4">
        {[...Array(10)].map((_, index) => (
          <div
            key={`skeleton-${index}`}
            className="bg-white rounded-xl shadow-sm p-4 animate-pulse"
          >
            <div className="flex items-start gap-4">
              <div className="bg-orange-100 rounded-lg w-8 h-8 flex items-center justify-center shrink-0">
                <div className="h-4 w-4 bg-orange-200 rounded" />
              </div>
              <div className="flex-1 space-y-3">
                <div className="h-5 bg-gray-200 rounded-md w-3/4" />
                <div className="h-4 bg-gray-100 rounded-md w-1/3" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-red-50 border border-red-100 text-red-600 rounded-xl p-6 text-center">
          <div className="font-semibold mb-1">Error loading stories</div>
          <div className="text-sm text-red-500">Please try again later</div>
        </div>
      </div>
    );
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
        <div
          key={`${story.title}-${story.url}`}
          className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-4"
        >
          <div className="flex items-start gap-4">
            <div className="bg-orange-100 rounded-lg w-8 h-8 flex items-center justify-center font-mono text-orange-600 shrink-0 group-hover:bg-orange-200 transition-colors">
              {index + 1}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start gap-2">
                <a
                  href={story.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-900 font-medium hover:text-orange-500 transition-colors line-clamp-2"
                >
                  {story.title}
                </a>
                <ArrowTopRightOnSquareIcon className="h-4 w-4 text-gray-400 shrink-0 mt-1" />
              </div>
              <div className="mt-2 text-sm text-gray-500 flex items-center gap-2">
                <span className="font-medium text-gray-700">
                  {story.score} points
                </span>
                <span className="text-gray-400">•</span>
                <span>by {story.author}</span>
                <span className="text-gray-400">•</span>
                <a
                  href={`https://news.ycombinator.com/item?id=${story.storyId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-orange-500 transition-colors"
                >
                  {story.commentCount} comments
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

const App = () => {
  const queryClient = useQueryClient();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <header className="bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">
            Modern HackerNews
          </h1>
          <div className="relative group">
            <button
              onClick={() => {
                queryClient.clear();
                localStorage.clear();
                window.location.reload();
              }}
              className="px-3 py-1 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg text-sm transition-colors"
            >
              Flush Cache
            </button>
            <div className="absolute opacity-0 invisible group-hover:opacity-100 group-hover:visible top-full mt-2 left-1/2 -translate-x-1/2 transition-all duration-200 ease-out transform group-hover:translate-y-0 translate-y-1">
              <div className="bg-gray-900 text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap">
                Clear cached data and fetch fresh stories
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 -mb-px border-4 border-transparent border-b-gray-900" />
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className="mt-6 px-4 pb-20">
        <StoryList />
      </main>
    </div>
  );
};

export default App;
