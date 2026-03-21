import { useEffect, useState } from 'react'
import './Testimonials.css'

function Testimonials() {

  const estadoAvaliacoes = useState([])
  const avaliacoes = estadoAvaliacoes[0]
  const setAvaliacoes = estadoAvaliacoes[1]

  const estadoCarregando = useState(true)
  const carregando = estadoCarregando[0]
  const setCarregando = estadoCarregando[1]

  const estadoErro = useState(null)
  const erro = estadoErro[0]
  const setErro = estadoErro[1]

  useEffect(function() {

    // Chama o arquivo PHP
    fetch('/api/avaliacoes.php')
      .then(function(response) {
        return response.json()
      })
      .then(function(data) {
        if (data.status === 'OK') {
          setAvaliacoes(data.result.reviews)
          setCarregando(false)
        } else {
          setErro('Não foi possível carregar as avaliações')
          setCarregando(false)
        }
      })
      .catch(function(err) {
        setErro('Erro ao conectar')
        setCarregando(false)
      })

  }, [])

  if (carregando) {
    return (
      <section className="testimonials">
        <div className="testimonials-loading">
          Carregando avaliações...
        </div>
      </section>
    )
  }

  if (erro) {
    return (
      <section className="testimonials">
        <div className="testimonials-erro">
          {erro}
        </div>
      </section>
    )
  }

  return (
    <section className="testimonials" aria-label="Avaliações — AG Cortinas e Persianas">

      {/* Header */}
      <div className="testimonials-header">
        <span className="testimonials-label">Avaliações</span>
        <h2 className="testimonials-titulo">
          O que nossos clientes dizem
        </h2>
        <p className="testimonials-subtitulo">
          4,9 ⭐ — 61 avaliações no Google
        </p>
      </div>

      {/* Grid */}
      <div className="testimonials-grid">
        {avaliacoes.map(function(avaliacao, index) {
          return (
            <div key={index} className="testimonials-card">

              {/* Foto e nome */}
              <div className="testimonials-autor">
                <img
                  src={avaliacao.profile_photo_url}
                  alt={avaliacao.author_name}
                  className="testimonials-foto"
                />
                <div>
                  <span className="testimonials-nome">
                    {avaliacao.author_name}
                  </span>
                  <span className="testimonials-tempo">
                    {avaliacao.relative_time_description}
                  </span>
                </div>
              </div>

              {/* Estrelas */}
              <div className="testimonials-estrelas">
                {'★'.repeat(avaliacao.rating)}
              </div>

              {/* Texto */}
              <p className="testimonials-texto">
                "{avaliacao.text}"
              </p>

            </div>
          )
        })}
      </div>

    </section>
  )
}

export default Testimonials