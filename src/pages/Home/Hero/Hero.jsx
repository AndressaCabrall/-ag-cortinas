import './Hero.css'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import heroMobile from '../../../assets/images/hero-footer/hero-mobile.webp'
import heroDesktop from '../../../assets/images/hero-footer/hero-desktop.webp'

gsap.registerPlugin(ScrollTrigger)

const frases = [
  { texto: "transformando cada", destaque: "ambiente" },
  { texto: "feitas para quem valoriza cada", destaque: "detalhe" },
  { texto: "decoração com elegância e", destaque: "sofisticação" },
]

function Hero() {

  const pictureRef = useRef(null)
  const textoRef = useRef(null)
  const destaqueRef = useRef(null)
  const cursorRef = useRef(null)
  const setaRef = useRef(null)
  const fraseAtualIndex = useRef(0)
  const primeiraFraseCompleta = useRef(false)

  useEffect(function() {

    const textoEl = textoRef.current
    const destaqueEl = destaqueRef.current
    const cursor = cursorRef.current
    const seta = setaRef.current

    let ativo = true

    // Cursor piscando
    gsap.to(cursor, {
      opacity: 0,
      duration: 0.5,
      repeat: -1,
      yoyo: true,
      ease: 'none',
    })

    // Seta começa invisível
    gsap.set(seta, { opacity: 0, y: -10 })

    function mostrarSeta() {
      if (primeiraFraseCompleta.current) return
      primeiraFraseCompleta.current = true

      gsap.to(seta, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        onComplete: function() {
          // Seta pulsando
          gsap.to(seta, {
            y: 8,
            duration: 1,
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut',
          })
        }
      })
    }

    function digitarTexto() {
      if (!ativo) return

      const frase = frases[fraseAtualIndex.current]
      const textoCompleto = frase.texto
      const destaqueCompleto = frase.destaque

      textoEl.textContent = ''
      destaqueEl.textContent = ''

      let indexTexto = 0
      let indexDestaque = 0

      const intervalTexto = setInterval(function() {
        if (!ativo) return clearInterval(intervalTexto)

        if (indexTexto < textoCompleto.length) {
          textoEl.textContent += textoCompleto[indexTexto]
          indexTexto++
        } else {
          clearInterval(intervalTexto)

          const intervalDestaque = setInterval(function() {
            if (!ativo) return clearInterval(intervalDestaque)

            if (indexDestaque < destaqueCompleto.length) {
              destaqueEl.textContent += destaqueCompleto[indexDestaque]
              indexDestaque++
            } else {
              clearInterval(intervalDestaque)

              // Mostra a seta depois da primeira frase completa
              mostrarSeta()

              setTimeout(function() {
                if (ativo) apagarTexto(textoEl, destaqueEl)
              }, 2000)
            }
          }, 80)
        }
      }, 50)
    }

    function apagarTexto(textoEl, destaqueEl) {
      if (!ativo) return

      const intervalApagarDestaque = setInterval(function() {
        if (!ativo) return clearInterval(intervalApagarDestaque)

        if (destaqueEl.textContent.length > 0) {
          destaqueEl.textContent = destaqueEl.textContent.slice(0, -1)
        } else {
          clearInterval(intervalApagarDestaque)

          const intervalApagarTexto = setInterval(function() {
            if (!ativo) return clearInterval(intervalApagarTexto)

            if (textoEl.textContent.length > 0) {
              textoEl.textContent = textoEl.textContent.slice(0, -1)
            } else {
              clearInterval(intervalApagarTexto)
              fraseAtualIndex.current = (fraseAtualIndex.current + 1) % frases.length

              setTimeout(function() {
                if (ativo) digitarTexto()
              }, 500)
            }
          }, 30)
        }
      }, 40)
    }

    digitarTexto()

    return function() {
      ativo = false
    }

  }, [])

  return (
    <section className="hero" aria-label="Seção Hero — AG Cortinas e Persianas">

      <div className="hero-bg">
        <picture ref={pictureRef}>
          <source
            media="(max-width: 600px)"
            srcSet={heroMobile}
            type="image/webp"
          />
          <img
            src={heroDesktop}
            alt="Cortinas e persianas sob medida — AG Cortinas & Persianas"
            className="hero-img"
          />
        </picture>
      </div>

      <div className="hero-content">

        <h1 className="hero-title">
          <span className="hero-title-fixo">Cortinas sob medida </span>
          <br />
          <span ref={textoRef}></span>
          {' '}
          <span ref={destaqueRef} className="hero-title-destaque"></span>
          <span ref={cursorRef} className="hero-cursor">|</span>
        </h1>

        {/* Seta de scroll */}
        <div ref={setaRef} className="hero-seta">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <polyline points="19 12 12 19 5 12"></polyline>
          </svg>
          <span>scroll</span>
        </div>

      </div>

    </section>
  )
}

export default Hero