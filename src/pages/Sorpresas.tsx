import { useState } from "react";
import SanValentin from "../components/SanValentin";
import Aniversario from "../components/Aniversario";

const sorpresas = [
  { label: "💖 San Valentín", component: <SanValentin /> },
  { label: "🌹 Aniversario", component: <Aniversario /> },
  // ... más sorpresas aquí
];

export default function Sorpresas() {
  const [activo, setActivo] = useState<number | null>(null);

  return (
    <section className="p-8 text-center">

      {/* BOTONES */}
      <div className="flex justify-center gap-4 flex-wrap mb-8">
        {sorpresas.map((s, i) => (
          <button
            key={i}
            onClick={() => setActivo(activo === i ? null : i)}
            className={`px-6 py-3 rounded-full font-semibold shadow-lg transition ${
              activo === i
                ? "bg-pink-600 text-white scale-105"
                : "bg-pink-200 text-pink-800 hover:bg-pink-300"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* SORPRESA ACTIVA */}
      {activo !== null && (
        <div>
          {sorpresas[activo].component}
        </div>
      )}

    </section>
  );
}