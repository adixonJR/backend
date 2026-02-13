import { useEffect, useState } from 'react';
import '../CSS/Galeria.css';

import love from '../assets/love.jpg';
import love1 from '../assets/love1.jpg';
import love2 from '../assets/love2.jpg';
import love3 from '../assets/love3.jpg';

const imgs = [love, love1, love2, love3];

export default function Galeria() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIdx(i => (i + 1) % imgs.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="galeria-section">
      <h2>Galería</h2>

      <div className="galeria-grid">
        <div className="galeria-main">
          <img src={imgs[idx]} alt="Imagen principal" />
        </div>

        <div className="galeria-thumbs">
          {imgs.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`thumb-${i}`}
              onClick={() => setIdx(i)}
              className={i === idx ? 'active' : ''}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
