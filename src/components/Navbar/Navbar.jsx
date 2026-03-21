import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import logo from '../../assets/images/icons/logo.svg'
import './Navbar.css'

function Navbar() {

  const navbarRef = useRef(null)
  const location = useLocation()

  const estadoDoMenu = useState(false)
  const menuAberto = estadoDoMenu[0]
  const setMenuAberto = estadoDoMenu[1]

  useEffect(function() {
    const navbar = navbarRef.current

    // Páginas com fundo claro — navbar escura
    const paginasClaras = ['/contact', '/about', '/blog', '/projects']

    if (paginasClaras.includes(location.pathname)) {
      navbar.classList.add('clara')
    } else {
      navbar.classList.remove('clara')
    }

  }, [location]) // roda toda vez que a rota muda

  function alternarMenu() {
    if (menuAberto === true) {
      setMenuAberto(false)
    } else {
      setMenuAberto(true)
    }
  }

  function fecharMenu() {
    setMenuAberto(false)
  }

  function labelDoHamburguer() {
    if (menuAberto === true) {
      return 'Fechar menu'
    } else {
      return 'Abrir menu'
    }
  }

  function classeDoHamburguer() {
    if (menuAberto === true) {
      return 'navbar-hamburguer ativo'
    } else {
      return 'navbar-hamburguer'
    }
  }

  function classeDoMenuMobile() {
    if (menuAberto === true) {
      return 'navbar-mobile aberto'
    } else {
      return 'navbar-mobile'
    }
  }

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

      <Link
        to="/contact"
        className="navbar-cta"
        aria-label="Entre em contato com a AG Cortinas e Persianas"
      >
        Entre em Contato
      </Link>

      <button
        className={classeDoHamburguer()}
        aria-label={labelDoHamburguer()}
        aria-expanded={menuAberto}
        onClick={alternarMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div
        className={classeDoMenuMobile()}
        aria-hidden={menuAberto === false}
      >
        <nav aria-label="Menu mobile">
          <ul role="list">
            <li><Link to="/" onClick={fecharMenu}>Home</Link></li>
            <li><Link to="/projects" onClick={fecharMenu}>Projetos</Link></li>
            <li><Link to="/about" onClick={fecharMenu}>Sobre</Link></li>
            <li><Link to="/blog" onClick={fecharMenu}>Blog</Link></li>
            <li><Link to="/contact" onClick={fecharMenu}>Contato</Link></li>
          </ul>
        </nav>
      </div>

    </header>
  )
}

export default Navbar