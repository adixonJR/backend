import { useEffect, useRef, useState } from "react";
import ConfettiButton from "../components/ConfettiButton";
import "../CSS/Sorpresa.css";
import music from "../assets/audio2.wav";

import love from "../assets/love.jpg";
import love1 from "../assets/love1.jpg";
import love2 from "../assets/love2.jpg";
import love3 from "../assets/love3.jpg";

const imgs = [love, love1, love2, love3];

export default function Sorpresas() {
  const [idx, setIdx] = useState(0);
  const [showSecret, setShowSecret] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const startDatee = new Date("2022-03-27");
  const daysTogether = Math.floor(
    (Date.now() - startDatee.getTime()) / (1000 * 60 * 60 * 24)
  );
  /* 🎶 Música */
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    playing ? audioRef.current.pause() : audioRef.current.play();
    setPlaying(!playing);
  };

  /* 🖼️ Carrusel */
  useEffect(() => {
    const t = setInterval(() => {
      setIdx(i => (i + 1) % imgs.length);
    }, 3500);
    return () => clearInterval(t);
  }, []);

  /* 💌 Mensajes secretos */
  const secretMessages = [
    "Elegirte siempre será mi mejor decisión ❤️",
    "Contigo todo se siente más bonito ✨",
    "Eres mi lugar seguro 🏡",
    "Te elegiría incluso en otra vida 💞",
  ];

  useEffect(() => {
    if (!showSecret) return;
    const interval = setInterval(() => {
      setCurrentIndex(i =>
        i < secretMessages.length - 1 ? i + 1 : 0
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [showSecret]);

  /* 💞 Contador de tiempo juntos */
  const startDate = new Date("2023-03-27");
  const now = new Date();

  let years = now.getFullYear() - startDate.getFullYear();
  let months = now.getMonth() - startDate.getMonth();
  let days = now.getDate() - startDate.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  /* ⏱️ Contador en vivo */
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const diffMs = time.getTime() - startDate.getTime();
  const totalSeconds = Math.floor(diffMs / 1000);
  const seconds = totalSeconds % 60;
  const totalMinutes = Math.floor(totalSeconds / 60);
  const minutes = totalMinutes % 60;
  const totalHours = Math.floor(totalMinutes / 60);
  const hours = totalHours % 24;

  return (
    <section className="sanvalentin-section">
      <h1 className="san-title">💖 Feliz San Valentín 💖</h1>

      <p className="san-phrase">
        “En este San Valentín no regalo flores,  
        te regalo mi corazón y todo lo que soy.”
      </p>

      <p className="san-days"> 💞 Llevamos <strong>{daysTogether}</strong> días juntos </p>

      {/* 💌 CARTA */}
      <div className="san-letter">
        <p>Hoy no quiero decirte algo simple, quiero decirte algo verdadero.</p>
        <p>Gracias por quedarte, por entender, por sentir.</p>
        <p className="highlight">
          Si el amor tuviera nombre, tendría el tuyo.
        </p>
      </div>

      {/* 🖼️ IMAGEN */}
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

      {/* 💕 DOS COLUMNAS */}
      <div className="san-columns">
        <div className="san-extra">
          <h3>🌹 Cosas que amo de ti</h3>
          <ul className="san-list">
            <li>💗 Tu sonrisa cuando estás feliz</li>
            <li>🏡 Cómo me haces sentir en casa</li>
            <li>🤍 Tu forma de cuidar y amar</li>
            <li>✨ Que siempre eres tú misma</li>
          </ul>
        </div>

        <div className="san-promises">
          <h3>💍 Mis promesas</h3>
          <ul className="san-list">
            <li>💞 Elegirte incluso en los días difíciles</li>
            <li>🌿 Caminar contigo sin importar el camino</li>
            <li>💖 Amarte con hechos, no solo palabras</li>
            <li>🛡️ Protegerte a capa y espada</li>
          </ul>
        </div>
      </div>

     {/* ❤️ CONTADOR */}
<div className="san-days">
  <div className="san-timer-grid">

    {/* ⏳ TIEMPO LARGO */}
    <div className="san-timer-box">
      <h4>💞 Tiempo juntos</h4>
      <div className="san-timer">
        <span><strong>{years}</strong> años</span>
        <span><strong>{months}</strong> meses</span>
        <span><strong>{days}</strong> días</span>
      </div>
    </div>

    {/* ⏱️ TIEMPO EN VIVO */}
    <div className="san-timer-box">
      <h4>⏱️ y contando..</h4>
      <div className="san-timer">
        <span><strong>{hours}</strong> h</span>
        <span><strong>{minutes}</strong> min</span>
        <span><strong>{seconds}</strong> seg</span>
      </div>
    </div>

  </div>
</div>



      {/* 🎉 CONFETI + 🎶 MÚSICA */}
      <div className="san-actions">
        <ConfettiButton />
        <audio ref={audioRef} src={music} loop />
        <button onClick={toggleMusic} className="san-voice-btn">
          {playing ? "⏸️ Pausar Música" : "🎶 Reproducir Música"}
        </button>
      </div>

      {/* 🌹 MENSAJE SECRETO */}
      <div className="san-secret">
        {!showSecret ? (
          <button
            onClick={() => {
              setShowSecret(true);
              setCurrentIndex(0);
            }}
            className="san-secret-btn"
          >
            🌹 Ver mensaje secreto
          </button>
        ) : (
          <div className="san-secret-text">
            <p key={currentIndex} className="fade-in-out">
              {secretMessages[currentIndex]}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
