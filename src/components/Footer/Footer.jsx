import { Link, useLocation } from 'react-router-dom'
import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import footerMobile from '../../assets/images/hero-footer/footer-mobile.webp'
import footerDesktop from '../../assets/images/hero-footer/footer-desktop.webp'
import './Footer.css'

// Registra os plugins uma única vez no módulo (fora do componente)
gsap.registerPlugin(ScrollTrigger, useGSAP)

function Footer() {
  const footerRef = useRef(null)
  const imgRef = useRef(null)

  // Detecta mudança de rota para forçar recálculo das alturas
  const location = useLocation()

  /**
   * useGSAP — substituto oficial do useEffect para GSAP no React.
   *
   * Por que useGSAP em vez de useEffect?
   * - Internamente usa useLayoutEffect, que roda ANTES da pintura do browser.
   *   Isso garante que o ScrollTrigger calcule as alturas corretas do DOM.
   * - Cleanup automático via gsap.context(): ao trocar de rota, todos os
   *   ScrollTriggers são destruídos e recriados com as alturas corretas.
   *
   * Por que [location.pathname] na dependência?
   * - Toda vez que o React Router muda de página, o hook re-executa.
   * - O revertOnUpdate: true garante que os ScrollTriggers antigos sejam
   *   destruídos antes de criar os novos com as alturas atualizadas.
   */
  useGSAP(
    () => {
      const footer = footerRef.current
      const img = imgRef.current
      if (!footer || !img) return

      // EFEITO 1 — Footer descoberto pela página
      // immediateRender: false → não aplica yPercent:-30 antes do ScrollTrigger estar pronto
      // invalidateOnRefresh: true → recalcula posições quando ScrollTrigger.refresh() for chamado
      gsap.from(footer, {
        yPercent: -30,
        ease: 'none',
        immediateRender: false,
        scrollTrigger: {
          trigger: footer,
          start: 'top bottom',
          end: 'top top',
          scrub: true,
          invalidateOnRefresh: true,
        },
      })

      // EFEITO 2 — Parallax reverso da imagem de fundo
      gsap.fromTo(
        img,
        { yPercent: 10 },
        {
          yPercent: -10,
          ease: 'none',
          scrollTrigger: {
            trigger: footer,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      )
    },
    {
      scope: footerRef,
      dependencies: [location.pathname],
      revertOnUpdate: true,
    }
  )

  return (
    <footer
      ref={footerRef}
      className="footer"
      role="contentinfo"
      aria-label="Rodapé — AG Cortinas e Persianas"
    >

      {/* Imagem de fundo */}
      <div className="footer-bg">
        <div className="footer-overlay"></div>
        <picture>
          <source
            media="(max-width: 600px)"
            srcSet={footerMobile}
            type="image/webp"
          />
          <img
            ref={imgRef}
            src={footerDesktop}
            alt="Cortinas e persianas sob medida — AG Cortinas Joinville"
            className="footer-img"
            fetchPriority="high"
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

              <a href="https://www.instagram.com/ag.cortinasepersianas" target="_blank" rel="noopener noreferrer" aria-label="Siga a AG Cortinas no Instagram" className="footer-rede-item">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                </svg>
                <span>Instagram</span>
              </a>

              <a href="https://www.facebook.com/people/AG-Cortinas-Persianas-em-Joinville/100083065365665/" target="_blank" rel="noopener noreferrer" aria-label="Curta a AG Cortinas no Facebook" className="footer-rede-item">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
                <span>Facebook</span>
              </a>

              <a href="https://www.youtube.com/channel/UC4nU-BAEVBLhcBgUfSP7Z_w" target="_blank" rel="noopener noreferrer" aria-label="Assista aos vídeos da AG Cortinas no YouTube" className="footer-rede-item">
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

              <a href="tel:+5547984211262" className="footer-contato-item" aria-label="Ligue para a AG Cortinas">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.29 6.29l1.28-1.28a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span>(47) 98421-1262</span>
              </a>

              <a href="mailto:agcortinasepersianas@gmail.com" className="footer-contato-item" aria-label="Envie um email para a AG Cortinas">
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
