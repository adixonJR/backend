import { motion } from "framer-motion";
import "../CSS/homeSection.css";

type HomeSectionProps = {
  onStart: () => void;
};

export default function HomeSection({ onStart }: HomeSectionProps) {
  return (
    <div className="home-container">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        className="home-card"
      >
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="home-title"
        >
          Bienvenida a tu MiniWeb ♥
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="home-subtitle"
        >
          Explora cada sección... hay cosas lindas y divertidas , estas lista ?
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="home-buttons"
        >
          <button className="btn btn-purple" onClick={onStart}>
            
            Explorar
          </button>
          
          <button className="btn btn-pink" onClick={onStart}>
            Divertirse
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
