import './Preloader.css'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import mascaraSvg from '../../../assets/images/icons/preloader-texto.svg'
import heroDesktop from '../../../assets/images/hero-footer/hero-desktop.webp'

gsap.registerPlugin(ScrollTrigger)

function Preloader(props) {

  const preloaderRef = useRef(null)
  const maskRef = useRef(null)
  const setaRef = useRef(null)

  useEffect(function() {

    const preloader = preloaderRef.current
    const mask = maskRef.current
    const seta = setaRef.current

    // Seta pulsando para chamar atenção
    gsap.to(seta, {
      y: 10,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut'
    })

    // Máscara cresce com scroll
    gsap.to(mask, {
      scale: 15,
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: '+=800',
        scrub: 1,
        pin: true,
      }
    })

    // Preloader some com scroll
    gsap.to(preloader, {
      opacity: 0,
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: '+=800',
        scrub: 1,
      }
    })

  }, [])

  const estiloMask = {
    maskImage: 'url(' + mascaraSvg + ')',
    maskSize: '90% auto',
    maskRepeat: 'no-repeat',
    maskPosition: 'center',
    WebkitMaskImage: 'url(' + mascaraSvg + ')',
    WebkitMaskSize: '90% auto',
    WebkitMaskRepeat: 'no-repeat',
    WebkitMaskPosition: 'center',
    backgroundImage: 'url(' + props.imagemFundo + ')',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }

  return (
    <div className="preloader" ref={preloaderRef}>
      <div className="mask" ref={maskRef} style={estiloMask}></div>

      {/* Seta de scroll */}
      <div className="preloader-seta" ref={setaRef}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <polyline points="19 12 12 19 5 12"></polyline>
        </svg>
        <span>scroll</span>
      </div>
    </div>
  )
}

export default Preloader