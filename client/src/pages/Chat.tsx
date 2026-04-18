import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Send, Phone, Video, MoreVertical, Search, Plus } from "lucide-react";
import { toast } from "sonner";

interface ChatConversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  online: boolean;
}

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: number;
  read: boolean;
}

const mockConversations: ChatConversation[] = [
  {
    id: "1",
    name: "João Silva",
    avatar:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663550783227/WhiKSnB8XZrFxSQpnnwhMw/luko-profile-avatar-FFCeRVUABGq3ckRYJf7PsM.webp",
    lastMessage: "Tudo bem? 😊",
    timestamp: "14:30",
    unread: 2,
    online: true,
  },
  {
    id: "2",
    name: "Maria Costa",
    avatar:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663550783227/WhiKSnB8XZrFxSQpnnwhMw/luko-profile-avatar-FFCeRVUABGq3ckRYJf7PsM.webp",
    lastMessage: "Vamos amanhã?",
    timestamp: "13:15",
    unread: 0,
    online: false,
  },
  {
    id: "3",
    name: "Grupo de Amigos",
    avatar:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663550783227/WhiKSnB8XZrFxSQpnnwhMw/luko-feed-pattern-UJy82QBihxRYcN9JajTs7e.webp",
    lastMessage: "Pedro: Que legal! 🎉",
    timestamp: "12:45",
    unread: 5,
    online: true,
  },
];

const mockMessages: Message[] = [
  {
    id: "1",
    senderId: "other",
    text: "Olá! Como estás?",
    timestamp: Date.now() - 600000,
    read: true,
  },
  {
    id: "2",
    senderId: "me",
    text: "Oi! Tudo bem contigo?",
    timestamp: Date.now() - 540000,
    read: true,
  },
  {
    id: "3",
    senderId: "other",
    text: "Tudo ótimo! Quer sair hoje?",
    timestamp: Date.now() - 480000,
    read: true,
  },
  {
    id: "4",
    senderId: "me",
    text: "Claro! Que horas?",
    timestamp: Date.now() - 420000,
    read: false,
  },
];

export default function Chat() {
  const { userProfile } = useAuth();
  const [selectedConversation, setSelectedConversation] =
    useState<ChatConversation | null>(mockConversations[0]);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [messageInput, setMessageInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        senderId: "me",
        text: messageInput,
        timestamp: Date.now(),
        read: false,
      };
      setMessages([...messages, newMessage]);
      setMessageInput("");
      toast.success("Mensagem enviada!");
    }
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString("pt-PT", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex h-screen bg-white">
      {/* Conversations List */}
      <div className="w-full md:w-80 border-r-2 border-gray-100 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b-2 border-gray-100">
          <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-500 mb-4">
            Mensagens
          </h1>
          <div className="flex gap-2">
            <div className="flex-1 flex items-center bg-gray-100 rounded-full px-4 py-2">
              <Search size={18} className="text-gray-400" />
              <input
                type="text"
                placeholder="Procura..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent ml-2 outline-none text-sm w-full"
              />
            </div>
            <Button className="btn-secondary-playful p-2 h-10 w-10">
              <Plus size={20} />
            </Button>
          </div>
        </div>

        {/* Conversations */}
        <div className="flex-1 overflow-y-auto">
          {mockConversations.map((conv) => {
            const isSelected = selectedConversation?.id === conv.id;
            const bgClass = isSelected ? "bg-pink-50" : "";
            return (
              <button
                key={conv.id}
                onClick={() => setSelectedConversation(conv)}
                className={`w-full p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors text-left ${bgClass}`}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={conv.avatar}
                      alt={conv.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    {conv.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900 truncate">
                        {conv.name}
                      </h3>
                      <span className="text-xs text-gray-500">
                        {conv.timestamp}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">{conv.lastMessage}</p>
                  </div>
                  {conv.unread > 0 && (
                    <div className="flex-shrink-0 w-6 h-6 bg-pink-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      {conv.unread}
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Chat Area */}
      {selectedConversation ? (
        <div className="hidden md:flex flex-1 flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b-2 border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={selectedConversation.avatar}
                alt={selectedConversation.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h2 className="font-bold text-gray-900">
                  {selectedConversation.name}
                </h2>
                <p className="text-xs text-gray-500">
                  {selectedConversation.online ? "Online" : "Offline"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button className="btn-secondary-playful p-2 h-10 w-10">
                <Phone size={18} />
              </Button>
              <Button className="btn-secondary-playful p-2 h-10 w-10">
                <Video size={18} />
              </Button>
              <Button className="btn-secondary-playful p-2 h-10 w-10">
                <MoreVertical size={18} />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-white to-pink-50">
            {messages.map((msg) => {
              const isMe = msg.senderId === "me";
              const msgBg = isMe
                ? "bg-pink-500 text-white rounded-br-none"
                : "bg-gray-100 text-gray-900 rounded-bl-none";
              const msgTime = isMe ? "text-pink-100" : "text-gray-500";
              return (
                <div
                  key={msg.id}
                  className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-xs px-4 py-2 rounded-2xl ${msgBg}`}>
                    <p className="text-sm">{msg.text}</p>
                    <p className={`text-xs mt-1 ${msgTime}`}>
                      {formatTime(msg.timestamp)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Message Input */}
          <div className="p-4 border-t-2 border-gray-100 flex gap-2">
            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Escreve uma mensagem..."
              className="flex-1 bg-gray-100 rounded-full px-4 py-3 outline-none focus:ring-2 focus:ring-pink-500 transition-all"
            />
            <Button
              onClick={handleSendMessage}
              className="btn-primary-playful p-3 h-12 w-12 flex items-center justify-center"
            >
              <Send size={20} />
            </Button>
          </div>
        </div>
      ) : (
        <div className="hidden md:flex flex-1 items-center justify-center text-gray-400">
          <p>Seleciona uma conversa para começar</p>
        </div>
      )}
    </div>
  );
}
