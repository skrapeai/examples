import { useQueryClient } from "@tanstack/react-query";

export function FlushCacheButton() {
  const queryClient = useQueryClient();

  return (
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
  );
}
