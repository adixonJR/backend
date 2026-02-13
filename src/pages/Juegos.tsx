import { useState, useEffect } from 'react';
import '../CSS/Juegos.css';

/* ===== COMPONENTE PRINCIPAL ===== */
export default function Juegos() {
  const [tab, setTab] = useState<'quiz'|'ruleta'|'memoria'>('quiz');
  return (
    <section className="juegos-section">
      <h2>Juegos</h2>

      {/* TABS */}
      <div className="tabs">
        {['quiz','ruleta','memoria'].map(t => (
          <button 
            key={t} 
            className={`tab-btn ${tab===t? 'active':''}`} 
            onClick={()=>setTab(t as any)}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* CONTENIDO DEL TAB */}
      <div className="tab-content">
        {tab === 'quiz' && <Quiz />}
        {tab === 'ruleta' && <Ruleta />}
        {tab === 'memoria' && <Memoria />}
      </div>
    </section>
  );
}

/* ===== QUIZ SIMPLE ===== */
const SAMPLE_QUIZ = [
  {q:'¿Cuál es mi color favorito?', opts:['Rojo','Azul','Morado'], a:2},
  {q:'¿Dónde nos conocimos?', opts:['Plaza','Red social','Colegio'], a:1},
  {q:'¿Mi comida favorita?', opts:['Pizza','Sushi','Ceviche'], a:0}
];

function Quiz() {
  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const answer = (opt:number) => {
    if(done) return;
    if(opt === SAMPLE_QUIZ[i].a) setScore(s=>s+1);
    const next = i+1;
    if(next >= SAMPLE_QUIZ.length) setDone(true);
    else setI(next);
  };

  return (
    <div className="quiz-game">
      {!done ? (
        <>
          <h3>{SAMPLE_QUIZ[i].q}</h3>
          <div className="options">
            {SAMPLE_QUIZ[i].opts.map((o,idx)=>(
              <button key={o} onClick={()=>answer(idx)}>{o}</button>
            ))}
          </div>
        </>
      ) : (
        <div className="quiz-result">
          <h3>Terminaste</h3>
          <p>Puntaje: {score} / {SAMPLE_QUIZ.length}</p>
          <button onClick={()=>{setI(0); setScore(0); setDone(false)}}>Jugar otra vez</button>
        </div>
      )}
    </div>
  );
}

/* ===== RULETA SIMPLE ===== */
function Ruleta() {
  const items = ['Foto especial','Poema','Chocolate virtual','Un secreto','Beso virtual','Canción dedicada'];
  const [result,setResult] = useState<string|null>(null);

  const spin = () => {
    setResult(null);
    const r = Math.floor(Math.random()*items.length);
    let ticks = 0;
    const t = setInterval(()=>{
      setResult(items[(r+ticks)%items.length]);
      ticks++;
      if(ticks>10) clearInterval(t);
    },120);
  };

  return (
    <div className="ruleta-game">
      <div className="result">{result ?? 'Presiona Girar'}</div>
      <div className="ruleta-buttons">
        <button onClick={spin}>Girar</button>
        <button onClick={()=>setResult(null)}>Reset</button>
      </div>
    </div>
  );
}

/* ===== MEMORIA SIMPLE ===== */
function Memoria() {
  const pairs = ['🍕','🍕','🌸','🌸','🐶','🐶','⭐️','⭐️'];
  const [deck,setDeck] = useState(() => shuffle([...pairs]));
  const [flipped,setFlipped] = useState<number[]>([]);
  const [matched,setMatched] = useState<number[]>([]);

  useEffect(()=>{
    if(flipped.length===2){
      const [a,b] = flipped;
      if(deck[a]===deck[b]) setMatched(m=>[...m,a,b]);
      const t = setTimeout(()=>setFlipped([]),700);
      return ()=>clearTimeout(t);
    }
  },[flipped]);

  const flip = (i:number) => {
    if(flipped.includes(i)||matched.includes(i)) return;
    setFlipped(f=>[...f,i]);
  };

  const reset = () => {
    setDeck(shuffle([...pairs]));
    setFlipped([]);
    setMatched([]);
  };

  return (
    <div className="memoria-game">
      <div className="deck">
        {deck.map((c,idx)=>{
          const isFlipped = flipped.includes(idx) || matched.includes(idx);
          return (
            <button key={idx} onClick={()=>flip(idx)} className={`card ${isFlipped? 'flipped':''}`}>
              {isFlipped ? c : '❓'}
            </button>
          );
        })}
      </div>
      <div className="memoria-footer">
        <button onClick={reset}>Reiniciar</button>
        <span>Parejas encontradas: {matched.length/2}</span>
      </div>
    </div>
  );
}

function shuffle<T>(arr:T[]){
  for(let i=arr.length-1;i>0;i--){
    const j = Math.floor(Math.random()*(i+1));
    [arr[i],arr[j]] = [arr[j],arr[i]];
  }
  return arr;
}
