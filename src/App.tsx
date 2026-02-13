import { useState } from 'react';
import "./App.css";

import HomeSection from './pages/HomeSection';
import Galeria from './pages/Galeria';
import Juegos from './pages/Juegos';
import Diario from './pages/Diario';
import Sorpresas from './pages/Sorpresas';

type Page = 'home' | 'galeria' | 'juegos' | 'diario' | 'sorpresa';

const pages: Page[] = ['home', 'galeria' , 'juegos' , 'diario','sorpresa'];

export default function App() {
  const [page, setPage] = useState<Page>('home');

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">Web dedicada para Esmeralda</h1>

        <nav className="app-nav">
          {pages.map(p => (
            <NavButton
              key={p}
              active={page === p}
              onClick={() => setPage(p)}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </NavButton>
          ))}
        </nav>
      </header>

      <main className="app-main">
        {page === 'home' && <HomeSection onStart={() => setPage('juegos')} />}
        {page === 'galeria' && <Galeria />}
        {page === 'juegos' && <Juegos />}
        {page === 'diario' && <Diario />}
        {page === 'sorpresa' && <Sorpresas />}
      </main>

      <footer className="app-footer">
        Hecho con ❤️ — de tu esposo para mi amada.
      </footer>
    </div>
  );
}

function NavButton({
  children,
  onClick,
  active,
}: {
  children: React.ReactNode;
  onClick: () => void;
  active?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`nav-btn ${active ? 'active' : ''}`}
    >
      {children}
    </button>
  );
}
