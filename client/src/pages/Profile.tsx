import { useAuth } from "@/contexts/AuthContext";
import { useMemories } from "@/contexts/MemoriesContext";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { 
  Settings, 
  ArrowLeft,
  Edit2,
  Camera,
  MapPin,
  Calendar,
  ShieldCheck,
  Archive
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Profile() {
  const { userProfile, logout } = useAuth();
  const { memories } = useMemories();
  const [, setLocation] = useLocation();
  const [isEditing, setIsEditing] = useState(false);

  if (!userProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 bg-purple-200 rounded-full mb-4"></div>
          <p className="text-slate-400">Carregando perfil...</p>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    setIsEditing(false);
    toast.success("Perfil atualizado com sucesso!");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setLocation("/home")}
              className="rounded-full"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-bold text-slate-900">O Meu Perfil</h1>
          </div>
          <Button variant="ghost" size="icon" className="rounded-full text-slate-400">
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-10">
        {/* Profile Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden mb-8">
          <div className="h-40 bg-gradient-to-r from-purple-600 to-pink-500 relative">
            <div className="absolute -bottom-16 left-8 p-1 bg-white rounded-full">
              <div className="relative group">
                <img
                  src={userProfile.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${userProfile.displayName}`}
                  alt={userProfile.displayName}
                  className="w-32 h-32 rounded-full object-cover"
                />
                <button className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="w-6 h-6 text-white" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="pt-20 px-8 pb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <h2 className="text-3xl font-bold text-slate-900">{userProfile.displayName}</h2>
                <p className="text-slate-500 font-medium">@{userProfile.email.split("@")[0]}</p>
                <div className="flex items-center gap-4 mt-4 text-sm text-slate-400">
                  <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> Luanda, Angola</span>
                  <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> Membro desde 2026</span>
                </div>
              </div>
              <div className="flex gap-3 w-full md:w-auto">
                <Button 
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex-1 md:flex-none bg-slate-900 hover:bg-slate-800 text-white rounded-xl px-6"
                >
                  <Edit2 className="w-4 h-4 mr-2" /> Editar Perfil
                </Button>
                <Button variant="outline" className="rounded-xl border-slate-200">
                  Partilhar
                </Button>
              </div>
            </div>

            {isEditing ? (
              <div className="mt-8 p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Bio</label>
                  <textarea 
                    defaultValue={userProfile.bio || "Preservando as minhas memórias mais preciosas no MemoryOS."}
                    className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500/20 outline-none h-24 resize-none"
                  />
                </div>
                <div className="flex gap-3">
                  <Button onClick={handleSave} className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl px-6">Guardar</Button>
                  <Button onClick={() => setIsEditing(false)} variant="ghost" className="rounded-xl">Cancelar</Button>
                </div>
              </div>
            ) : (
              <p className="mt-6 text-slate-600 leading-relaxed max-w-2xl">
                {userProfile.bio || "Preservando as minhas memórias mais preciosas no MemoryOS. Cada momento conta, cada história merece ser lembrada."}
              </p>
            )}
          </div>
        </div>

        {/* Stats & Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
            <Archive className="w-6 h-6 text-blue-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-slate-900">{memories.length}</p>
            <p className="text-sm text-slate-500">Memórias</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
            <ShieldCheck className="w-6 h-6 text-green-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-slate-900">100%</p>
            <p className="text-sm text-slate-500">Privacidade</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
            <Calendar className="w-6 h-6 text-purple-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-slate-900">0</p>
            <p className="text-sm text-slate-500">Eventos Futuros</p>
          </div>
        </div>

        {/* Account Settings */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-8">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Definições de Conta</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-2xl transition-colors cursor-pointer border border-transparent hover:border-slate-100">
                <div>
                  <p className="font-bold text-slate-800">Email de Acesso</p>
                  <p className="text-sm text-slate-500">{userProfile.email}</p>
                </div>
                <Button variant="ghost" size="sm" className="text-purple-600 font-bold">Alterar</Button>
              </div>
              <div className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-2xl transition-colors cursor-pointer border border-transparent hover:border-slate-100">
                <div>
                  <p className="font-bold text-slate-800">PIN do Cofre</p>
                  <p className="text-sm text-slate-500">Definido como 1234</p>
                </div>
                <Button variant="ghost" size="sm" className="text-purple-600 font-bold">Mudar PIN</Button>
              </div>
              <div className="pt-4 border-t border-slate-100">
                <Button 
                  onClick={logout}
                  className="w-full bg-red-50 hover:bg-red-100 text-red-600 py-6 rounded-2xl font-bold border-none"
                >
                  Terminar Sessão
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
