export function StorySkeletonLoader() {
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
