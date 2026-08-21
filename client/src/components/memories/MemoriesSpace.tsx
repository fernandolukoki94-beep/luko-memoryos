import { FormEvent, useMemo, useState } from "react";
import { Archive, LockKeyhole, Music2, Plus, Search, X } from "lucide-react";
import { createLocalMemory, LocalMemory } from "@/lib/local-vault";

type Props = {
  memories: LocalMemory[];
  onAdd: (memory: LocalMemory) => void;
  onDelete: (id: string) => void;
};

const moods = ["Sereno", "Feliz", "Nostálgico", "Orgulhoso", "Grato"];

export function MemoriesSpace({ memories, onAdd, onDelete }: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [title, setTitle] = useState("");
  const [story, setStory] = useState("");
  const [mood, setMood] = useState(moods[0]);
  const [isPrivate, setPrivate] = useState(true);

  const visible = useMemo(() => memories.filter((memory) => `${memory.title} ${memory.story} ${memory.mood}`.toLowerCase().includes(query.toLowerCase())), [memories, query]);

  const createMemory = (event: FormEvent) => {
    event.preventDefault();
    if (!title.trim() || !story.trim()) return;
    onAdd(createLocalMemory({ title: title.trim(), story: story.trim(), kind: "note", mood, private: isPrivate }));
    setTitle("");
    setStory("");
    setOpen(false);
  };

  return <section className="space-shell memories-shell" id="memorias">
    <div className="section-heading">
      <div><span className="eyebrow">01 / ARQUIVO PESSOAL</span><h2>Memórias que ficam neste browser.</h2><p>Guarde textos, momentos e referências sonoras. Esta versão é local: não cria conta, não sincroniza e não promete cifragem que não existe.</p></div>
      <button className="primary-action" onClick={() => setOpen(true)}><Plus size={18} /> Nova memória</button>
    </div>
    <div className="memory-toolbar">
      <label className="search-field"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Procurar nas suas memórias" /></label>
      <span className="local-chip"><Archive size={14} /> {memories.length} guardadas localmente</span>
    </div>
    {visible.length ? <div className="memory-grid">{visible.map((memory) => <article className="memory-card" key={memory.id}>
      <div className="memory-card-top"><span className={`kind-mark ${memory.kind}`}>{memory.kind === "sound" ? <Music2 size={16} /> : <Archive size={16} />}</span><span className="memory-date">{new Date(memory.createdAt).toLocaleDateString("pt-PT", { day: "2-digit", month: "short", year: "numeric" })}</span></div>
      <h3>{memory.title}</h3><p>{memory.story}</p>
      <div className="memory-card-bottom"><span>{memory.mood}</span>{memory.private ? <span className="private-mark"><LockKeyhole size={12} /> Privada</span> : <span>Pessoal</span>}{memory.soundLabel && <span className="sound-label"><Music2 size={12} /> {memory.soundLabel}</span>}<button aria-label={`Eliminar ${memory.title}`} onClick={() => onDelete(memory.id)}><X size={15} /></button></div>
    </article>)}</div> : <div className="empty-state"><Archive size={32} /><h3>{query ? "Nenhuma memória encontrada" : "O seu arquivo começa aqui"}</h3><p>{query ? "Experimente outra palavra." : "Crie uma memória escrita ou guarde uma take do Bora Uzima Studio como Memória Sonora."}</p></div>}
    {open && <div className="modal-backdrop" role="presentation" onMouseDown={() => setOpen(false)}><form className="memory-modal" onSubmit={createMemory} onMouseDown={(event) => event.stopPropagation()}>
      <div className="modal-title"><div><span className="eyebrow">NOVA MEMÓRIA</span><h3>Registe este momento</h3></div><button type="button" aria-label="Fechar" onClick={() => setOpen(false)}><X size={20} /></button></div>
      <label>Título<input autoFocus value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Ex.: Uma tarde que quero recordar" /></label>
      <label>O que aconteceu?<textarea value={story} onChange={(event) => setStory(event.target.value)} placeholder="Escreva o contexto deste momento..." /></label>
      <div className="form-row"><label>Como se sentiu?<select value={mood} onChange={(event) => setMood(event.target.value)}>{moods.map((item) => <option key={item}>{item}</option>)}</select></label><label className="toggle-label"><input type="checkbox" checked={isPrivate} onChange={(event) => setPrivate(event.target.checked)} /> Manter como privada</label></div>
      <button className="primary-action" type="submit">Guardar memória</button>
    </form></div>}
  </section>;
}

