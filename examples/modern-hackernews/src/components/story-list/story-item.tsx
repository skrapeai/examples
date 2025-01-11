import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { type HackerNewsStory } from "../../lib/api";

interface StoryItemProps {
  story: HackerNewsStory;
  index: number;
}

export function StoryItem({ story, index }: StoryItemProps) {
  return (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-4">
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
  );
}
