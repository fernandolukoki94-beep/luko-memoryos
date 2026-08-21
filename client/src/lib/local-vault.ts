export type MemoryKind = "note" | "sound";

export type LocalMemory = {
  id: string;
  title: string;
  story: string;
  kind: MemoryKind;
  mood: string;
  createdAt: number;
  private: boolean;
  soundLabel?: string;
};

const VAULT_KEY = "lucu-memories.integrated.v1";

export function readLocalMemories(): LocalMemory[] {
  try {
    const value = window.localStorage.getItem(VAULT_KEY);
    const parsed = value ? JSON.parse(value) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function writeLocalMemories(memories: LocalMemory[]) {
  window.localStorage.setItem(VAULT_KEY, JSON.stringify(memories));
}

export function createLocalMemory(memory: Omit<LocalMemory, "id" | "createdAt">): LocalMemory {
  return { ...memory, id: `memory-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, createdAt: Date.now() };
}

