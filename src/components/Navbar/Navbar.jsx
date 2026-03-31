
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import logo from '../../assets/images/icons/logo.svg';
import './Navbar.css';

gsap.registerPlugin(ScrollTrigger);

function Navbar() {
  const navbarRef = useRef(null);
  const location = useLocation();
  const [menuAberto, setMenuAberto] = useState(false);

  useEffect(() => {
    const navbar = navbarRef.current;

    // Limpa gatilhos anteriores e reseta para transparente
    ScrollTrigger.getAll().forEach(t => t.kill());
    navbar.classList.remove('dark-theme');

    // Detecta seções claras em QUALQUER página via [data-theme="light-bg"]
    const secoesClaras = document.querySelectorAll('[data-theme="light-bg"]');

    secoesClaras.forEach(secao => {
      ScrollTrigger.create({
        trigger: secao,
        start: 'top 80px',
        end: 'bottom 80px',
        onEnter:     () => navbar.classList.add('dark-theme'),
        onEnterBack: () => navbar.classList.add('dark-theme'),
        onLeave:     () => navbar.classList.remove('dark-theme'),
        onLeaveBack: () => navbar.classList.remove('dark-theme'),
      });
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, [location.pathname]);

  // Fecha menu ao trocar de rota
  useEffect(() => {
    setMenuAberto(false);
  }, [location.pathname]);

  return (
    <header className="navbar" ref={navbarRef} role="banner">
      <Link to="/" className="navbar-logo" aria-label="Ir para página inicial">
        <img src={logo} alt="AG Cortinas e Persianas — Logo" />
      </Link>

      <nav className="navbar-menu" aria-label="Menu principal">
        <ul role="list">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/projects">Projetos</Link></li>
          <li><Link to="/about">Sobre</Link></li>
          <li><Link to="/blog">Blog</Link></li>
          <li><Link to="/contact">Contato</Link></li>
        </ul>
      </nav>

      <Link to="/contact" className="navbar-cta">
        Entre em Contato
      </Link>

      <button
        className={`navbar-hamburguer ${menuAberto ? 'ativo' : ''}`}
        aria-label={menuAberto ? 'Fechar menu' : 'Abrir menu'}
        onClick={() => setMenuAberto(prev => !prev)}
      >
        <span></span><span></span><span></span>
      </button>

      <div className={`navbar-mobile ${menuAberto ? 'aberto' : ''}`}>
        <nav>
          <ul>
            <li><Link to="/" onClick={() => setMenuAberto(false)}>Home</Link></li>
            <li><Link to="/projects" onClick={() => setMenuAberto(false)}>Projetos</Link></li>
            <li><Link to="/about" onClick={() => setMenuAberto(false)}>Sobre</Link></li>
            <li><Link to="/blog" onClick={() => setMenuAberto(false)}>Blog</Link></li>
            <li><Link to="/contact" onClick={() => setMenuAberto(false)}>Contato</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
