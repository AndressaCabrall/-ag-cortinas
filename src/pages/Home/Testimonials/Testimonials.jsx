import { useEffect, useRef, useState } from 'react';
import './Testimonials.css';

function Testimonials() {
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [indice, setIndice] = useState(0);
  const trackRef = useRef(null);

  useEffect(function () {
    fetch('/api/avaliacoes.php')
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        if (data.status === 'OK') {
          setAvaliacoes(data.result.reviews);
          setCarregando(false);
        } else {
          setErro('Não foi possível carregar as avaliações');
          setCarregando(false);
        }
      })
      .catch(function () {
        setErro('Erro ao conectar');
        setCarregando(false);
      });
  }, []);

  function navegar(novoIndice) {
    const track = trackRef.current;
    if (!track) return;

    const card = track.children[novoIndice];
    if (!card) return;

    track.scrollTo({ left: card.offsetLeft, behavior: 'smooth' });
    setIndice(novoIndice);
  }

  // Sincroniza o indice com o scroll (arraste no mobile)
  useEffect(function () {
    const track = trackRef.current;
    if (!track) return;

    function onScroll() {
      const card = track.children[0];
      if (!card) return;
      const cardWidth = card.offsetWidth;
      const novoIndice = Math.round(track.scrollLeft / cardWidth);
      setIndice(novoIndice);
    }

    track.addEventListener('scroll', onScroll, { passive: true });
    return function () {
      track.removeEventListener('scroll', onScroll);
    };
  }, [avaliacoes]);

  if (carregando) {
    return (
      <section className="testimonials">
        <div className="testimonials-loading">Carregando avaliações...</div>
      </section>
    );
  }

  if (erro) {
    return (
      <section className="testimonials">
        <div className="testimonials-erro">{erro}</div>
      </section>
    );
  }

  return (
    <section className="testimonials" aria-label="Avaliações — AG Cortinas e Persianas">
      <div className="testimonials-header">
        <span className="testimonials-label">Avaliações</span>
        <h2 className="testimonials-titulo">O que nossos clientes dizem</h2>
        <p className="testimonials-subtitulo">4,9 ⭐ — 61 avaliações no Google</p>
      </div>

      <div className="testimonials-carrossel">
        <div className="testimonials-track" ref={trackRef}>
          {avaliacoes.map(function (avaliacao, index) {
            return (
              <div key={index} className="testimonials-card">
                <div className="testimonials-autor">
                  <img
                    src={avaliacao.profile_photo_url}
                    alt={avaliacao.author_name}
                    className="testimonials-foto"
                    loading="lazy"
                  />
                  <div>
                    <span className="testimonials-nome">{avaliacao.author_name}</span>
                    <span className="testimonials-tempo">{avaliacao.relative_time_description}</span>
                  </div>
                </div>
                <div className="testimonials-estrelas">{'★'.repeat(avaliacao.rating)}</div>
                <p className="testimonials-texto">"{avaliacao.text}"</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="testimonials-nav">
        <button
          className="testimonials-btn"
          onClick={() => navegar(indice === 0 ? avaliacoes.length - 1 : indice - 1)}
          aria-label="Anterior"
        >
          ←
        </button>

        <div className="testimonials-dots">
          {avaliacoes.map(function (_, i) {
            return (
              <button
                key={i}
                className={`testimonials-dot${i === indice ? ' ativo' : ''}`}
                onClick={() => navegar(i)}
                aria-label={`Ir para avaliação ${i + 1}`}
              />
            );
          })}
        </div>

        <button
          className="testimonials-btn"
          onClick={() => navegar(indice === avaliacoes.length - 1 ? 0 : indice + 1)}
          aria-label="Próximo"
        >
          →
        </button>
      </div>
    </section>
  );
}

export default Testimonials;
