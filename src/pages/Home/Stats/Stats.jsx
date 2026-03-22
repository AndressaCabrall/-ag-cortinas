import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'
import './Stats.css'

gsap.registerPlugin(ScrollTrigger)

const numeros = [
  { id: 1, valor: 100, sufixo: '+', label: 'Clientes atendidos' },
  { id: 2, valor: 61, sufixo: '', label: 'Avaliações 5 estrelas' },
  { id: 3, valor: 13, sufixo: '+', label: 'Anos de experiência' },
]

function Stats() {

  const numerosRef = useRef([])

  useEffect(function() {

    numerosRef.current.forEach(function(el, index) {
      const valor = numeros[index].valor

      gsap.fromTo(
        el,
        { innerText: 0 },
        {
          innerText: valor,
          duration: 2,
          ease: 'power2.out',
          snap: { innerText: 1 },
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
          },
          onUpdate: function() {
            el.innerText = Math.ceil(el.innerText) + numeros[index].sufixo
          }
        }
      )
    })

  }, [])

  return (
    <section className="stats" aria-label="Números da AG Cortinas e Persianas">

      <div className="stats-content">

        {/* Números */}
        <div className="stats-grid">
          {numeros.map(function(item, index) {
            return (
              <div key={item.id} className="stats-item">
                <span
                  className="stats-valor"
                  ref={function(el) { numerosRef.current[index] = el }}
                >
                  0{item.sufixo}
                </span>
                <span className="stats-label">{item.label}</span>
              </div>
            )
          })}
        </div>

        {/* Texto + CTA */}
        <div className="stats-texto">
          <h2 className="stats-titulo">
            Transformando ambientes com elegância há mais de 13 anos
          </h2>
          <p className="stats-subtitulo">
            Cada projeto é tratado com carinho e profissionalismo — como se fosse para o nosso próprio lar.
          </p>
          <Link to="/about" className="stats-btn">
            Conheça nossa história →
          </Link>
        </div>

      </div>

    </section>
  )
}

export default Stats