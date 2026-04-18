import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Share2, Search } from "lucide-react";
import { Post } from "@/lib/types";
import { toast } from "sonner";

// Mock posts data
const mockPosts: Post[] = [
  {
    id: "1",
    uid: "user1",
    author: {
      uid: "user1",
      email: "user1@example.com",
      displayName: "João Silva",
      photoURL:
        "https://d2xsxph8kpxj0f.cloudfront.net/310519663550783227/WhiKSnB8XZrFxSQpnnwhMw/luko-profile-avatar-FFCeRVUABGq3ckRYJf7PsM.webp",
      followers: 1250,
      following: 340,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    caption: "Dia perfeito na praia! 🌊☀️",
    imageURL:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663550783227/WhiKSnB8XZrFxSQpnnwhMw/luko-feed-pattern-UJy82QBihxRYcN9JajTs7e.webp",
    likes: 342,
    comments: 45,
    createdAt: Date.now() - 3600000,
    updatedAt: Date.now() - 3600000,
    likedBy: [],
  },
  {
    id: "2",
    uid: "user2",
    author: {
      uid: "user2",
      email: "user2@example.com",
      displayName: "Maria Costa",
      photoURL:
        "https://d2xsxph8kpxj0f.cloudfront.net/310519663550783227/WhiKSnB8XZrFxSQpnnwhMw/luko-profile-avatar-FFCeRVUABGq3ckRYJf7PsM.webp",
      followers: 2100,
      following: 520,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    caption: "Novo café favorito descoberto! ☕✨",
    imageURL:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663550783227/WhiKSnB8XZrFxSQpnnwhMw/luko-feed-pattern-UJy82QBihxRYcN9JajTs7e.webp",
    likes: 567,
    comments: 89,
    createdAt: Date.now() - 7200000,
    updatedAt: Date.now() - 7200000,
    likedBy: [],
  },
];

export default function Feed() {
  const { userProfile } = useAuth();
  const [posts] = useState<Post[]>(mockPosts);
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");

  const handleLike = (postId: string) => {
    setLikedPosts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
        toast.success("Post removido dos favoritos");
      } else {
        newSet.add(postId);
        toast.success("Post adicionado aos favoritos! ❤️");
      }
      return newSet;
    });
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (hours < 1) return "Agora";
    if (hours < 24) return `${hours}h atrás`;
    if (days < 7) return `${days}d atrás`;
    return date.toLocaleDateString("pt-PT");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-cyan-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b-2 border-gray-100 shadow-sm">
        <div className="container max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-500">
            Luko
          </h1>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center bg-gray-100 rounded-full px-4 py-2 flex-1 max-w-xs">
              <Search size={18} className="text-gray-400" />
              <input
                type="text"
                placeholder="Procura..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent ml-2 outline-none text-sm w-full"
              />
            </div>
            <Button className="btn-secondary-playful">Chat</Button>
          </div>
        </div>
      </header>

      {/* Main Feed */}
      <main className="container max-w-2xl mx-auto px-4 py-8 space-y-6">
        {/* Stories Section */}
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="flex-shrink-0 w-20 h-28 rounded-2xl bg-gradient-to-br from-pink-300 to-cyan-300 cursor-pointer hover:scale-105 transition-transform shadow-lg snap-start"
            />
          ))}
        </div>

        {/* Create Post Button */}
        <div className="card-playful bg-gradient-to-r from-pink-100 to-cyan-100 border-2 border-pink-200">
          <div className="flex items-center gap-3">
            <img
              src={
                userProfile?.photoURL ||
                "https://d2xsxph8kpxj0f.cloudfront.net/310519663550783227/WhiKSnB8XZrFxSQpnnwhMw/luko-profile-avatar-FFCeRVUABGq3ckRYJf7PsM.webp"
              }
              alt="Avatar"
              className="w-12 h-12 rounded-full object-cover"
            />
            <input
              type="text"
              placeholder="O que está na tua mente?"
              className="flex-1 bg-white rounded-full px-4 py-2 outline-none border-2 border-gray-200 focus:border-pink-500 transition-colors"
            />
            <Button className="btn-primary-playful">Partilhar</Button>
          </div>
        </div>

        {/* Posts */}
        {posts.map((post) => {
          const isLiked = likedPosts.has(post.id);
          return (
            <div key={post.id} className="card-playful">
              {/* Post Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={post.author.photoURL}
                    alt={post.author.displayName}
                    className="w-12 h-12 rounded-full object-cover border-2 border-pink-300"
                  />
                  <div>
                    <h3 className="font-bold text-gray-900">
                      {post.author.displayName}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {formatDate(post.createdAt)}
                    </p>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  ⋯
                </button>
              </div>

              {/* Post Image */}
              <img
                src={post.imageURL}
                alt={post.caption}
                className="w-full rounded-2xl object-cover mb-4 max-h-96"
              />

              {/* Post Caption */}
              <p className="text-gray-800 mb-4 font-medium">{post.caption}</p>

              {/* Post Actions */}
              <div className="flex items-center justify-between mb-4 pb-4 border-b-2 border-gray-100">
                <button
                  onClick={() => handleLike(post.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                    isLiked
                      ? "bg-pink-100 text-pink-500"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Heart
                    size={20}
                    fill={isLiked ? "currentColor" : "none"}
                  />
                  <span className="text-sm font-semibold">{post.likes}</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-full text-gray-600 hover:bg-gray-100 transition-colors">
                  <MessageCircle size={20} />
                  <span className="text-sm font-semibold">{post.comments}</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-full text-gray-600 hover:bg-gray-100 transition-colors">
                  <Share2 size={20} />
                </button>
              </div>

              {/* Comments Preview */}
              <div className="space-y-2">
                <p className="text-xs text-gray-500 font-semibold">
                  Ver {post.comments} comentários
                </p>
                <input
                  type="text"
                  placeholder="Adiciona um comentário..."
                  className="w-full bg-gray-100 rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
            </div>
          );
        })}
      </main>
    </div>
  );
}
