import { useAuth } from "@/contexts/AuthContext";
import { useMemories } from "@/contexts/MemoriesContext";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { useState, useRef, useEffect } from "react";
import { 
  Sparkles, 
  Send, 
  ArrowLeft,
  User,
  Bot,
  Trash2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

export default function Chat() {
  const { userProfile } = useAuth();
  const { memories } = useMemories();
  const [, setLocation] = useLocation();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: `Olá ${userProfile?.displayName || "Explorador"}! Eu sou o Memory AI. Posso ajudar-te a recordar momentos ou a criar histórias baseadas nas tuas ${memories.length} memórias guardadas. O que queres fazer hoje?`,
      sender: "ai",
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      let aiText = "";
      const lowerInput = input.toLowerCase();

      if (lowerInput.includes("memória") || lowerInput.includes("recordar")) {
        if (memories.length > 0) {
          const randomMem = memories[Math.floor(Math.random() * memories.length)];
          aiText = `Lembro-me perfeitamente de quando guardaste a memória "${randomMem.title}". Foi no dia ${randomMem.date}. Queres que eu escreva um poema sobre isso?`;
        } else {
          aiText = "Ainda não tens memórias guardadas para eu analisar. Que tal criares a tua primeira memória agora?";
        }
      } else if (lowerInput.includes("quem sou") || lowerInput.includes("perfil")) {
        aiText = `Tu és o ${userProfile?.displayName}, um utilizador do MemoryOS com ${memories.length} memórias preciosas guardadas no nosso sistema seguro.`;
      } else {
        aiText = "Isso é fascinante! Como assistente do MemoryOS, a minha missão é garantir que nenhum detalhe da tua vida seja esquecido. Conta-me mais sobre esse momento.";
      }

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: aiText,
        sender: "ai",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 h-20 flex items-center justify-between px-4 shrink-0 z-30">
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
            <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-200">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900 leading-none">Memory AI</h1>
              <span className="text-xs text-green-500 font-medium">Online e pronto a ajudar</span>
            </div>
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setMessages([messages[0]])}
          className="text-slate-400 hover:text-red-500"
        >
          <Trash2 className="w-5 h-5" />
        </Button>
      </header>

      {/* Chat Area */}
      <main 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 max-w-4xl mx-auto w-full"
      >
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`flex gap-3 max-w-[85%] ${msg.sender === "user" ? "flex-row-reverse" : ""}`}>
                <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
                  msg.sender === "user" ? "bg-slate-200 text-slate-600" : "bg-purple-100 text-purple-600"
                }`}>
                  {msg.sender === "user" ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                </div>
                <div className={`p-4 rounded-2xl shadow-sm ${
                  msg.sender === "user" 
                    ? "bg-purple-600 text-white rounded-tr-none" 
                    : "bg-white text-slate-800 border border-slate-100 rounded-tl-none"
                }`}>
                  <p className="text-sm md:text-base leading-relaxed">{msg.text}</p>
                  <span className={`text-[10px] mt-2 block ${
                    msg.sender === "user" ? "text-purple-200" : "text-slate-400"
                  }`}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-100 p-4 rounded-2xl rounded-tl-none shadow-sm">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Input Area */}
      <footer className="p-4 md:p-8 bg-white border-t border-slate-200 shrink-0">
        <form 
          onSubmit={handleSend}
          className="max-w-4xl mx-auto flex gap-4"
        >
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Pergunta sobre as tuas memórias..."
            className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
          />
          <Button 
            type="submit"
            disabled={!input.trim() || isTyping}
            className="bg-purple-600 hover:bg-purple-700 text-white w-14 h-14 rounded-2xl shadow-lg shadow-purple-200 flex-shrink-0"
          >
            <Send className="w-6 h-6" />
          </Button>
        </form>
      </footer>
    </div>
  );
}
