import { useEffect, useState } from "react";
import ConfettiButton from "../components/ConfettiButton";
import "../CSS/Sorpresa.css";

import love from "../assets/love.jpg";
import love1 from "../assets/love1.jpg";
import love2 from "../assets/love2.jpg";
import love3 from "../assets/love3.jpg";

const imgs = [love, love1, love2, love3];

export default function Sorpresas() {
  const [idx, setIdx] = useState(0);
  const [showSecret, setShowSecret] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setIdx(i => (i + 1) % imgs.length);
    }, 3500);
    return () => clearInterval(t);
  }, []);

  const hablar = () => {
    const msg = new SpeechSynthesisUtterance(
      "Feliz San Valentín. Gracias por existir, eres muy especial para mí"
    );
    msg.lang = "es-ES";
    speechSynthesis.speak(msg);
  };

  // 💖 contador de días juntos
  const startDate = new Date("2022-03-27");
  const daysTogether = Math.floor(
    (Date.now() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <section className="sanvalentin-section">
      <h1 className="san-title">💖 Feliz San Valentín 💖</h1>

      <p className="san-phrase">
        “En este San Valentín no regalo flores,  
        te regalo mi corazón y todo lo que soy.”
      </p>

      <p className="san-days">
        💞 Llevamos <strong>{daysTogether}</strong> días compartiendo momentos
      </p>

      {/* 💌 TEXTO GRANDE / CARTA */}
      <div className="san-letter">
        <p>
          Hoy no quiero decirte algo simple,  
          quiero decirte algo verdadero.
        </p>

        <p>
          Gracias por estar, incluso cuando el mundo pesa.  
          Gracias por quedarte, por entender, por sentir.
        </p>

        <p className="highlight">
          Si el amor tuviera nombre,  
          tendría el tuyo.
        </p>

        <p>
          No prometo perfección,  
          pero sí elegirte cada día,  
          en los buenos momentos  
          y en los días difíciles.
        </p>
      </div>

      {/* IMAGEN PRINCIPAL */}
      <div className="san-image">
        <img src={imgs[idx]} alt="amor" />
      </div>

      {/* MINI GALERÍA */}
      <div className="san-thumbs">
        {imgs.map((img, i) => (
          <img
            key={i}
            src={img}
            onClick={() => setIdx(i)}
            className={i === idx ? "active" : ""}
          />
        ))}
      </div>

      {/* RAZONES */}
      <div className="san-reasons">
        <h3>💘 Algunas razones por las que te quiero</h3>
        <ul>
          <li>Tu sonrisa cambia mis días</li>
          <li>Tu apoyo incluso en silencio</li>
          <li>Cómo haces especial lo simple</li>
          <li>Cómo me haces sentir en casa</li>
        </ul>
      </div>

      {/* CONFETI + VOZ */}
      <div className="san-actions">
        <ConfettiButton />
        <button onClick={hablar} className="san-voice-btn">
          💌 Escuchar Mensaje
        </button>
      </div>

      {/* MENSAJE SECRETO */}
      <div className="san-secret">
        {!showSecret ? (
          <button onClick={() => setShowSecret(true)} className="san-secret-btn">
            🌹 Ver mensaje secreto
          </button>
        ) : (
          <p className="san-secret-text">
            No importa el tiempo, la distancia o los días difíciles…  
            elegirte siempre será mi mejor decisión ❤️
          </p>
        )}
      </div>
    </section>
  );
}
