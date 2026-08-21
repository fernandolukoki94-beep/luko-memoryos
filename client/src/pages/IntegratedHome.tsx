import { useEffect, useState } from "react";
import { ArrowDown, Disc3, Gamepad2, Menu, Music2, ShieldCheck, Sparkles, X } from "lucide-react";
import { ArcadeRetro } from "@/components/arcade/ArcadeRetro";
import { MemoriesSpace } from "@/components/memories/MemoriesSpace";
import { CompactStudio } from "@/components/studio/CompactStudio";
import { LocalMemory, readLocalMemories, writeLocalMemories } from "@/lib/local-vault";

const sections = [
  { id: "memorias", label: "Memórias", icon: ShieldCheck },
  { id: "studio", label: "Bora Uzima", icon: Music2 },
  { id: "arcade", label: "Arcade", icon: Gamepad2 },
];

export default function IntegratedHome() {
  const [memories, setMemories] = useState<LocalMemory[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => setMemories(readLocalMemories()), []);
  const persist = (next: LocalMemory[]) => { setMemories(next); writeLocalMemories(next); };
  const go = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); setMenuOpen(false); };

  return <main className="integrated-app">
    <header className="topbar"><a className="brand" href="#top" onClick={(event) => { event.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}><span className="brand-mark"><Disc3 size={19} /></span><span><strong>Lucu</strong> Memories<small>by Fernando Lukoki</small></span></a><nav className={menuOpen ? "nav-links mobile-open" : "nav-links"}>{sections.map(({ id, label }) => <button key={id} onClick={() => go(id)}>{label}</button>)}<a href="/rex" className="quiet-link">REX Lab</a></nav><button className="menu-toggle" aria-label="Abrir menu" onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? <X size={21} /> : <Menu size={21} />}</button></header>
    <section className="integrated-hero" id="top"><div className="hero-copy"><span className="eyebrow hero-eyebrow">ARQUIVO · SOM · JOGO</span><h1>Guarde a história.<br /><em>Crie a banda sonora.</em></h1><p>Uma casa digital para momentos escritos, ideias gravadas e pequenas pausas retro. Cada área tem uma função clara e os seus dados ficam no seu browser.</p><div className="hero-actions"><button className="primary-action" onClick={() => go("memorias")}>Entrar nas memórias <ArrowDown size={17} /></button><button className="text-action" onClick={() => go("studio")}>Conhecer o Studio</button></div></div><div className="hero-console"><div className="console-orbit" /><div className="hero-card main"><span className="card-index">01</span><ShieldCheck size={23} /><strong>Memórias</strong><small>Textos e memórias sonoras</small></div><div className="hero-card studio"><span className="card-index">02</span><Music2 size={23} /><strong>Bora Uzima</strong><small>Grave e transforme em memória</small></div><div className="hero-card arcade"><span className="card-index">03</span><Gamepad2 size={23} /><strong>Arcade</strong><small>Cinco jogos retro locais</small></div></div></section>
    <section className="trust-strip"><span><Sparkles size={15} /> Sem perfil falso</span><span><ShieldCheck size={15} /> Dados locais e estados honestos</span><span><Gamepad2 size={15} /> Jogos sem anúncios</span></section>
    <MemoriesSpace memories={memories} onAdd={(memory) => persist([memory, ...memories])} onDelete={(id) => persist(memories.filter((memory) => memory.id !== id))} />
    <CompactStudio onSaveSound={(memory) => persist([memory, ...memories])} />
    <ArcadeRetro />
    <footer className="integrated-footer"><div><a className="brand footer-brand" href="#top"><span className="brand-mark"><Disc3 size={17} /></span><span><strong>Lucu</strong> Memories</span></a><p>Memórias, música e jogos num espaço com limites claros.</p></div><div><strong>Áreas</strong><button onClick={() => go("memorias")}>Memórias</button><button onClick={() => go("studio")}>Bora Uzima Studio</button><button onClick={() => go("arcade")}>Arcade Retro</button></div><div><strong>Nota de transparência</strong><p>Esta experiência não substitui um serviço de backup. Exporte as suas takes e não guarde informação sensível até existir uma camada segura de sincronização.</p></div></footer>
  </main>;
}

