import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'
import foto from '../../assets/images/hero-footer/about-foto.webp'
import './About.css'

gsap.registerPlugin(ScrollTrigger)

const numeros = [
  { id: 1, valor: 100, sufixo: '+', label: 'Clientes atendidos' },
  { id: 2, valor: 61, sufixo: '', label: 'Avaliações 5 estrelas' },
  { id: 3, valor: 13, sufixo: '+', label: 'Anos de experiência' },
]

function About() {

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
    <main className="about" aria-label="Sobre a AG Cortinas e Persianas">

      {/* Hero pequeno */}

      <div className="about-hero">
        <span className="about-label">Sobre nós</span>
        <h1 className="about-titulo">
          Transformamos ambientes com elegância e sofisticação
        </h1>
      </div>

      {/* Sobre — foto + texto */}

      <div className="about-content">

        <div className="about-foto-wrapper">
          <img
            src={foto}
            alt="Andressa — fundadora da AG Cortinas e Persianas"
            className="about-foto"
          />
        </div>

        <div className="about-texto-wrapper">
          <span className="about-label">Nossa história</span>
          <h2 className="about-texto-titulo">
            Com mais de 13 anos transformando lares
          </h2>
          <p className="about-texto">
            Na AG Cortinas, transformamos ambientes com estilo e sofisticação. 
            Com mais de 13 anos de experiência, somos especialistas em soluções 
            personalizadas de cortinas e persianas que combinam elegância, 
            funcionalidade e exclusividade.
          </p>
          <p className="about-texto">
            Nossos produtos são feitos sob medida, priorizando qualidade, 
            durabilidade e o toque perfeito para cada espaço. Oferecemos uma 
            consultoria especializada para entender suas necessidades e criar 
            ambientes únicos e acolhedores.
          </p>
          <p className="about-texto">
            Cada projeto é tratado com carinho e profissionalismo, como se 
            fosse para o nosso próprio lar.
          </p>
        </div>

      </div>

      {/* Números */}

      <div className="about-numeros" aria-label="Números da AG Cortinas">

        {numeros.map(function(item, index) {
          return (
            <div key={item.id} className="about-numero-item">
              <span
                className="about-numero-valor"
                ref={function(el) { numerosRef.current[index] = el }}
              >
                0{item.sufixo}
              </span>
              <span className="about-numero-label">{item.label}</span>
            </div>
          )
        })}
      </div>

      {/* Diferenciais */}

      <div className="about-diferenciais">

        <div className="about-diferenciais-header">
          <span className="about-label">Por que nos escolher</span>
          <h2 className="about-diferenciais-titulo">
            Nosso compromisso com você
          </h2>
        </div>

        <div className="about-diferenciais-grid">

          <div className="about-diferencial-card">
            <span className="about-diferencial-icone">✦</span>
            <h3 className="about-diferencial-titulo">Qualidade</h3>
            <p className="about-diferencial-texto">
              Trabalhamos com tecidos selecionados e ferragens resistentes para um acabamento impecável e duradouro.
            </p>
          </div>

          <div className="about-diferencial-card">
            <span className="about-diferencial-icone">✦</span>
            <h3 className="about-diferencial-titulo">Atendimento</h3>
            <p className="about-diferencial-texto">
              Consultoria personalizada do início ao fim — do orçamento à instalação com cuidado e atenção aos detalhes.
            </p>
          </div>

          <div className="about-diferencial-card">
            <span className="about-diferencial-icone">✦</span>
            <h3 className="about-diferencial-titulo">Pontualidade</h3>
            <p className="about-diferencial-texto">
              Valorizamos seu tempo. Cumprimos prazos com responsabilidade e transparência em cada etapa do projeto.
            </p>
          </div>

        </div>

      </div>

      {/* CTA */}

      <div className="about-cta">
        <h2 className="about-cta-titulo">
          Pronta para transformar seu ambiente?
        </h2>
        <p className="about-cta-texto">
          Agende uma consultoria presencial e descubra como a AG Cortinas pode transformar sua casa em um refúgio de beleza e conforto.
        </p>
        <Link to="/contact" className="about-cta-btn">
          Agendar consultoria
        </Link>
      </div>

    </main>
  )
}

export default About