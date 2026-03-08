import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Maximize2, Heart, Play, Pause, Plus, Trash2, RotateCcw } from "lucide-react";

import love from "../assets/love.jpg";
import love1 from "../assets/love1.jpg";
import love2 from "../assets/love2.jpg";
import love3 from "../assets/love3.jpg";

const defaultImgs = [love, love1, love2, love3];
const STORAGE_KEY = "galeria_custom_images";
const STORAGE_LIKES_KEY = "galeria_liked_images";

export default function Galeria() {
  const [imgs, setImgs] = useState<string[]>(defaultImgs);
  const [idx, setIdx] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [likedImages, setLikedImages] = useState<number[]>([]);
  const [direction, setDirection] = useState(0);
  const [inputUrl, setInputUrl] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  // Cargar imágenes guardadas al montar
  useEffect(() => {
    const savedImages = localStorage.getItem(STORAGE_KEY);
    const savedLikes = localStorage.getItem(STORAGE_LIKES_KEY);
    
    if (savedImages) {
      try {
        const customImages = JSON.parse(savedImages);
        setImgs([...defaultImgs, ...customImages]);
      } catch (error) {
        console.error("Error loading saved images:", error);
      }
    }

    if (savedLikes) {
      try {
        const likes = JSON.parse(savedLikes);
        setLikedImages(likes);
      } catch (error) {
        console.error("Error loading saved likes:", error);
      }
    }
  }, []);

  // Autoplay efecto
  useEffect(() => {
    if (!isAutoPlay || isFullscreen) return;

    const timer = setInterval(() => {
      setIdx((i) => (i + 1) % imgs.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [isAutoPlay, isFullscreen, imgs.length]);

  const handlePrev = () => {
    setDirection(-1);
    setIdx((i) => (i - 1 + imgs.length) % imgs.length);
  };

  const handleNext = () => {
    setDirection(1);
    setIdx((i) => (i + 1) % imgs.length);
  };

  const toggleLike = (imgIdx: number) => {
    setLikedImages((prev) => {
      const updated = prev.includes(imgIdx)
        ? prev.filter((i) => i !== imgIdx)
        : [...prev, imgIdx];
      localStorage.setItem(STORAGE_LIKES_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const addImage = () => {
    if (inputUrl.trim()) {
      const customImages = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      const updatedCustomImages = [...customImages, inputUrl];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCustomImages));
      
      setImgs([...defaultImgs, ...updatedCustomImages]);
      setInputUrl("");
      setShowAddModal(false);
    }
  };

  const deleteImage = (imgIdx: number) => {
    const newImgs = imgs.filter((_, i) => i !== imgIdx);
    setImgs(newImgs);
    
    // Si la imagen eliminada es una personalizada, guardar cambios
    if (imgIdx >= defaultImgs.length) {
      const customImages = newImgs.slice(defaultImgs.length);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(customImages));
    }

    if (idx >= newImgs.length) {
      setIdx(Math.max(0, newImgs.length - 1));
    }
    
    setLikedImages(likedImages.filter(i => i !== imgIdx).map(i => i > imgIdx ? i - 1 : i));
  };

  const resetGallery = () => {
    if (confirm("¿Estás segura de que deseas eliminar todas las imágenes personalizadas?")) {
      localStorage.removeItem(STORAGE_KEY);
      setImgs(defaultImgs);
      setIdx(0);
      setLikedImages([]);
      localStorage.removeItem(STORAGE_LIKES_KEY);
    }
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      zIndex: 0,
      x: dir < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const customImagesCount = imgs.length - defaultImgs.length;

  return (
    <>
      {/* FULLSCREEN MODE */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/98 flex flex-col items-center justify-center"
          >
            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="absolute top-6 right-6 text-white bg-white/20 p-3 rounded-full hover:bg-white/30 transition-all z-10"
              onClick={() => setIsFullscreen(false)}
            >
              <X size={32} />
            </motion.button>

            {/* Fullscreen Container */}
            <div className="flex items-center gap-8 w-full max-w-6xl justify-center px-4 h-screen">
              {/* Previous Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePrev}
                className="text-white bg-white/20 p-4 rounded-full hover:bg-white/30 transition-all hidden md:block"
              >
                <ChevronLeft size={48} />
              </motion.button>

              {/* Image Container */}
              <div className="relative flex-1 flex items-center justify-center">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.img
                    key={idx}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.5, type: "spring", stiffness: 300, damping: 30 }}
                    src={imgs[idx]}
                    className="max-h-[85vh] max-w-[90vw] rounded-2xl shadow-2xl object-contain"
                  />
                </AnimatePresence>

                {/* Counter */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-4 right-4 text-white text-sm bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full font-semibold border border-white/20"
                >
                  {idx + 1} / {imgs.length}
                </motion.div>
              </div>

              {/* Next Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNext}
                className="text-white bg-white/20 p-4 rounded-full hover:bg-white/30 transition-all hidden md:block"
              >
                <ChevronRight size={48} />
              </motion.button>
            </div>

            {/* Mobile Controls */}
            <div className="md:hidden flex gap-4 absolute bottom-6">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePrev}
                className="text-white bg-white/20 p-3 rounded-full"
              >
                <ChevronLeft size={24} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNext}
                className="text-white bg-white/20 p-3 rounded-full"
              >
                <ChevronRight size={24} />
              </motion.button>
            </div>

            {/* Dots Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-20 md:bottom-8 flex gap-2"
            >
              {imgs.map((_, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.2 }}
                  onClick={() => setIdx(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === idx ? "bg-white w-6" : "bg-white/40 w-2"
                  }`}
                />
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ADD IMAGE MODAL */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm flex items-end md:items-center justify-center"
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white/95 backdrop-blur-lg rounded-t-3xl md:rounded-3xl p-6 max-w-md w-full md:w-auto"
            >
              <h3 className="text-2xl font-bold text-purple-700 mb-2">Agregar Imagen</h3>
              <p className="text-purple-600 text-sm mb-4">Se guardará automáticamente en tu galería</p>
              
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Pega la URL de la imagen..."
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addImage()}
                  className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 focus:border-pink-400 outline-none text-purple-700 placeholder-purple-400"
                  autoFocus
                />
                
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={addImage}
                    disabled={!inputUrl.trim()}
                    className="flex-1 bg-gradient-to-r from-pink-400 to-purple-400 text-white font-bold py-3 rounded-xl hover:shadow-lg transition-all disabled:opacity-50"
                  >
                    Guardar
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 bg-purple-200 text-purple-700 font-bold py-3 rounded-xl hover:bg-purple-300 transition-all"
                  >
                    Cerrar
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN GALLERY */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="py-8 px-4 md:py-12 md:px-6"
      >
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center max-w-6xl mx-auto mb-8 gap-4"
        >
          <div>
            <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Galería
            </h2>
            <p className="text-purple-700 text-sm md:text-lg">
              Nuestros mejores momentos 📸
            </p>
          </div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-r from-pink-400 to-purple-400 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 font-bold"
          >
            <Heart size={20} fill="currentColor" />
            <span>{likedImages.length}</span>
          </motion.div>
        </motion.div>

        {/* MAIN IMAGE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-6xl mx-auto"
        >
          {/* Image Display */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl mb-8 group">
            <div className="aspect-video md:aspect-auto md:h-[500px] relative overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.img
                  key={idx}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.5, type: "spring", stiffness: 300, damping: 30 }}
                  src={imgs[idx]}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>

              {/* Overlay Controls */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-4 group-hover:opacity-100">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePrev}
                  className="bg-white/20 backdrop-blur-md p-4 rounded-full text-white hover:bg-white/30"
                >
                  <ChevronLeft size={32} />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNext}
                  className="bg-white/20 backdrop-blur-md p-4 rounded-full text-white hover:bg-white/30"
                >
                  <ChevronRight size={32} />
                </motion.button>
              </div>

              {/* Top Controls */}
              <div className="absolute top-6 right-6 flex gap-3 z-10">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => toggleLike(idx)}
                  className={`p-4 rounded-full backdrop-blur-md transition-all ${
                    likedImages.includes(idx)
                      ? "bg-pink-500 text-white"
                      : "bg-white/20 text-white hover:bg-white/30"
                  }`}
                >
                  <Heart
                    size={24}
                    fill={likedImages.includes(idx) ? "currentColor" : "none"}
                  />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => deleteImage(idx)}
                  className="p-4 bg-white/20 rounded-full text-white hover:bg-red-500/50 backdrop-blur-md transition-all"
                >
                  <Trash2 size={24} />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsFullscreen(true)}
                  className="p-4 bg-white/20 rounded-full text-white hover:bg-white/30 backdrop-blur-md transition-all"
                >
                  <Maximize2 size={24} />
                </motion.button>
              </div>

              {/* Bottom Info */}
              <div className="absolute bottom-6 left-6 bg-black/40 text-white px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-md">
                Foto {idx + 1} de {imgs.length}
              </div>
            </div>
          </div>

          {/* Controls Grid */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePrev}
              className="bg-purple-200 text-purple-700 font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-purple-300 transition-all"
            >
              <ChevronLeft size={20} /> Anterior
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsAutoPlay(!isAutoPlay)}
              className={`font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all ${
                isAutoPlay
                  ? "bg-purple-400 text-white shadow-lg"
                  : "bg-white/40 text-purple-700 border-2 border-purple-300"
              }`}
            >
              {isAutoPlay ? (
                <>
                  <Pause size={20} />
                  Pausar
                </>
              ) : (
                <>
                  <Play size={20} />
                  Reproducir
                </>
              )}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNext}
              className="bg-purple-200 text-purple-700 font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-purple-300 transition-all"
            >
              Siguiente <ChevronRight size={20} />
            </motion.button>
          </div>

          {/* Add & Reset Buttons */}
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAddModal(true)}
              className="w-full bg-gradient-to-r from-pink-400 to-purple-400 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all"
            >
              <Plus size={20} />
              Agregar Imagen
            </motion.button>

            {customImagesCount > 0 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetGallery}
                className="w-full bg-red-300 text-red-700 font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-red-400 transition-all"
              >
                <RotateCcw size={20} />
                Limpiar Personalizadas
              </motion.button>
            )}
          </div>

          {/* Thumbnails */}
          <div className="mb-8">
            <p className="text-purple-700 font-semibold mb-4">Galería ({imgs.length} fotos)</p>
            <div className="flex gap-3 overflow-x-auto pb-4">
              {imgs.map((img, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.08, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIdx(i)}
                  className={`relative cursor-pointer flex-shrink-0 rounded-2xl overflow-hidden shadow-lg transition-all ${
                    i === idx ? "ring-4 ring-pink-400 scale-105" : "ring-2 ring-purple-200"
                  }`}
                >
                  <img
                    src={img}
                    className="h-28 w-40 object-cover hover:brightness-110 transition-all"
                    alt={`Foto ${i + 1}`}
                  />

                  {likedImages.includes(i) && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-2 right-2 bg-pink-500 text-white p-2 rounded-full"
                    >
                      <Heart size={14} fill="currentColor" />
                    </motion.div>
                  )}

                  {i >= defaultImgs.length && (
                    <div className="absolute top-2 left-2 bg-purple-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      ✓
                    </div>
                  )}

                  <div className="absolute bottom-1 right-1 bg-black/50 text-white text-xs font-bold px-2 py-1 rounded">
                    {i + 1}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white/40 backdrop-blur-lg border-2 border-purple-200 p-6 rounded-2xl grid md:grid-cols-3 gap-6"
          >
            <div className="text-center">
              <p className="text-purple-600 text-sm font-semibold mb-2">Total de fotos</p>
              <p className="text-3xl font-bold text-purple-700">{imgs.length}</p>
            </div>
            <div className="text-center">
              <p className="text-purple-600 text-sm font-semibold mb-2">Favoritas</p>
              <p className="text-3xl font-bold text-pink-600">{likedImages.length}</p>
            </div>
            <div className="text-center">
              <p className="text-purple-600 text-sm font-semibold mb-2">Personalizadas</p>
              <p className="text-3xl font-bold text-purple-500">{customImagesCount}</p>
            </div>
          </motion.div>
        </motion.div>
      </motion.section>
    </>
  );
}