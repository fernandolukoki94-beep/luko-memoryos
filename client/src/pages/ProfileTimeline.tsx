import { useEffect, useState } from "react";
import { useParams, useLocation } from "wouter";
import { motion } from "framer-motion";
import {
  Heart,
  MapPin,
  Calendar,
  Edit2,
  LogOut,
  Plus,
  Zap,
  Briefcase,
  GraduationCap,
  Ring,
  Trophy,
  Star,
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface LifeEvent {
  id: number;
  ano: number;
  titulo: string;
  descricao: string;
  tipo: string;
  icone: string;
}

interface Memory {
  id: number;
  ano: number;
  titulo: string;
  descricao: string;
  emocao: string;
  local: string;
}

interface TimelineItem {
  id: number;
  ano: number;
  titulo: string;
  descricao: string;
  tipo: string;
  tipo_item: "event" | "memory";
  emocao?: string;
  local?: string;
}

const eventTypeIcons: Record<string, React.ReactNode> = {
  nascimento: <Star className="w-6 h-6" />,
  educacao: <GraduationCap className="w-6 h-6" />,
  trabalho: <Briefcase className="w-6 h-6" />,
  relacionamento: <Heart className="w-6 h-6" />,
  conquista: <Trophy className="w-6 h-6" />,
  outro: <Zap className="w-6 h-6" />,
};

const emotionEmojis: Record<string, string> = {
  feliz: "😊",
  triste: "😢",
  saudade: "💔",
  amor: "❤️",
  conquista: "🎉",
  neutro: "😐",
};

export default function ProfileTimeline() {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const [timeline, setTimeline] = useState<TimelineItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [profileData, setProfileData] = useState({
    nome: "Fernando Lukoki",
    bio: "Desenvolvedor Full Stack apaixonado por tecnologia e histórias",
    foto: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fernando",
    data_nascimento: "2003-01-01",
  });
  const [newEvent, setNewEvent] = useState({
    ano: new Date().getFullYear(),
    titulo: "",
    descricao: "",
    tipo: "outro",
  });

  useEffect(() => {
    // Simular carregamento de dados
    const mockTimeline: TimelineItem[] = [
      {
        id: 1,
        ano: 2003,
        titulo: "Nasci",
        descricao: "O início de uma grande jornada",
        tipo: "nascimento",
        tipo_item: "event",
      },
      {
        id: 2,
        ano: 2008,
        titulo: "Primeiro dia de escola",
        descricao: "Comecei minha jornada educacional",
        tipo: "educacao",
        tipo_item: "event",
      },
      {
        id: 3,
        ano: 2015,
        titulo: "Descobri programação",
        descricao: "Meu primeiro 'Hello World'",
        tipo: "conquista",
        tipo_item: "event",
      },
      {
        id: 4,
        ano: 2020,
        titulo: "Primeiro computador próprio",
        descricao: "Um marco importante na minha vida",
        tipo: "conquista",
        tipo_item: "event",
      },
      {
        id: 5,
        ano: 2023,
        titulo: "Formação em Desenvolvimento",
        descricao: "Completei minha formação profissional",
        tipo: "educacao",
        tipo_item: "event",
      },
      {
        id: 6,
        ano: 2025,
        titulo: "Comecei projetos de programação",
        descricao: "Iniciando minha carreira como desenvolvedor",
        tipo: "trabalho",
        tipo_item: "event",
      },
      {
        id: 7,
        ano: 2026,
        titulo: "Criei MemoryOS",
        descricao: "Um projeto ambicioso para preservar memórias",
        tipo: "conquista",
        tipo_item: "event",
      },
    ];
    setTimeline(mockTimeline);
    setLoading(false);
  }, [id]);

  const handleAddEvent = () => {
    if (newEvent.titulo.trim()) {
      const event: TimelineItem = {
        id: Math.max(...timeline.map((t) => t.id), 0) + 1,
        ...newEvent,
        tipo_item: "event",
      };
      setTimeline([...timeline, event].sort((a, b) => a.ano - b.ano));
      setNewEvent({
        ano: new Date().getFullYear(),
        titulo: "",
        descricao: "",
        tipo: "outro",
      });
      setIsAddingEvent(false);
    }
  };

  const handleLogout = () => {
    setLocation("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Header/Profile Section */}
      <div className="border-b border-white/10 backdrop-blur-md sticky top-0 z-40">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-start gap-6">
              <motion.img
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                src={profileData.foto}
                alt={profileData.nome}
                className="w-24 h-24 rounded-full border-4 border-purple-500"
              />
              <div className="flex-1">
                <h1 className="text-4xl font-bold mb-2">{profileData.nome}</h1>
                <p className="text-gray-400 mb-4">{profileData.bio}</p>
                <div className="flex gap-4 flex-wrap">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400">
                      {timeline.length}
                    </div>
                    <div className="text-sm text-gray-400">Eventos</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-pink-400">
                      {new Date().getFullYear() - 2003}
                    </div>
                    <div className="text-sm text-gray-400">Anos</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Dialog open={isEditingProfile} onOpenChange={setIsEditingProfile}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    <Edit2 className="w-4 h-4 mr-2" />
                    Editar Perfil
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-slate-800 border-white/20">
                  <DialogHeader>
                    <DialogTitle>Editar Perfil</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-gray-400">Nome</label>
                      <Input
                        value={profileData.nome}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            nome: e.target.value,
                          })
                        }
                        className="bg-slate-700 border-white/10 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-400">Bio</label>
                      <Textarea
                        value={profileData.bio}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            bio: e.target.value,
                          })
                        }
                        className="bg-slate-700 border-white/10 text-white"
                      />
                    </div>
                    <Button className="w-full bg-purple-600 hover:bg-purple-700">
                      Salvar Alterações
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
              <Button
                variant="outline"
                className="border-red-500/20 text-red-400 hover:bg-red-500/10"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Minha Jornada de Vida
            </span>
          </h2>
          <Dialog open={isAddingEvent} onOpenChange={setIsAddingEvent}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Evento
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-800 border-white/20">
              <DialogHeader>
                <DialogTitle>Novo Evento de Vida</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-400">Ano</label>
                  <Input
                    type="number"
                    value={newEvent.ano}
                    onChange={(e) =>
                      setNewEvent({
                        ...newEvent,
                        ano: parseInt(e.target.value),
                      })
                    }
                    className="bg-slate-700 border-white/10 text-white"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-400">Título</label>
                  <Input
                    value={newEvent.titulo}
                    onChange={(e) =>
                      setNewEvent({
                        ...newEvent,
                        titulo: e.target.value,
                      })
                    }
                    className="bg-slate-700 border-white/10 text-white"
                    placeholder="Ex: Formatura"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-400">Descrição</label>
                  <Textarea
                    value={newEvent.descricao}
                    onChange={(e) =>
                      setNewEvent({
                        ...newEvent,
                        descricao: e.target.value,
                      })
                    }
                    className="bg-slate-700 border-white/10 text-white"
                    placeholder="Conte mais sobre este evento..."
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-400">Tipo</label>
                  <select
                    value={newEvent.tipo}
                    onChange={(e) =>
                      setNewEvent({
                        ...newEvent,
                        tipo: e.target.value,
                      })
                    }
                    className="w-full bg-slate-700 border border-white/10 text-white rounded px-3 py-2"
                  >
                    <option value="outro">Outro</option>
                    <option value="nascimento">Nascimento</option>
                    <option value="educacao">Educação</option>
                    <option value="trabalho">Trabalho</option>
                    <option value="relacionamento">Relacionamento</option>
                    <option value="conquista">Conquista</option>
                  </select>
                </div>
                <Button
                  onClick={handleAddEvent}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  Adicionar Evento
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 via-pink-500 to-blue-500" />

          {/* Timeline items */}
          <div className="space-y-12">
            {timeline.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative pl-32"
              >
                {/* Timeline dot */}
                <div className="absolute left-0 top-2 w-16 h-16 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white shadow-lg">
                    {item.tipo_item === "event"
                      ? eventTypeIcons[item.tipo] || eventTypeIcons.outro
                      : emotionEmojis[item.emocao || "neutro"]}
                  </div>
                </div>

                {/* Content */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-2xl font-bold mb-1">{item.titulo}</h3>
                      <div className="flex gap-4 text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {item.ano}
                        </span>
                        {item.local && (
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {item.local}
                          </span>
                        )}
                      </div>
                    </div>
                    {item.emocao && (
                      <span className="text-3xl">
                        {emotionEmojis[item.emocao]}
                      </span>
                    )}
                  </div>
                  {item.descricao && (
                    <p className="text-gray-300 leading-relaxed">
                      {item.descricao}
                    </p>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
