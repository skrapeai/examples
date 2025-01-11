export function StoryError() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-red-50 border border-red-100 text-red-600 rounded-xl p-6 text-center">
        <div className="font-semibold mb-1">Error loading stories</div>
        <div className="text-sm text-red-500">Please try again later</div>
      </div>
    </div>
  );
}
