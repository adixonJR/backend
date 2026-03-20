import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, Play, Trophy } from "lucide-react";

/* ===== COMPONENTE PRINCIPAL ===== */
export default function Juegos() {
  const [tab, setTab] = useState<"quiz" | "ruleta" | "memoria" | "rompecabezas" | "ahorcado" | "colores">("quiz");

  const games = [
    { id: "quiz", label: "Quiz", emoji: "❓" },
    { id: "ruleta", label: "Ruleta", emoji: "🎡" },
    { id: "memoria", label: "Memoria", emoji: "🧠" },
    { id: "rompecabezas", label: "Rompecabezas", emoji: "🧩" },
    { id: "ahorcado", label: "Ahorcado", emoji: "✏️" },
    { id: "colores", label: "Colores", emoji: "🎨" },
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Juegos 🎮
        </h2>
        <p className="text-purple-700 text-lg">Diviértete y demuestra lo que sabes de mí</p>
      </motion.div>

      {/* TABS */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex justify-center gap-2 mb-8 flex-wrap"
      >
        {games.map((game) => (
          <motion.button
            key={game.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-3 rounded-full font-bold transition-all flex items-center gap-2 ${
              tab === game.id
                ? "bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-lg"
                : "bg-white/40 text-purple-700 border-2 border-purple-200 hover:bg-white/50"
            }`}
            onClick={() => setTab(game.id as any)}
          >
            <span>{game.emoji}</span>
            {game.label}
          </motion.button>
        ))}
      </motion.div>

      {/* CONTENIDO */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-white/40 backdrop-blur-lg border-2 border-purple-200 p-8 rounded-3xl shadow-xl"
      >
        {tab === "quiz" && <Quiz />}
        {tab === "ruleta" && <Ruleta />}
        {tab === "memoria" && <Memoria />}
        {tab === "rompecabezas" && <Rompecabezas />}
        {tab === "ahorcado" && <Ahorcado />}
        {tab === "colores" && <Colores />}
      </motion.div>
    </section>
  );
}

/* ===== QUIZ ===== */
const SAMPLE_QUIZ = [
  { q: "¿Cuál es mi color favorito?", opts: ["Rojo", "Azul", "Morado"], a: 2 },
  { q: "¿Dónde nos conocimos?", opts: ["Plaza", "Red social", "Colegio"], a: 1 },
  { q: "¿Mi comida favorita?", opts: ["Pizza", "Sushi", "Ceviche"], a: 0 },
  { q: "¿Mi película favorita?", opts: ["Romance", "Acción", "Terror"], a: 0 },
  { q: "¿Mi estación favorita?", opts: ["Primavera", "Verano", "Invierno"], a: 0 },
];

function Quiz() {
  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const answer = (opt: number) => {
    if (done || selectedAnswer !== null) return;

    setSelectedAnswer(opt);

    setTimeout(() => {
      if (opt === SAMPLE_QUIZ[i].a) setScore((s) => s + 1);

      const next = i + 1;
      if (next >= SAMPLE_QUIZ.length) {
        setDone(true);
      } else {
        setI(next);
        setSelectedAnswer(null);
      }
    }, 600);
  };

  return (
    <motion.div className="text-center">
      <AnimatePresence mode="wait">
        {!done ? (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-center mb-4">
              <span className="text-purple-700 font-bold">
                Pregunta {i + 1} / {SAMPLE_QUIZ.length}
              </span>
              <div className="text-pink-500 font-bold">⭐ {score}</div>
            </div>

            <h3 className="text-2xl font-bold text-purple-700">
              {SAMPLE_QUIZ[i].q}
            </h3>

            <div className="flex flex-col gap-3">
              {SAMPLE_QUIZ[i].opts.map((o, idx) => (
                <motion.button
                  key={o}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => answer(idx)}
                  className={`p-4 rounded-xl font-semibold transition-all text-lg ${
                    selectedAnswer === null
                      ? "bg-white/50 text-purple-700 hover:bg-white/70 border-2 border-purple-200"
                      : selectedAnswer === idx
                      ? idx === SAMPLE_QUIZ[i].a
                        ? "bg-green-400 text-white border-2 border-green-500"
                        : "bg-red-400 text-white border-2 border-red-500"
                      : idx === SAMPLE_QUIZ[i].a
                      ? "bg-green-400 text-white border-2 border-green-500"
                      : "bg-white/30 text-purple-700 border-2 border-purple-200"
                  }`}
                  disabled={selectedAnswer !== null}
                >
                  {o}
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            <Trophy className="w-20 h-20 mx-auto text-yellow-400" />
            <h3 className="text-3xl font-bold text-purple-700">¡Terminaste! 🎉</h3>

            <div className="bg-white/50 p-6 rounded-2xl">
              <p className="text-2xl font-bold text-purple-700 mb-2">
                Puntaje: {score} / {SAMPLE_QUIZ.length}
              </p>
              <p className="text-purple-600">
                {score === SAMPLE_QUIZ.length
                  ? "¡Perfecto! ¡Eres experto en mí! 💕"
                  : score >= SAMPLE_QUIZ.length - 1
                  ? "¡Muy bien! Casi perfecto 😊"
                  : "¡Buen intento! Aprende más de mí 💖"}
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setI(0);
                setScore(0);
                setDone(false);
                setSelectedAnswer(null);
              }}
              className="px-8 py-3 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-xl font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2 mx-auto"
            >
              <RotateCcw size={20} />
              Jugar otra vez
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ===== RULETA ===== */
function Ruleta() {
  const items = [
    "💌 Carta de amor",
    "🌹 Rosas virtuales",
    "💝 Regalo especial",
    "😘 Beso virtual",
    "🎵 Canción dedicada",
    "📸 Foto especial",
    "💎 Diamante virtual",
    "🎁 Sorpresa",
  ];

  const [result, setResult] = useState<string | null>(null);
  const [spinning, setSpinning] = useState(false);

  const spin = () => {
    setSpinning(true);
    setResult(null);

    const r = Math.floor(Math.random() * items.length);
    let ticks = 0;

    const t = setInterval(() => {
      setResult(items[(r + ticks) % items.length]);
      ticks++;

      if (ticks > 15) {
        clearInterval(t);
        setResult(items[r]);
        setSpinning(false);
      }
    }, 80);
  };

  return (
    <motion.div className="space-y-8 text-center">
      <motion.div
        animate={{ rotate: spinning ? 360 : 0 }}
        transition={{ duration: 0.8 }}
        className="text-6xl mb-4"
      >
        🎡
      </motion.div>

      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        className="bg-white/50 p-8 rounded-2xl min-h-[120px] flex items-center justify-center"
      >
        <span className="text-3xl font-bold text-purple-700">
          {result || "¡Presiona Girar!"}
        </span>
      </motion.div>

      <div className="flex gap-4 justify-center flex-wrap">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={spin}
          disabled={spinning}
          className="px-8 py-3 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-xl font-bold hover:shadow-lg transition-all flex items-center gap-2 disabled:opacity-50"
        >
          <Play size={20} />
          Girar
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setResult(null)}
          className="px-8 py-3 bg-white/50 text-purple-700 rounded-xl font-bold hover:bg-white/70 transition-all flex items-center gap-2"
        >
          <RotateCcw size={20} />
          Limpiar
        </motion.button>
      </div>
    </motion.div>
  );
}

/* ===== MEMORIA ===== */
function Memoria() {
  const pairs = ["💕", "💕", "🌸", "🌸", "🐶", "🐶", "⭐", "⭐", "🎵", "🎵", "🍫", "🍫"];

  const [deck, setDeck] = useState(() => shuffle([...pairs]));
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);

  useEffect(() => {
    if (flipped.length === 2) {
      const [a, b] = flipped;

      if (deck[a] === deck[b]) {
        setMatched((m) => [...m, a, b]);
      }

      const t = setTimeout(() => setFlipped([]), 700);
      return () => clearTimeout(t);
    }
  }, [flipped, deck]);

  const flip = (i: number) => {
    if (flipped.includes(i) || matched.includes(i)) return;
    setFlipped((f) => [...f, i]);
  };

  const reset = () => {
    setDeck(shuffle([...pairs]));
    setFlipped([]);
    setMatched([]);
  };

  const isComplete = matched.length === deck.length;

  return (
    <motion.div className="text-center space-y-6">
      <div className="flex justify-between items-center mb-4">
        <span className="text-purple-700 font-bold">Parejas: {matched.length / 2} / 6</span>
        {isComplete && <span className="text-2xl">🎉</span>}
      </div>

      <div className="grid grid-cols-4 gap-3 md:gap-4 max-sm:grid-cols-3">
        {deck.map((c, idx) => {
          const isFlipped = flipped.includes(idx) || matched.includes(idx);

          return (
            <motion.button
              key={idx}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => flip(idx)}
              className={`aspect-square flex items-center justify-center text-4xl rounded-xl font-bold transition-all ${
                isFlipped
                  ? "bg-gradient-to-br from-pink-400 to-purple-400 text-white shadow-lg"
                  : "bg-white/50 text-purple-700 hover:bg-white/70 border-2 border-purple-300"
              }`}
              disabled={isFlipped}
            >
              {isFlipped ? c : "❓"}
            </motion.button>
          );
        })}
      </div>

      {isComplete && (
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="bg-yellow-200 p-4 rounded-xl"
        >
          <p className="text-xl font-bold text-yellow-700">¡Lo completaste! 🏆</p>
        </motion.div>
      )}

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={reset}
        className="px-8 py-3 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-xl font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2 mx-auto"
      >
        <RotateCcw size={20} />
        Reiniciar
      </motion.button>
    </motion.div>
  );
}

/* ===== ROMPECABEZAS ===== */
function Rompecabezas() {
  const [pieces, setPieces] = useState(() =>
    shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8])
  );
  const [moves, setMoves] = useState(0);

  const swap = (a: number, b: number) => {
    const newPieces = [...pieces];
    [newPieces[a], newPieces[b]] = [newPieces[b], newPieces[a]];
    setPieces(newPieces);
    setMoves((m) => m + 1);
  };

  const isComplete = pieces.every((p, i) => p === i);

  const handleClick = (index: number) => {
    const empty = pieces.indexOf(0);
    const adjacents = [
      empty - 3,
      empty + 3,
      empty % 3 !== 0 ? empty - 1 : null,
      empty % 3 !== 2 ? empty + 1 : null,
    ].filter((i) => i !== null && i >= 0 && i < 9);

    if (adjacents.includes(index)) {
      swap(index, empty);
    }
  };

  const reset = () => {
    setPieces(shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8]));
    setMoves(0);
  };

  return (
    <motion.div className="text-center space-y-6">
      <div className="flex justify-between items-center">
        <span className="text-purple-700 font-bold">Movimientos: {moves}</span>
        {isComplete && <span className="text-2xl">🎉</span>}
      </div>

      <div className="grid grid-cols-3 gap-2 max-w-sm mx-auto">
        {pieces.map((piece, idx) => (
          <motion.button
            key={idx}
            whileHover={piece !== 0 ? { scale: 1.05 } : {}}
            whileTap={piece !== 0 ? { scale: 0.95 } : {}}
            onClick={() => handleClick(idx)}
            className={`aspect-square flex items-center justify-center text-4xl font-bold rounded-lg transition-all ${
              piece === 0
                ? "bg-transparent"
                : "bg-gradient-to-br from-pink-400 to-purple-400 text-white shadow-lg hover:shadow-xl cursor-pointer"
            }`}
          >
            {piece !== 0 && piece + 1}
          </motion.button>
        ))}
      </div>

      {isComplete && (
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="bg-yellow-200 p-4 rounded-xl"
        >
          <p className="text-xl font-bold text-yellow-700">
            ¡Ganaste en {moves} movimientos! 🏆
          </p>
        </motion.div>
      )}

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={reset}
        className="px-8 py-3 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-xl font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2 mx-auto"
      >
        <RotateCcw size={20} />
        Reiniciar
      </motion.button>
    </motion.div>
  );
}

/* ===== AHORCADO ===== */
function Ahorcado() {
  const words = ["AMOR", "JUNTOS", "CORAZON", "BESOS", "ETERNIDAD"];
  const [word, setWord] = useState(words[Math.floor(Math.random() * words.length)]);
  const [guessed, setGuessed] = useState<string[]>([]);
  const [wrong, setWrong] = useState(0);

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const maxWrong = 6;
  const lost = wrong >= maxWrong;
  const won = word.split("").every((l) => guessed.includes(l));

  const guess = (letter: string) => {
    if (guessed.includes(letter)) return;

    setGuessed([...guessed, letter]);

    if (!word.includes(letter)) {
      setWrong((w) => w + 1);
    }
  };

  const reset = () => {
    setWord(words[Math.floor(Math.random() * words.length)]);
    setGuessed([]);
    setWrong(0);
  };

  return (
    <motion.div className="text-center space-y-6">
      <div className="text-6xl">
        {wrong === 0 && "😊"}
        {wrong === 1 && "😐"}
        {wrong === 2 && "😕"}
        {wrong === 3 && "😟"}
        {wrong === 4 && "😦"}
        {wrong === 5 && "😱"}
        {wrong === 6 && "💀"}
      </div>

      <div className="text-4xl font-bold tracking-widest text-purple-700">
        {word.split("").map((l) => (guessed.includes(l) ? l : "_")).join(" ")}
      </div>

      <p className="text-purple-600 font-bold">Vidas: {maxWrong - wrong} / {maxWrong}</p>

      <div className="grid grid-cols-7 gap-2 max-w-md mx-auto">
        {letters.map((l) => (
          <motion.button
            key={l}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => guess(l)}
            disabled={guessed.includes(l) || lost || won}
            className={`p-2 rounded-lg font-bold transition-all ${
              guessed.includes(l)
                ? word.includes(l)
                  ? "bg-green-400 text-white"
                  : "bg-red-400 text-white"
                : "bg-white/50 text-purple-700 hover:bg-white/70"
            }`}
          >
            {l}
          </motion.button>
        ))}
      </div>

      {(won || lost) && (
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className={`p-4 rounded-xl ${won ? "bg-yellow-200" : "bg-red-300"}`}
        >
          <p className={`text-xl font-bold ${won ? "text-yellow-700" : "text-red-700"}`}>
            {won ? "¡Ganaste! 🎉" : `¡Perdiste! La palabra era: ${word}`}
          </p>
        </motion.div>
      )}

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={reset}
        className="px-8 py-3 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-xl font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2 mx-auto"
      >
        <RotateCcw size={20} />
        {won || lost ? "Jugar otra vez" : "Reiniciar"}
      </motion.button>
    </motion.div>
  );
}

/* ===== COLORES ===== */
function Colores() {
  const colors = [
    { name: "Rojo", hex: "#FF6B6B" },
    { name: "Azul", hex: "#4ECDC4" },
    { name: "Verde", hex: "#95E1D3" },
    { name: "Amarillo", hex: "#FFE66D" },
    { name: "Púrpura", hex: "#C9ADA7" },
    { name: "Rosa", hex: "#F8B195" },
  ];

  const [score, setScore] = useState(0);
  const [current, setCurrent] = useState(0);
  const [time, setTime] = useState(30);
  const [gameActive, setGameActive] = useState(false);

  useEffect(() => {
    if (!gameActive || time === 0) return;
    const timer = setTimeout(() => setTime((t) => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [gameActive, time]);

  useEffect(() => {
    if (time === 0) setGameActive(false);
  }, [time]);

  const guess = (idx: number) => {
    if (!gameActive) return;
    if (idx === current) {
      setScore((s) => s + 1);
      setCurrent(Math.floor(Math.random() * colors.length));
    }
  };

  const start = () => {
    setScore(0);
    setTime(30);
    setCurrent(Math.floor(Math.random() * colors.length));
    setGameActive(true);
  };

  return (
    <motion.div className="text-center space-y-6">
      <div className="flex justify-between items-center">
        <div className="text-purple-700 font-bold text-xl">Puntos: {score}</div>
        <div className="text-purple-700 font-bold text-xl">Tiempo: {time}s</div>
      </div>

      {gameActive && (
        <motion.div
          key={colors[current].name}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="p-8 rounded-2xl"
          style={{ backgroundColor: colors[current].hex }}
        >
          <p className="text-white text-2xl font-bold">Haz clic en:</p>
          <p className="text-white text-4xl font-bold">{colors[current].name}</p>
        </motion.div>
      )}

      <div className="grid grid-cols-3 gap-4">
        {colors.map((c, idx) => (
          <motion.button
            key={c.name}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => guess(idx)}
            disabled={!gameActive}
            className="p-8 rounded-xl font-bold text-white transition-all disabled:opacity-50"
            style={{ backgroundColor: c.hex }}
          >
            {c.name}
          </motion.button>
        ))}
      </div>

      {!gameActive && time !== 30 && (
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="bg-yellow-200 p-4 rounded-xl"
        >
          <p className="text-xl font-bold text-yellow-700">Puntuación final: {score} 🎉</p>
        </motion.div>
      )}

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={start}
        disabled={gameActive}
        className="px-8 py-3 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-xl font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2 mx-auto disabled:opacity-50"
      >
        <Play size={20} />
        {gameActive ? "En juego..." : "Empezar"}
      </motion.button>
    </motion.div>
  );
}

/* ===== SHUFFLE ===== */
function shuffle<T>(arr: T[]) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}