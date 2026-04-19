import { useState, useEffect } from "react";
import { Search, X, Loader2, UserPlus, Check } from "lucide-react";
import { useUserSearch } from "@/hooks/useUserSearch";
import { Button } from "@/components/ui/button";

export default function UserSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [followingUsers, setFollowingUsers] = useState<Set<string>>(new Set());
  const { results, isSearching, searchQuery, searchUsers, clearSearch } = useUserSearch();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    if (query) {
      searchUsers(query);
    } else {
      clearSearch();
    }
  };

  const handleFollow = (userId: string) => {
    setFollowingUsers((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(userId)) {
        newSet.delete(userId);
      } else {
        newSet.add(userId);
      }
      return newSet;
    });
  };

  const handleClose = () => {
    setIsOpen(false);
    clearSearch();
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
      >
        <Search size={24} className="text-gray-700" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-2xl shadow-2xl border-2 border-gray-100 z-50">
          <div className="p-4 border-b-2 border-gray-100">
            <div className="relative">
              <input
                type="text"
                placeholder="Procura utilizadores..."
                onChange={handleSearch}
                autoFocus
                className="w-full bg-gray-100 rounded-full px-4 py-3 pl-10 outline-none focus:ring-2 focus:ring-pink-500 transition-all"
              />
              <Search size={18} className="absolute left-3 top-3.5 text-gray-400" />
              {searchQuery && (
                <button
                  onClick={handleClose}
                  className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {isSearching ? (
              <div className="p-8 text-center">
                <Loader2 className="animate-spin mx-auto mb-2 text-pink-500" size={32} />
                <p className="text-gray-600 font-semibold">Procurando...</p>
              </div>
            ) : results.length === 0 && searchQuery ? (
              <div className="p-8 text-center text-gray-500">
                <Search size={32} className="mx-auto mb-2 opacity-50" />
                <p className="font-semibold">Nenhum utilizador encontrado</p>
              </div>
            ) : results.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <Search size={32} className="mx-auto mb-2 opacity-50" />
                <p className="font-semibold">Começa a procurar</p>
              </div>
            ) : (
              results.map((user) => (
                <div
                  key={user.id}
                  className="p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors flex items-center gap-3"
                >
                  <img
                    src={user.photoURL}
                    alt={user.displayName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 truncate">
                      {user.displayName}
                    </p>
                    <p className="text-sm text-gray-600 truncate">{user.bio}</p>
                    <p className="text-xs text-gray-500">
                      {user.followers} seguidores
                    </p>
                  </div>
                  <Button
                    onClick={() => handleFollow(user.id)}
                    className={`flex-shrink-0 ${
                      followingUsers.has(user.id)
                        ? "btn-secondary-playful"
                        : "btn-primary-playful"
                    }`}
                  >
                    {followingUsers.has(user.id) ? (
                      <Check size={18} />
                    ) : (
                      <UserPlus size={18} />
                    )}
                  </Button>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
