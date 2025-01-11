import { FlushCacheButton } from "./flush-cache-button";

export function Header() {
  return (
    <header className="bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg sticky top-0 z-10">
      <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Modern HackerNews</h1>
        <FlushCacheButton />
      </div>
    </header>
  );
}
