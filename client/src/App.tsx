import { useState } from "react";
import { Bell, Bookmark, ChevronDown, CircleHelp, Gamepad2, LayoutDashboard, Menu, MessageSquare, Moon, Search, Settings, Sun, Trophy, Users, Wifi, X, Zap } from "lucide-react";
import Home from "./pages/Home";

export type Section = "overview" | "community" | "games" | "leaderboard" | "cafe";
const navItems: { id: Section; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "overview", label: "Vue d'ensemble", icon: LayoutDashboard }, { id: "community", label: "Communauté", icon: Users },
  { id: "games", label: "Jeux & défis", icon: Gamepad2 }, { id: "leaderboard", label: "Classement", icon: Trophy }, { id: "cafe", label: "Cybercafé", icon: Wifi },
];

export default function App() {
  const [section, setSection] = useState<Section>("overview");
  const [darkMode, setDarkMode] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifications, setNotifications] = useState(3);
  return <div className={`app-shell ${darkMode ? "theme-dark" : "theme-light"}`}>
    <aside className={`sidebar ${mobileOpen ? "sidebar-open" : ""}`}>
      <div className="brand-row"><div className="brand-mark"><Zap size={18} fill="currentColor" /></div><div><div className="brand-name">CYBER<span>HUB</span></div><div className="brand-caption">PLAY · CONNECT · LEVEL UP</div></div><button className="icon-button mobile-close" onClick={() => setMobileOpen(false)} aria-label="Fermer le menu"><X size={19} /></button></div>
      <div className="profile-mini"><div className="avatar avatar-a">LM</div><div className="profile-copy"><strong>Lucas Martin</strong><span>Rang #24 · Niveau 18</span></div><ChevronDown size={15} className="muted" /></div>
      <nav className="main-nav" aria-label="Navigation principale"><div className="nav-label">ESPACE PERSONNEL</div>{navItems.map(({ id, label, icon: Icon }) => <button key={id} className={`nav-item ${section === id ? "active" : ""}`} onClick={() => { setSection(id); setMobileOpen(false); }}><Icon size={18} /><span>{label}</span>{id === "community" && <span className="nav-dot" />}</button>)}<div className="nav-label nav-label-spaced">OUTILS</div><button className="nav-item" onClick={() => setNotifications(0)}><MessageSquare size={18} /><span>Messages</span><b className="nav-count">4</b></button><button className="nav-item" onClick={() => setNotifications(0)}><Bell size={18} /><span>Notifications</span>{notifications > 0 && <b className="nav-count accent">{notifications}</b>}</button><button className="nav-item"><Bookmark size={18} /><span>Enregistrés</span></button></nav>
      <div className="sidebar-bottom"><div className="streak-card"><div className="streak-icon"><Zap size={16} fill="currentColor" /></div><div><strong>7 jours de série</strong><span>Continue comme ça !</span></div></div><button className="nav-item"><Settings size={18} /><span>Paramètres</span></button><button className="nav-item"><CircleHelp size={18} /><span>Aide & support</span></button><div className="online-status"><span className="status-pulse" /> Serveur EU-West · En ligne</div></div>
    </aside>
    {mobileOpen && <div className="sidebar-overlay" onClick={() => setMobileOpen(false)} />}
    <main className="main-content"><header className="topbar"><button className="icon-button mobile-menu" onClick={() => setMobileOpen(true)} aria-label="Ouvrir le menu"><Menu size={21} /></button><div className="breadcrumb"><span>CYBERHUB</span><span className="slash">/</span><strong>{navItems.find((n) => n.id === section)?.label}</strong></div><div className="top-actions"><div className="search-box"><Search size={16} /><input placeholder="Rechercher un joueur, un jeu..." /></div><button className="icon-button theme-toggle" onClick={() => setDarkMode((v) => !v)} aria-label="Changer de thème">{darkMode ? <Sun size={18} /> : <Moon size={18} />}</button><button className="notification-button" onClick={() => setNotifications(0)}><Bell size={18} />{notifications > 0 && <span>{notifications}</span>}</button><div className="top-avatar avatar avatar-a">LM</div></div></header><Home section={section} onSectionChange={setSection} /></main>
  </div>;
}

export { navItems };
