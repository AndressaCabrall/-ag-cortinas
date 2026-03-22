import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'
import footerMobile from '../../assets/images/hero-footer/footer-mobile.webp'
import footerDesktop from '../../assets/images/hero-footer/footer-desktop.webp'
import './Footer.css'

gsap.registerPlugin(ScrollTrigger)

function Footer() {

  const footerRef = useRef(null)

  useEffect(() => {

    const footer = footerRef.current

    const animation = gsap.from(footer, {
      yPercent: -30,
      scrollTrigger: {
        trigger: footer,
        scrub: true,
        end: '100% 100%',
      }
    })

    // IMPORTANTE (evita bugs de memória)
    return () => {
      animation.scrollTrigger?.kill()
      animation.kill()
    }

  }, [])

  return (
    <footer
      className="footer"
      ref={footerRef}
      role="contentinfo"
      aria-label="Rodapé — AG Cortinas e Persianas"
    >

      {/* Imagem de fundo */}

      <div className="footer-bg">
        <picture data-speed="0.6">
          <source
            media="(max-width: 600px)"
            srcSet={footerMobile}
            type="image/webp"
          />
          <img
            src={footerDesktop}
            alt="Cortinas e persianas sob medida — AG Cortinas Joinville"
            className="footer-img"
          />
        </picture>
      </div>

      <div className="footer-content">

        <div className="footer-topo">
          <h2 className="footer-titulo">
            Cortinas & Persianas sob medida
          </h2>
        </div>

        <hr className="footer-linha" />

        <div className="footer-bottom">

          {/* Redes Sociais */}

          <div className="footer-redes-wrapper">
            <h3 className="footer-label">Redes Sociais</h3>

            <div className="footer-redes" aria-label="Redes sociais">

              {/*Instagram */}
              <a
                href="https://www.instagram.com/ag.cortinasepersianas"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Siga a AG Cortinas no Instagram"
                className="footer-rede-item"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                </svg>
                <span>Instagram</span>
              </a>

              {/* Facebook */}
              <a
                href="https://www.facebook.com/people/AG-Cortinas-Persianas-em-Joinville/100083065365665/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Curta a AG Cortinas no Facebook"
                className="footer-rede-item"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
                <span>Facebook</span>
              </a>

              {/* You Tube */}

              <a
                href="https://www.youtube.com/channel/UC4nU-BAEVBLhcBgUfSP7Z_w"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Assista aos vídeos da AG Cortinas no YouTube"
                className="footer-rede-item"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58a2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
                  <polygon points="9.75 15.02 15.5 12 9.75 8.98" fill="currentColor" />
                </svg>
                <span>YouTube</span>
              </a>

            </div>
          </div>

          {/* Contato */}

          <div className="footer-contato-wrapper">

            <h3 className="footer-label">Contato</h3>

            <div className="footer-contato">

              {/* Telefone */}
              <a
                href="tel:+5547984211262"
                className="footer-contato-item"
                aria-label="Ligue para a AG Cortinas"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.29 6.29l1.28-1.28a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span>(47) 98421-1262</span>
              </a>

              {/* Email */}

              <a
                href="mailto:agcortinasepersianas@gmail.com"
                className="footer-contato-item"
                aria-label="Envie um email para a AG Cortinas"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <span>agcortinasepersianas@gmail.com</span>
              </a>

            </div>
          </div>

          {/* Institucional */}

          <div className="footer-institucional">
            <h3 className="footer-label">Institucional</h3>
            <nav>
              <ul>
                <li><Link to="/about">Sobre Nós</Link></li>
                <li><Link to="/projects">Projetos</Link></li>
                <li><Link to="/blog">Blog</Link></li>
                <li><Link to="/contact">Contato</Link></li>
                <li><Link to="/privacidade">Política de Privacidade</Link></li>
              </ul>
            </nav>
          </div>

        </div>

        <p className="footer-copy">
          © 2026 AG Cortinas & Persianas — Todos os direitos reservados
        </p>

      </div>

    </footer>
  )
}

export default Footer