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
  const heroRef = useRef(null) // Ref para a seção inteira
  const pictureRef = useRef(null)
  const textoRef = useRef(null)
  const destaqueRef = useRef(null)
  const cursorRef = useRef(null)
  const setaRef = useRef(null)
  const fraseAtualIndex = useRef(0)
  const primeiraFraseCompleta = useRef(false)

  useEffect(() => {
    const textoEl = textoRef.current
    const destaqueEl = destaqueRef.current
    const cursor = cursorRef.current
    const seta = setaRef.current
    const img = pictureRef.current.querySelector('img')

    let ativo = true
    
    // --- 1. CONFIGURAÇÃO INICIAL E EFEITOS FIXOS ---
    let ctx = gsap.context(() => {
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

      // --- 2. ANIMAÇÃO DE PARALLAX (O que estava faltando) ---
      // Movemos a imagem para baixo enquanto o scroll desce
      gsap.to(img, {
        yPercent: 20, // Suave deslocamento vertical
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      })

      // Faz o conteúdo (texto e seta) sumir suavemente no scroll
      gsap.to(".hero-content", {
        opacity: 0,
        y: -50,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "40% top",
          scrub: true
        }
      })
    }, heroRef)

    // --- 3. LÓGICA DE DIGITAÇÃO (Sua lógica original preservada) ---
    function mostrarSeta() {
      if (primeiraFraseCompleta.current) return
      primeiraFraseCompleta.current = true

      gsap.to(seta, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        onComplete: () => {
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
      textoEl.textContent = ''
      destaqueEl.textContent = ''

      let indexTexto = 0
      let indexDestaque = 0

      const intervalTexto = setInterval(() => {
        if (!ativo) return clearInterval(intervalTexto)
        if (indexTexto < frase.texto.length) {
          textoEl.textContent += frase.texto[indexTexto]
          indexTexto++
        } else {
          clearInterval(intervalTexto)
          const intervalDestaque = setInterval(() => {
            if (!ativo) return clearInterval(intervalDestaque)
            if (indexDestaque < frase.destaque.length) {
              destaqueEl.textContent += frase.destaque[indexDestaque]
              indexDestaque++
            } else {
              clearInterval(intervalDestaque)
              mostrarSeta()
              setTimeout(() => { if (ativo) apagarTexto() }, 2000)
            }
          }, 80)
        }
      }, 50)
    }

    function apagarTexto() {
      if (!ativo) return
      const intervalApagarDestaque = setInterval(() => {
        if (!ativo) return clearInterval(intervalApagarDestaque)
        if (destaqueEl.textContent.length > 0) {
          destaqueEl.textContent = destaqueEl.textContent.slice(0, -1)
        } else {
          clearInterval(intervalApagarDestaque)
          const intervalApagarTexto = setInterval(() => {
            if (!ativo) return clearInterval(intervalApagarTexto)
            if (textoEl.textContent.length > 0) {
              textoEl.textContent = textoEl.textContent.slice(0, -1)
            } else {
              clearInterval(intervalApagarTexto)
              fraseAtualIndex.current = (fraseAtualIndex.current + 1) % frases.length
              setTimeout(() => { if (ativo) digitarTexto() }, 500)
            }
          }, 30)
        }
      }, 40)
    }

    digitarTexto()

    // --- 4. CLEANUP (Limpeza) ---
    return () => {
      ativo = false
      ctx.revert() // Limpa todas as animações do GSAP de uma vez
    }
  }, [])

  return (
    <section className="hero" ref={heroRef} aria-label="Seção Hero">
      <div className="hero-bg">
        <picture ref={pictureRef}>
          <source media="(max-width: 600px)" srcSet={heroMobile} type="image/webp" />
          <img
            src={heroDesktop}
            alt="Cortinas e persianas sob medida"
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

        <div ref={setaRef} className="hero-seta">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
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