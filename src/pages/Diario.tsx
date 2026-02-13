import { useEffect, useState } from 'react';
import '../CSS/Diario.css';

export default function Diario() {
  const [entries, setEntries] = useState<{ id: number; text: string; date: string }[]>(() => {
    try {
      const raw = localStorage.getItem('miniweb_diario');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const [text, setText] = useState('');

  useEffect(() => {
    localStorage.setItem('miniweb_diario', JSON.stringify(entries));
  }, [entries]);

  const add = () => {
    if (!text.trim()) return;
    setEntries(e => [
      { id: Date.now(), text, date: new Date().toLocaleString() },
      ...e,
    ]);
    setText('');
  };

  const remove = (id: number) =>
    setEntries(e => e.filter(r => r.id !== id));

  return (
    <section className="diario-section">
      {/* ===== CONTENIDO BLOQUEADO ===== */}
      <div className="diario-blur">
        <h2>Diario</h2>

        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          rows={3}
          placeholder="Escribe algo bonito..."
        />

        <div className="diario-buttons">
          <button className="btn btn-purple">Guardar</button>
          <button className="btn btn-clear">Borrar todo</button>
        </div>

        <div className="diario-entries">
          {entries.map(en => (
            <div key={en.id} className="diario-entry">
              <div className="date">{en.date}</div>
              <div>{en.text}</div>
              <div className="entry-buttons">
                <button className="btn btn-copy-small">Copiar</button>
                <button className="btn btn-clear-small">Eliminar</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== PANEL SUPERIOR ===== */}
      <div className="diario-overlay">
        <h3>💗 Trabajando en esto</h3>
        <p>
          Este diario está siendo preparado con amor.<br />
          Pronto podrás guardar recuerdos especiales ✨
        </p>
      </div>
    </section>
  );
}
