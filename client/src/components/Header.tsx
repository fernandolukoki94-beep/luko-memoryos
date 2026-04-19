import NotificationBell from "./NotificationBell";
import UserSearch from "./UserSearch";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white border-b-2 border-gray-100 shadow-sm">
      <div className="container max-w-full mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-cyan-400 flex items-center justify-center">
            <span className="text-white font-bold text-lg">L</span>
          </div>
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-500">
            Luko Social
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <UserSearch />
          <NotificationBell />
        </div>
      </div>
    </header>
  );
}
