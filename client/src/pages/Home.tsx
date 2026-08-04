import { useAuth } from "@/contexts/AuthContext";
import { useMemories } from "@/contexts/MemoriesContext";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { useState } from "react";
import { 
  Archive, 
  Sparkles, 
  Clock, 
  Lock, 
  Plus, 
  Search, 
  Settings,
  LayoutDashboard,
  Heart,
  ShieldCheck,
  X,
  Image as ImageIcon
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

export default function Home() {
  const { userProfile, logout } = useAuth();
  const { memories, addMemory } = useMemories();
  const [, setLocation] = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);

  const handleLogout = async () => {
    await logout();
    setLocation("/");
  };

  const handleCreateMemory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      toast.error("Por favor, preencha o título e a descrição.");
      return;
    }

    addMemory({
      title,
      description,
      isPrivate,
      date: new Date().toLocaleDateString("pt-PT"),
      category: "Geral",
      imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663550783227/WhiKSnB8XZrFxSQpnnwhMw/luko-feed-pattern-UJy82QBihxRYcN9JajTs7e.webp"
    });

    toast.success("Memória guardada com sucesso! ✨");
    setIsModalOpen(false);
    setTitle("");
    setDescription("");
  };

  const stats = [
    { label: "Memórias", value: memories.length.toString(), icon: <Archive className="w-5 h-5" />, color: "text-blue-500" },
    { label: "Segurança", value: "Alta", icon: <ShieldCheck className="w-5 h-5" />, color: "text-green-500" },
    { label: "Seguidores", value: userProfile?.followers || 0, icon: <Heart className="w-5 h-5" />, color: "text-pink-500" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-slate-200 p-6 flex flex-col gap-8">
        <div className="flex items-center gap-2">
          <Archive className="w-8 h-8 text-purple-600" />
          <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            MemoryOS
          </span>
        </div>

        <nav className="flex flex-col gap-2 flex-1">
          <Button variant="ghost" className="justify-start gap-3 bg-slate-100 text-purple-700 font-semibold">
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </Button>
          <Button variant="ghost" className="justify-start gap-3 text-slate-600 hover:text-purple-600" onClick={() => setLocation("/feed")}>
            <Sparkles className="w-5 h-5" /> Feed Global
          </Button>
          <Button variant="ghost" className="justify-start gap-3 text-slate-600 hover:text-purple-600" onClick={() => setLocation(`/timeline/${userProfile?.uid}`)}>
            <Clock className="w-5 h-5" /> Minha Timeline
          </Button>
          <Button variant="ghost" className="justify-start gap-3 text-slate-600 hover:text-purple-600" onClick={() => setLocation("/vault")}>
            <Lock className="w-5 h-5" /> Cofre Privado
          </Button>
        </nav>

        <div className="pt-6 border-t border-slate-100">
          <Button variant="ghost" className="w-full justify-start gap-3 text-slate-500" onClick={() => setLocation("/profile/me")}>
            <Settings className="w-5 h-5" /> Definições
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-3 text-red-500 hover:bg-red-50 hover:text-red-600 mt-2" onClick={handleLogout}>
            Sair da Conta
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Olá, {userProfile?.displayName || "Explorador"}! 👋
            </h1>
            <p className="text-slate-500 mt-1">Bem-vindo de volta ao seu cofre de memórias.</p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <Button 
              onClick={() => setIsModalOpen(true)}
              className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl px-6 w-full md:w-auto"
            >
              <Plus className="w-5 h-5 mr-2" /> Nova Memória
            </Button>
          </div>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
              <div className={`p-3 rounded-xl bg-slate-50 ${stat.color}`}>{stat.icon}</div>
              <div>
                <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Memories List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <section className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Memórias Recentes</h3>
            <div className="space-y-4">
              {memories.length === 0 ? (
                <div className="text-center py-10">
                  <Archive className="w-12 h-12 text-slate-200 mx-auto mb-3" />
                  <p className="text-slate-400">Ainda não guardaste memórias.</p>
                </div>
              ) : (
                memories.map((memory) => (
                  <div key={memory.id} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer group">
                    <div className="w-16 h-16 rounded-xl bg-purple-100 flex-shrink-0 overflow-hidden">
                      <img src={memory.imageUrl} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-slate-800 group-hover:text-purple-600 transition-colors">{memory.title}</h4>
                        {memory.isPrivate && <Lock className="w-3 h-3 text-slate-400" />}
                      </div>
                      <p className="text-sm text-slate-500 line-clamp-1">{memory.description}</p>
                    </div>
                    <span className="text-xs text-slate-400">{memory.date}</span>
                  </div>
                ))
              )}
            </div>
          </section>

          {/* AI Assistant */}
          <section className="bg-gradient-to-br from-purple-600 to-indigo-700 p-8 rounded-3xl text-white shadow-lg relative overflow-hidden">
            <div className="relative z-10">
              <Sparkles className="w-10 h-10 text-white/50 mb-6" />
              <h3 className="text-2xl font-bold mb-4">Memory AI Assistente</h3>
              <p className="text-purple-100 mb-8">
                {memories.length > 0 
                  ? `Tens ${memories.length} memórias guardadas. Queres que eu crie uma história sobre elas?`
                  : "Começa a guardar memórias para que eu possa ajudar-te a contar a tua história."}
              </p>
              <Button 
                onClick={() => setLocation("/chat")}
                className="bg-white text-purple-700 hover:bg-purple-50 rounded-xl font-bold w-full py-6"
              >
                Conversar com IA
              </Button>
            </div>
          </section>
        </div>
      </main>

      {/* Modal Nova Memória */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <h2 className="text-xl font-bold text-slate-900">Nova Memória</h2>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>
              <form onSubmit={handleCreateMemory} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Título</label>
                  <input 
                    value={title} onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500/20 outline-none"
                    placeholder="Ex: Viagem à praia"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">O que aconteceu?</label>
                  <textarea 
                    value={description} onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500/20 outline-none h-32 resize-none"
                    placeholder="Descreve este momento..."
                  />
                </div>
                <div className="flex items-center gap-2 py-2">
                  <input 
                    type="checkbox" checked={isPrivate} onChange={(e) => setIsPrivate(e.target.checked)}
                    id="private" className="w-4 h-4 text-purple-600 rounded"
                  />
                  <label htmlFor="private" className="text-sm text-slate-600 flex items-center gap-1 cursor-pointer">
                    <Lock className="w-3 h-3" /> Guardar no Cofre Privado
                  </label>
                </div>
                <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white py-6 rounded-xl font-bold">
                  Guardar Memória
                </Button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
