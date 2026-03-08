import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MessageCircle, Trash2, Copy, Plus, Users, Send } from "lucide-react";

type Entry = {
  id: number;
  author: string;
  text: string;
  date: string;
  emoji?: string;
};

type Person = {
  id: string;
  name: string;
  emoji: string;
};

const DEFAULT_PEOPLE = [
  { id: "me", name: "Para mí", emoji: "💖" },
  { id: "you", name: "Para ti", emoji: "💕" },
  { id: "us", name: "Nosotros", emoji: "👥" },
];

export default function Diario() {
  const [mode, setMode] = useState<"diario" | "chat">("diario");
  const [entries, setEntries] = useState<Entry[]>(() => {
    try {
      const raw = localStorage.getItem("miniweb_diario");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const [currentAuthor, setCurrentAuthor] = useState<string>("me");
  const [text, setText] = useState("");

  useEffect(() => {
    localStorage.setItem("miniweb_diario", JSON.stringify(entries));
  }, [entries]);

  const add = () => {
    if (!text.trim()) return;

    const author = DEFAULT_PEOPLE.find(p => p.id === currentAuthor);
    setEntries((e) => [
      {
        id: Date.now(),
        author: author?.name || "Desconocido",
        text,
        date: new Date().toLocaleString("es-ES"),
        emoji: author?.emoji,
      },
      ...e,
    ]);

    setText("");
  };

  const remove = (id: number) => {
    setEntries((e) => e.filter((r) => r.id !== id));
  };

  const clearAll = () => {
    if (confirm("¿Estás segura de que deseas eliminar todo?")) {
      setEntries([]);
    }
  };

  const copyText = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const filteredEntries = entries;

  return (
    <section className="max-w-4xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Diario 💗
        </h2>
        <p className="text-purple-700 text-lg">
          Nuestros momentos y conversaciones especiales
        </p>
      </motion.div>

      {/* MODE SELECTOR */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex gap-4 justify-center mb-8"
      >
        {[
          { id: "diario", label: "Diario", icon: Heart },
          { id: "chat", label: "Chat", icon: MessageCircle },
        ].map((m) => {
          const Icon = m.icon;
          return (
            <motion.button
              key={m.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setMode(m.id as any)}
              className={`px-6 py-3 rounded-full font-bold flex items-center gap-2 transition-all ${
                mode === m.id
                  ? "bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-lg"
                  : "bg-white/40 text-purple-700 border-2 border-purple-200 hover:bg-white/50"
              }`}
            >
              <Icon size={20} />
              {m.label}
            </motion.button>
          );
        })}
      </motion.div>

      {/* INPUT SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 20 }}
        transition={{ delay: 0.3 }}
        className="bg-white/40 backdrop-blur-lg border-2 border-purple-200 p-6 rounded-3xl shadow-xl mb-8"
      >
        {/* AUTHOR SELECTOR */}
        <div className="mb-4">
          <p className="text-purple-700 font-semibold mb-3">
            {mode === "diario" ? "¿Quién escribe?" : "Enviar como:"}
          </p>
          <div className="grid grid-cols-3 gap-3">
            {DEFAULT_PEOPLE.map((person) => (
              <motion.button
                key={person.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentAuthor(person.id)}
                className={`p-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                  currentAuthor === person.id
                    ? "bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-lg"
                    : "bg-white/50 text-purple-700 border-2 border-purple-300 hover:bg-white/70"
                }`}
              >
                <span className="text-xl">{person.emoji}</span>
                {person.name}
              </motion.button>
            ))}
          </div>
        </div>

        {/* TEXT INPUT */}
        <div className="space-y-3">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter" && e.ctrlKey) {
                add();
              }
            }}
            rows={mode === "diario" ? 4 : 2}
            placeholder={
              mode === "diario"
                ? "Escribe algo bonito sobre nuestro día..."
                : "Escribe un mensaje..."
            }
            className="w-full p-4 rounded-xl bg-white/70 text-purple-700 placeholder-purple-400
            focus:bg-white outline-none resize-none border-2 border-purple-200 focus:border-pink-400"
          />

          <div className="flex gap-3 flex-wrap">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={add}
              className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-pink-400 to-purple-400 text-white font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Send size={20} />
              {mode === "diario" ? "Guardar" : "Enviar"}
            </motion.button>

            {mode === "diario" && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={clearAll}
                className="px-6 py-3 rounded-xl bg-red-300 text-red-700 font-bold hover:bg-red-400 transition-all flex items-center gap-2"
              >
                <Trash2 size={20} />
                Limpiar
              </motion.button>
            )}
          </div>
        </div>
      </motion.div>

      {/* ENTRIES DISPLAY */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="space-y-4"
      >
        {/* HEADER */}
        <div className="flex items-center gap-3 mb-4">
          {mode === "chat" ? (
            <MessageCircle className="text-pink-500" size={28} />
          ) : (
            <Heart className="text-pink-500" size={28} />
          )}
          <h3 className="text-2xl font-bold text-purple-700">
            {mode === "diario" ? "Nuestros Recuerdos" : "Conversación"}
          </h3>
          <span className="ml-auto bg-purple-200 text-purple-700 px-4 py-2 rounded-full font-bold">
            {filteredEntries.length}
          </span>
        </div>

        {/* MESSAGES/ENTRIES */}
        <div className={`space-y-4 ${mode === "chat" ? "max-h-[600px]" : "max-h-[500px]"} overflow-y-auto pr-2`}>
          <AnimatePresence mode="popLayout">
            {filteredEntries.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-12 text-center"
              >
                <div className="text-6xl mb-4">
                  {mode === "diario" ? "📖" : "💬"}
                </div>
                <p className="text-purple-700 text-lg font-semibold">
                  {mode === "diario"
                    ? "Aún no hay recuerdos guardados"
                    : "Comienza una conversación..."}
                </p>
                <p className="text-purple-600">
                  {mode === "diario"
                    ? "¡Escribe algo bonito para recordar!"
                    : "¡Cuéntale algo especial!"}
                </p>
              </motion.div>
            ) : (
              filteredEntries.map((entry, idx) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ delay: idx * 0.05 }}
                  className={`rounded-2xl p-4 backdrop-blur-lg border-2 transition-all hover:shadow-lg ${
                    entry.author === "Para ti"
                      ? "bg-blue-100/40 border-blue-200 ml-auto max-w-[80%]"
                      : entry.author === "Nosotros"
                      ? "bg-purple-100/40 border-purple-200 mx-auto max-w-[85%]"
                      : "bg-pink-100/40 border-pink-200 mr-auto max-w-[80%]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      {/* AUTHOR */}
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xl">{entry.emoji}</span>
                        <span className="font-bold text-purple-700">
                          {entry.author}
                        </span>
                        <span className="text-xs text-purple-600">
                          {entry.date}
                        </span>
                      </div>

                      {/* TEXT */}
                      <p className="text-purple-800 leading-relaxed break-words">
                        {entry.text}
                      </p>
                    </div>

                    {/* ACTIONS */}
                    <div className="flex gap-1 ml-2 flex-shrink-0">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => copyText(entry.text)}
                        className="p-2 rounded-lg bg-white/40 text-purple-700 hover:bg-white/60 transition-all"
                        title="Copiar"
                      >
                        <Copy size={18} />
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => remove(entry.id)}
                        className="p-2 rounded-lg bg-red-300/40 text-red-700 hover:bg-red-300/60 transition-all"
                        title="Eliminar"
                      >
                        <Trash2 size={18} />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* STATS */}
      {filteredEntries.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 grid md:grid-cols-3 gap-4"
        >
          {[
            {
              label: "Para mí",
              count: filteredEntries.filter(e => e.author === "Para mí").length,
              emoji: "💖",
              color: "pink",
            },
            {
              label: "Para ti",
              count: filteredEntries.filter(e => e.author === "Para ti").length,
              emoji: "💕",
              color: "blue",
            },
            {
              label: "Nosotros",
              count: filteredEntries.filter(e => e.author === "Nosotros").length,
              emoji: "👥",
              color: "purple",
            },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              whileHover={{ y: -5 }}
              className={`bg-${stat.color}-100/40 backdrop-blur-lg border-2 border-${stat.color}-200 p-6 rounded-2xl text-center`}
            >
              <div className="text-3xl mb-2">{stat.emoji}</div>
              <p className={`text-${stat.color}-700 font-bold text-lg`}>
                {stat.count}
              </p>
              <p className={`text-${stat.color}-600 text-sm`}>{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  );
}