import { useRef, useState } from "react";
import { Circle, Download, ExternalLink, Mic, Music2, Pause, Play, Save, Square, Volume2 } from "lucide-react";
import { createLocalMemory, LocalMemory } from "@/lib/local-vault";

type Props = { onSaveSound: (memory: LocalMemory) => void; };
type Take = { url: string; name: string; createdAt: number };

const notes = ["C", "D", "E", "F", "G", "A", "B", "C+"];

function playTone(frequency: number, seconds = 0.28, type: OscillatorType = "triangle") {
  const context = new AudioContext();
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = type; oscillator.frequency.value = frequency; gain.gain.setValueAtTime(0.09, context.currentTime); gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + seconds);
  oscillator.connect(gain); gain.connect(context.destination); oscillator.start(); oscillator.stop(context.currentTime + seconds); oscillator.onended = () => context.close();
}

export function CompactStudio({ onSaveSound }: Props) {
  const recorder = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);
  const [recording, setRecording] = useState(false);
  const [take, setTake] = useState<Take | null>(null);
  const [message, setMessage] = useState("Pronto para gravar localmente");
  const [tempo, setTempo] = useState(100);
  const [activePad, setActivePad] = useState<string | null>(null);

  const startRecording = async () => {
    if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) { setMessage("A gravação requer um browser compatível e acesso ao microfone."); return; }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      chunks.current = [];
      mediaRecorder.ondataavailable = (event) => { if (event.data.size) chunks.current.push(event.data); };
      mediaRecorder.onstop = () => { const blob = new Blob(chunks.current, { type: mediaRecorder.mimeType || "audio/webm" }); const url = URL.createObjectURL(blob); setTake({ url, name: `Take ${new Date().toLocaleTimeString("pt-PT", { hour: "2-digit", minute: "2-digit" })}`, createdAt: Date.now() }); stream.getTracks().forEach((track) => track.stop()); setMessage("Take pronta. Pode ouvir, exportar ou guardar como memória sonora."); };
      recorder.current = mediaRecorder; mediaRecorder.start(); setRecording(true); setMessage("A gravar localmente — o áudio não é enviado.");
    } catch { setMessage("Não foi possível usar o microfone. Verifique a permissão do browser."); }
  };
  const stopRecording = () => { recorder.current?.stop(); setRecording(false); };
  const triggerPad = (name: string, frequency: number, type: OscillatorType) => { playTone(frequency, name === "Kick" ? 0.2 : 0.09, type); setActivePad(name); window.setTimeout(() => setActivePad(null), 120); };
  const saveSoundMemory = () => { if (!take) return; onSaveSound(createLocalMemory({ title: "Memória sonora", story: `Uma take criada no Bora Uzima Studio às ${new Date(take.createdAt).toLocaleString("pt-PT")}. A reprodução fica disponível durante esta sessão; exporte o ficheiro para o guardar fora do browser.`, kind: "sound", mood: "Criativo", private: true, soundLabel: take.name })); setMessage("A referência da take entrou nas suas Memórias Sonoras."); };

  return <section className="space-shell studio-shell" id="studio">
    <div className="section-heading"><div><span className="eyebrow">02 / BORA UZIMA STUDIO</span><h2>Crie o som do momento.</h2><p>Grave uma ideia, toque uma nota e transforme a take numa Memória Sonora. O estúdio completo continua disponível para produção avançada.</p></div><a className="outline-action" href="https://fernando-lucoco-music.vercel.app/" target="_blank" rel="noreferrer">Abrir estúdio completo <ExternalLink size={16} /></a></div>
    <div className="studio-console">
      <div className="record-panel"><div className="console-caption"><span className={recording ? "record-light live" : "record-light"}><Circle size={12} fill="currentColor" /> {recording ? "REC" : "LOCAL"}</span><span>{message}</span></div><div className="record-actions">{recording ? <button className="record-button stop" onClick={stopRecording}><Square size={19} fill="currentColor" /> Parar</button> : <button className="record-button" onClick={startRecording}><Mic size={19} /> Gravar take</button>}<span className="record-tip">Use auscultadores se activar monitorização no estúdio completo.</span></div>{take && <div className="take-row"><div><Music2 size={18} /><span><strong>{take.name}</strong><small>Ficheiro temporário desta sessão</small></span></div><div className="take-actions"><audio controls src={take.url} /><a download="bora-uzima-take.webm" href={take.url} aria-label="Exportar take"><Download size={17} /></a><button onClick={saveSoundMemory}><Save size={16} /> Guardar como memória</button></div></div>}</div>
      <div className="instrument-panel"><div className="instrument-head"><span className="eyebrow">INSTRUMENT LAB</span><label>{tempo} BPM<input aria-label="Tempo" type="range" min="70" max="150" value={tempo} onChange={(event) => setTempo(Number(event.target.value))} /></label></div><div className="keys">{notes.map((note, index) => <button key={note} onClick={() => playTone(261.63 * Math.pow(2, index / 7))}>{note}</button>)}</div><div className="pad-grid">{[["Kick", 88, "sine"], ["Snare", 180, "square"], ["Hat", 6200, "square"], ["Clap", 350, "triangle"]].map(([name, frequency, type]) => <button key={String(name)} onClick={() => triggerPad(String(name), Number(frequency), type as OscillatorType)} className={activePad === name ? "active-pad" : ""}><Volume2 size={16} />{name}</button>)}</div></div>
    </div>
  </section>;
}

