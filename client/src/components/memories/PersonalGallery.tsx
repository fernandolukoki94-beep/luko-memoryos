import { Camera, Heart, LockKeyhole } from "lucide-react";

const photos = [
  { src: "/gallery/fernando-portrait.png", alt: "Retrato de Fernando Lukoki com roupa preta e boné", label: "Retrato", detail: "Presença e identidade" },
  { src: "/gallery/moment-party.png", alt: "Momento social num evento", label: "Um momento", detail: "Histórias partilhadas" },
  { src: "/gallery/family-blue.jpg", alt: "Pessoa de vestido azul numa casa", label: "Família", detail: "Quem nos acompanha" },
];

export function PersonalGallery() {
  return <section className="space-shell gallery-shell" id="galeria">
    <div className="section-heading"><div><span className="eyebrow">01B / GALERIA PESSOAL</span><h2>As imagens também contam a história.</h2><p>Uma selecção de retratos e momentos ligados ao arquivo. A galeria é visual, mas as memórias continuam a ser escritas e criadas por si.</p></div><span className="local-chip"><Camera size={15} /> Colecção pessoal</span></div>
    <div className="gallery-grid">{photos.map((photo, index) => <figure key={photo.src} className={`gallery-frame frame-${index + 1}`}><img src={photo.src} alt={photo.alt} /><figcaption><span>{photo.label}</span><small>{photo.detail}</small></figcaption></figure>)}<figure className="tribute-frame"><img src="/gallery/antonio-tribute.jpg" alt="Cartão de homenagem em memória de António" /><figcaption><Heart size={15} fill="currentColor" /><span>Em memória de António</span><small>Uma homenagem guardada com respeito.</small></figcaption></figure></div>
    <p className="gallery-privacy"><LockKeyhole size={14} /> Estas são fotografias pessoais colocadas nesta página a pedido do titular. Antes de partilhar publicamente outras imagens de familiares ou amigos, confirme sempre que tem autorização.</p>
  </section>;
}

