import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import logo from '../../assets/images/icons/logo.svg';
import './Navbar.css';

// Páginas que têm fundo claro do início ao fim (navbar sempre escura)
const PAGINAS_CLARAS = ['/about', '/contact', '/blog', '/projects', '/privacidade'];

// Seções com fundo claro na Home (IDs dos elementos)
// Adicione aqui os IDs das seções claras da Home conforme for criando
const SECOES_CLARAS_HOME = [
  'home-produtos',
  'home-sobre',
  'home-depoimentos',
  'home-diferenciais',
];

function Navbar() {
  const navbarRef = useRef(null);
  const location = useLocation();
  const [menuAberto, setMenuAberto] = useState(false);
  const [temaDark, setTemaDark] = useState(false);

  useEffect(() => {
    const pathname = location.pathname;

    // Página inteiramente clara → navbar escura imediatamente, sem scroll listener
    const isPaginaClara = PAGINAS_CLARAS.includes(pathname) ||
      pathname.startsWith('/blog/');

    if (isPaginaClara) {
      setTemaDark(true);
      return;
    }

    // Home e outras páginas com hero escuro → começa clara
    setTemaDark(false);

    const handleScroll = () => {
      // Footer sempre escuro (imagem) → navbar branca
      const footer = document.querySelector('.footer');
      if (footer) {
        const rect = footer.getBoundingClientRect();
        if (rect.top <= 80 && rect.bottom >= 80) {
          setTemaDark(false);
          return;
        }
      }

      // Verifica seções claras da Home por ID
      let sobreSecaoClara = false;
      SECOES_CLARAS_HOME.forEach(id => {
        const secao = document.getElementById(id);
        if (secao) {
          const rect = secao.getBoundingClientRect();
          if (rect.top <= 80 && rect.bottom >= 80) {
            sobreSecaoClara = true;
          }
        }
      });

      setTemaDark(sobreSecaoClara);
    };

    // Escuta o smooth-content (ScrollSmoother) ou window como fallback
    const smoothContent = document.getElementById('smooth-content');
    const scroller = smoothContent || window;

    scroller.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // checa posição inicial

    return () => {
      scroller.removeEventListener('scroll', handleScroll);
    };
  }, [location.pathname]);

  // Fecha menu ao trocar de rota
  useEffect(() => {
    setMenuAberto(false);
  }, [location.pathname]);

  return (
    <header
      className={`navbar ${temaDark ? 'dark-theme' : ''}`}
      ref={navbarRef}
      role="banner"
    >
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
