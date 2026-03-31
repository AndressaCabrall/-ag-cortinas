
import { useEffect, useState } from 'react'
import './Preloader.css'

function Preloader({ onComplete }) {
  const [porcentagem, setPorcentagem] = useState(0)
  const [saindo, setSaindo] = useState(false)

  useEffect(() => {
    let atual = 0

    const intervalo = setInterval(() => {
      // Velocidade variável — começa rápido, desacelera no final
      const incremento = atual < 70 ? Math.random() * 8 + 4
                       : atual < 90 ? Math.random() * 3 + 1
                       : 1

      atual = Math.min(atual + incremento, 100)
      setPorcentagem(Math.floor(atual))

      if (atual >= 100) {
        clearInterval(intervalo)
        setTimeout(() => {
          setSaindo(true)
          setTimeout(() => onComplete(), 600) // aguarda animação de saída
        }, 300)
      }
    }, 60)

    return () => clearInterval(intervalo)
  }, [onComplete])

  return (
    <div className={`preloader ${saindo ? 'saindo' : ''}`}>
      <div className="preloader-conteudo">

        <p className="preloader-marca">AG Cortinas</p>

        <div className="preloader-barra-wrapper">
          <div
            className="preloader-barra"
            style={{ width: `${porcentagem}%` }}
          />
        </div>

        <span className="preloader-numero">{porcentagem}%</span>

      </div>
    </div>
  )
}

export default Preloader
