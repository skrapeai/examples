import { Header } from "./components/header/header";
import { StoryList } from "./components/story-list/story-list";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Header />
      <main className="mt-6 px-4 pb-20">
        <StoryList />
      </main>
    </div>
  );
}
