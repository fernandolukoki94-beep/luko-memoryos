import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Settings, Share2, Edit2, MapPin, Link as LinkIcon } from "lucide-react";
import { useState } from "react";

export default function Profile() {
  const { userProfile, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  if (!userProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Carregando perfil...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-cyan-50">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white border-b-2 border-gray-100 shadow-sm">
        <div className="container max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Perfil</h1>
          <div className="flex items-center gap-2">
            <Button className="btn-secondary-playful p-2 h-10 w-10">
              <Settings size={20} />
            </Button>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <main className="container max-w-2xl mx-auto px-4 py-8">
        {/* Cover Image */}
        <div className="h-32 rounded-2xl bg-gradient-to-r from-pink-300 via-purple-300 to-cyan-300 mb-6 shadow-lg" />

        {/* Profile Header */}
        <div className="card-playful -mt-16 mb-6 relative">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4">
            <img
              src={
                userProfile.photoURL ||
                "https://d2xsxph8kpxj0f.cloudfront.net/310519663550783227/WhiKSnB8XZrFxSQpnnwhMw/luko-profile-avatar-FFCeRVUABGq3ckRYJf7PsM.webp"
              }
              alt={userProfile.displayName}
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
            />
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-900">
                {userProfile.displayName}
              </h2>
              <p className="text-gray-600 text-sm">@{userProfile.email.split("@")[0]}</p>
              {userProfile.bio && (
                <p className="text-gray-700 mt-2">{userProfile.bio}</p>
              )}
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => setIsEditing(!isEditing)}
                className="btn-primary-playful"
              >
                <Edit2 size={18} className="mr-2" />
                Editar
              </Button>
              <Button className="btn-secondary-playful p-2 h-12 w-12">
                <Share2 size={18} />
              </Button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="card-playful text-center">
            <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-500">
              {userProfile.followers}
            </p>
            <p className="text-sm text-gray-600 font-semibold">Seguidores</p>
          </div>
          <div className="card-playful text-center">
            <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-500">
              {userProfile.following}
            </p>
            <p className="text-sm text-gray-600 font-semibold">Seguindo</p>
          </div>
          <div className="card-playful text-center">
            <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-500">
              24
            </p>
            <p className="text-sm text-gray-600 font-semibold">Posts</p>
          </div>
        </div>

        {/* Bio Section */}
        {isEditing && (
          <div className="card-playful mb-6 bg-gradient-to-r from-pink-50 to-cyan-50 border-2 border-pink-200">
            <h3 className="font-bold text-gray-900 mb-4">Editar Perfil</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nome
                </label>
                <input
                  type="text"
                  defaultValue={userProfile.displayName}
                  className="w-full rounded-lg border-2 border-gray-200 focus:border-pink-500 focus:outline-none transition-colors px-4 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Bio
                </label>
                <textarea
                  defaultValue={userProfile.bio}
                  placeholder="Conta-nos sobre ti..."
                  className="w-full rounded-lg border-2 border-gray-200 focus:border-pink-500 focus:outline-none transition-colors px-4 py-2 h-24"
                />
              </div>
              <div className="flex gap-2">
                <Button className="btn-primary-playful flex-1">Guardar</Button>
                <Button
                  onClick={() => setIsEditing(false)}
                  className="btn-secondary-playful flex-1"
                >
                  Cancelar
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Posts Grid */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Meus Posts</h3>
          <div className="grid grid-cols-3 gap-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="aspect-square rounded-2xl bg-gradient-to-br from-pink-300 to-cyan-300 cursor-pointer hover:scale-105 transition-transform shadow-lg"
              />
            ))}
          </div>
        </div>

        {/* Logout Button */}
        <div className="card-playful bg-red-50 border-2 border-red-200 text-center">
          <Button
            onClick={logout}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-full transition-colors"
          >
            Sair
          </Button>
        </div>
      </main>
    </div>
  );
}
