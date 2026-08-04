import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface Memory {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  date: string;
  isPrivate: boolean;
  category: string;
  createdAt: number;
}

interface MemoriesContextType {
  memories: Memory[];
  addMemory: (memory: Omit<Memory, "id" | "createdAt">) => void;
  deleteMemory: (id: string) => void;
  loading: boolean;
}

const MemoriesContext = createContext<MemoriesContextType | undefined>(undefined);

export const MemoriesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("luko_memories");
    if (stored) {
      setMemories(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  const addMemory = (memoryData: Omit<Memory, "id" | "createdAt">) => {
    const newMemory: Memory = {
      ...memoryData,
      id: `mem_${Date.now()}`,
      createdAt: Date.now(),
    };
    const updated = [newMemory, ...memories];
    setMemories(updated);
    localStorage.setItem("luko_memories", JSON.stringify(updated));
  };

  const deleteMemory = (id: string) => {
    const updated = memories.filter(m => m.id !== id);
    setMemories(updated);
    localStorage.setItem("luko_memories", JSON.stringify(updated));
  };

  return (
    <MemoriesContext.Provider value={{ memories, addMemory, deleteMemory, loading }}>
      {children}
    </MemoriesContext.Provider>
  );
};

export const useMemories = () => {
  const context = useContext(MemoriesContext);
  if (!context) throw new Error("useMemories deve ser usado dentro de MemoriesProvider");
  return context;
};
