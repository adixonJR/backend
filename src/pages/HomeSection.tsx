import { motion } from "framer-motion";

type HomeSectionProps = {
  onStart: () => void;
};

export default function HomeSection({ onStart }: HomeSectionProps) {
  return (
    <div className="flex justify-center items-center min-h-[70vh] px-4 py-16 bg-gradient-to-br from-violet-600 via-indigo-500 to-pink-400">

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        className="w-full max-w-xl text-center p-10 rounded-3xl
        bg-white/10 backdrop-blur-md
        shadow-xl transition-all duration-300
        hover:-translate-y-1 hover:shadow-2xl"
      >

        {/* TITULO */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-4xl md:text-5xl font-extrabold text-purple-100 mb-4 leading-tight"
        >
          Bienvenida a tu MiniWeb ♥
        </motion.h1>

        {/* SUBTITULO */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-lg md:text-xl text-purple-200 mb-8"
        >
          Explora cada sección... hay cosas lindas y divertidas ¿estás lista?
        </motion.p>

        {/* BOTONES */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex justify-center gap-4 flex-wrap"
        >

          <button
            onClick={onStart}
            className="px-7 py-2 rounded-full font-semibold
            bg-violet-600 text-white
            transition-all duration-300
            hover:bg-violet-700 hover:scale-105"
          >
            Explorar
          </button>

          <button
            onClick={onStart}
            className="px-7 py-2 rounded-full font-semibold
            bg-pink-500 text-white
            transition-all duration-300
            hover:bg-pink-600 hover:scale-105"
          >
            Divertirse
          </button>

        </motion.div>
      </motion.div>
    </div>
  );
}