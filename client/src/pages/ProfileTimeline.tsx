import { useAuth } from "@/contexts/AuthContext";
import { useMemories } from "@/contexts/MemoriesContext";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { 
  Calendar, 
  MapPin, 
  ArrowLeft,
  Lock,
  Archive,
  Sparkles
} from "lucide-react";
import { motion } from "framer-motion";

export default function ProfileTimeline() {
  const { userProfile } = useAuth();
  const { memories } = useMemories();
  const [, setLocation] = useLocation();

  // Sort memories by date (assuming DD/MM/YYYY or similar, we'll do simple sort for now)
  const sortedMemories = [...memories].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

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
            <h1 className="text-xl font-bold text-slate-900">Linha do Tempo</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold">
              {userProfile?.displayName?.charAt(0) || "U"}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">A Minha Jornada</h2>
          <p className="text-slate-500">Uma viagem visual pelas tuas memórias e momentos mais importantes.</p>
        </div>

        {memories.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-3xl p-20 text-center shadow-sm">
            <Archive className="w-16 h-16 text-slate-200 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-900 mb-2">A Timeline está vazia</h3>
            <p className="text-slate-500 max-w-md mx-auto">
              Começa a adicionar memórias no Dashboard para veres a tua história a ganhar vida aqui.
            </p>
            <Button 
              onClick={() => setLocation("/home")}
              className="mt-8 bg-purple-600 hover:bg-purple-700 text-white rounded-xl px-8"
            >
              Criar Primeira Memória
            </Button>
          </div>
        ) : (
          <div className="relative space-y-12">
            {/* Vertical Line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-slate-200 -translate-x-1/2 hidden md:block" />

            {sortedMemories.map((memory, index) => (
              <motion.div 
                key={memory.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`relative flex flex-col md:flex-row items-center gap-8 ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-0 md:left-1/2 top-0 w-4 h-4 rounded-full bg-purple-600 border-4 border-white shadow-sm -translate-x-1/2 z-10 hidden md:block" />

                {/* Date Label */}
                <div className="w-full md:w-1/2 flex justify-center md:justify-start px-4">
                  <div className={`flex items-center gap-2 text-sm font-bold text-purple-600 bg-purple-50 px-4 py-2 rounded-full ${
                    index % 2 === 0 ? "md:flex-row-reverse" : ""
                  }`}>
                    <Calendar className="w-4 h-4" />
                    {memory.date}
                  </div>
                </div>

                {/* Content Card */}
                <div className="w-full md:w-1/2">
                  <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                    {memory.imageUrl && (
                      <div className="aspect-video w-full overflow-hidden bg-slate-100">
                        <img src={memory.imageUrl} alt="" className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="text-xl font-bold text-slate-900">{memory.title}</h4>
                        {memory.isPrivate && <Lock className="w-3 h-3 text-slate-400" />}
                      </div>
                      <p className="text-slate-600 text-sm mb-4 leading-relaxed">
                        {memory.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-slate-400">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {memory.category}
                        </span>
                        <span className="flex items-center gap-1">
                          <Sparkles className="w-3 h-3" /> MemoryOS Core
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
