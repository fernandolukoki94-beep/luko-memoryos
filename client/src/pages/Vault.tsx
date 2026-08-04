import { useAuth } from "@/contexts/AuthContext";
import { useMemories } from "@/contexts/MemoriesContext";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { useState } from "react";
import { 
  Lock, 
  ShieldCheck, 
  ArrowLeft,
  Eye,
  EyeOff,
  Trash2,
  Calendar,
  Archive
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

export default function Vault() {
  const { userProfile } = useAuth();
  const { memories, deleteMemory } = useMemories();
  const [, setLocation] = useLocation();
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [pin, setPin] = useState("");
  const [showPin, setShowPin] = useState(false);

  // Filter only private memories
  const privateMemories = memories.filter(m => m.isPrivate);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    // Default PIN for demo, in a real app this would be in the user profile/db
    if (pin === "1234") {
      setIsUnlocked(true);
      toast.success("Cofre desbloqueado com sucesso!");
    } else {
      toast.error("PIN incorreto. Tente novamente.");
      setPin("");
    }
  };

  const handleDelete = (id: string) => {
    deleteMemory(id);
    toast.success("Memória removida permanentemente.");
  };

  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl text-center"
        >
          <div className="w-20 h-20 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-10 h-10 text-purple-500" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Cofre Privado</h1>
          <p className="text-slate-400 mb-8">Introduza o seu PIN de segurança para aceder às memórias protegidas.</p>
          
          <form onSubmit={handleUnlock} className="space-y-6">
            <div className="relative">
              <input 
                type={showPin ? "text" : "password"}
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                maxLength={4}
                className="w-full bg-slate-800 border border-slate-700 text-white text-center text-3xl tracking-[1em] py-4 rounded-2xl focus:ring-2 focus:ring-purple-500 outline-none"
                placeholder="****"
                autoFocus
              />
              <button 
                type="button"
                onClick={() => setShowPin(!showPin)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
              >
                {showPin ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white py-6 rounded-2xl font-bold text-lg">
              Desbloquear
            </Button>
          </form>
          <p className="mt-6 text-xs text-slate-500 italic">Dica: O PIN padrão é 1234</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setLocation("/home")}
              className="rounded-full"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-green-500" />
              <h1 className="text-xl font-bold text-slate-900">O Meu Cofre</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:block text-right">
              <p className="text-sm font-bold text-slate-900">{userProfile?.displayName}</p>
              <p className="text-xs text-slate-500">Sessão Segura Ativa</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold">
              {userProfile?.displayName?.charAt(0) || "U"}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Memórias Protegidas</h2>
            <p className="text-slate-500 mt-1">Apenas tu podes ver o que está guardado aqui.</p>
          </div>
          <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" /> Encriptação Ativa
          </div>
        </div>

        {privateMemories.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-3xl p-20 text-center">
            <Archive className="w-16 h-16 text-slate-200 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-900 mb-2">O cofre está vazio</h3>
            <p className="text-slate-500 max-w-md mx-auto">
              Ainda não adicionaste nenhuma memória privada. Podes marcar memórias como "Privadas" ao criá-las no Dashboard.
            </p>
            <Button 
              onClick={() => setLocation("/home")}
              className="mt-8 bg-purple-600 hover:bg-purple-700 text-white rounded-xl px-8"
            >
              Voltar ao Dashboard
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {privateMemories.map((memory) => (
                <motion.div
                  key={memory.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden group hover:shadow-md transition-shadow"
                >
                  <div className="aspect-video relative overflow-hidden bg-slate-100">
                    <img 
                      src={memory.imageUrl} 
                      alt={memory.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute top-4 right-4 bg-slate-900/60 backdrop-blur-md text-white p-2 rounded-xl">
                      <Lock className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-lg font-bold text-slate-900">{memory.title}</h4>
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {memory.date}
                      </span>
                    </div>
                    <p className="text-slate-600 text-sm line-clamp-3 mb-6">
                      {memory.description}
                    </p>
                    <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                      <span className="text-xs font-bold text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                        {memory.category}
                      </span>
                      <button 
                        onClick={() => handleDelete(memory.id)}
                        className="text-red-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-full transition-colors"
                        title="Eliminar permanentemente"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>
    </div>
  );
}
