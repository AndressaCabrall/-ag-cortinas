import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './CookieBanner.css'

function CookieBanner() {
  const [visivel, setVisivel] = useState(false)

  useEffect(() => {
    const consentimento = localStorage.getItem('ag_cookies')
    if (!consentimento) {
      // Pequeno delay para não aparecer junto com o carregamento da página
      setTimeout(() => setVisivel(true), 1200)
    }
  }, [])

  function aceitar() {
    localStorage.setItem('ag_cookies', 'aceito')
    setVisivel(false)
  }

  function recusar() {
    localStorage.setItem('ag_cookies', 'recusado')
    setVisivel(false)
  }

  if (!visivel) return null

  return (
    <div className="cookie-banner" role="dialog" aria-label="Aviso de cookies">
      <div className="cookie-banner-content">
        <p className="cookie-banner-texto">
          Usamos cookies para melhorar sua experiência no site. Ao continuar navegando, você concorda com nossa{' '}
          <Link to="/privacidade" className="cookie-banner-link">
            Política de Privacidade
          </Link>.
        </p>
        <div className="cookie-banner-acoes">
          <button className="cookie-btn-recusar" onClick={recusar}>
            Recusar
          </button>
          <button className="cookie-btn-aceitar" onClick={aceitar}>
            Aceitar cookies
          </button>
        </div>
      </div>
    </div>
  )
}

export default CookieBanner
