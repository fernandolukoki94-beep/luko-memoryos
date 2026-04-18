import { Home, MessageCircle, User } from "lucide-react";
import { useLocation } from "wouter";

export default function BottomNav() {
  const [location, setLocation] = useLocation();

  const navItems = [
    { path: "/", icon: Home, label: "Feed", active: location === "/" },
    { path: "/chat", icon: MessageCircle, label: "Chat", active: location === "/chat" },
    { path: "/profile", icon: User, label: "Perfil", active: location === "/profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-100 md:hidden z-40">
      <div className="flex items-center justify-around">
        {navItems.map(({ path, icon: Icon, label, active }) => (
          <button
            key={path}
            onClick={() => setLocation(path)}
            className={`flex-1 flex flex-col items-center justify-center py-3 transition-colors ${
              active
                ? "text-pink-500 bg-pink-50"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <Icon size={24} />
            <span className="text-xs font-semibold mt-1">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
