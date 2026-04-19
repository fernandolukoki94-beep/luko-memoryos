import { useState, useCallback } from "react";

export interface UserSearchResult {
  id: string;
  displayName: string;
  email: string;
  photoURL?: string;
  bio?: string;
  followers: number;
  isFollowing?: boolean;
}

export function useUserSearch() {
  const [results, setResults] = useState<UserSearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const searchUsers = useCallback(async (query: string) => {
    if (!query.trim()) {
      setResults([]);
      setSearchQuery("");
      return;
    }

    setSearchQuery(query);
    setIsSearching(true);

    try {
      // Simulated search results - em produção, isto viria de uma API/Firestore
      const mockResults: UserSearchResult[] = [
        {
          id: "user1",
          displayName: "João Silva",
          email: "joao@example.com",
          photoURL: "https://d2xsxph8kpxj0f.cloudfront.net/310519663550783227/WhiKSnB8XZrFxSQpnnwhMw/luko-profile-avatar-FFCeRVUABGq3ckRYJf7PsM.webp",
          bio: "Fotógrafo e viajante",
          followers: 1250,
          isFollowing: false,
        },
        {
          id: "user2",
          displayName: "Maria Santos",
          email: "maria@example.com",
          photoURL: "https://d2xsxph8kpxj0f.cloudfront.net/310519663550783227/WhiKSnB8XZrFxSQpnnwhMw/luko-profile-avatar-FFCeRVUABGq3ckRYJf7PsM.webp",
          bio: "Designer e criativa",
          followers: 890,
          isFollowing: true,
        },
        {
          id: "user3",
          displayName: "Pedro Costa",
          email: "pedro@example.com",
          photoURL: "https://d2xsxph8kpxj0f.cloudfront.net/310519663550783227/WhiKSnB8XZrFxSQpnnwhMw/luko-profile-avatar-FFCeRVUABGq3ckRYJf7PsM.webp",
          bio: "Desenvolvedor e tech enthusiast",
          followers: 2100,
          isFollowing: false,
        },
      ];

      // Filter results based on query
      const filtered = mockResults.filter(
        (user) =>
          user.displayName.toLowerCase().includes(query.toLowerCase()) ||
          user.email.toLowerCase().includes(query.toLowerCase())
      );

      setResults(filtered);
    } catch (error) {
      console.error("Erro ao pesquisar utilizadores:", error);
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

  const clearSearch = useCallback(() => {
    setResults([]);
    setSearchQuery("");
  }, []);

  return {
    results,
    isSearching,
    searchQuery,
    searchUsers,
    clearSearch,
  };
}
