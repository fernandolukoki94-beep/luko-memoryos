import { useState } from "react";
import { Bell, X, Heart, MessageCircle, UserPlus, MessageSquare } from "lucide-react";
import { useNotificationContext } from "@/contexts/NotificationContext";
import { Button } from "@/components/ui/button";

export default function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const { notifications, unreadCount, markAsRead, markAllAsRead, removeNotification } =
    useNotificationContext();

  const getIcon = (type: string) => {
    switch (type) {
      case "like":
        return <Heart size={18} className="text-red-500" />;
      case "comment":
        return <MessageSquare size={18} className="text-blue-500" />;
      case "message":
        return <MessageCircle size={18} className="text-green-500" />;
      case "follow":
        return <UserPlus size={18} className="text-purple-500" />;
      default:
        return <Bell size={18} />;
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
      >
        <Bell size={24} className="text-gray-700" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border-2 border-gray-100 z-50">
          <div className="p-4 border-b-2 border-gray-100 flex items-center justify-between">
            <h3 className="font-bold text-gray-900">Notificações</h3>
            {unreadCount > 0 && (
              <Button
                onClick={markAllAsRead}
                className="text-xs bg-pink-100 text-pink-600 hover:bg-pink-200 px-2 py-1 rounded-full"
              >
                Marcar como lidas
              </Button>
            )}
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <Bell size={32} className="mx-auto mb-2 opacity-50" />
                <p className="font-semibold">Sem notificações</p>
              </div>
            ) : (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  onClick={() => markAsRead(notif.id)}
                  className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer ${
                    !notif.read ? "bg-pink-50" : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">{getIcon(notif.type)}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900">
                        {notif.userName}
                      </p>
                      <p className="text-sm text-gray-600 truncate">{notif.message}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(notif.timestamp).toLocaleTimeString("pt-PT", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeNotification(notif.id);
                      }}
                      className="flex-shrink-0 text-gray-400 hover:text-gray-600"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
