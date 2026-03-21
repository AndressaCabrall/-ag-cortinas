import './Testimonials.css'

const depoimentos = [
  {
    id: 1,
    nome: "José Augusto",
    texto: "Excelente padrão de qualidade, equipe altamente qualificada!",
    estrelas: 5,
    data: "Dez 2024"
  },
  {
    id: 2,
    nome: "Jéssica Rocha",
    texto: "Melhor lugar para colocar persiana! Atendimento maravilhoso e a persiana ficou exatamente do jeito que pedi.",
    estrelas: 5,
    data: "Jan 2024"
  },
  {
    id: 3,
    nome: "Elizandra E Albino",
    texto: "Um sonho realizado, ficou linda a persiana, do jeitinho que eu queria. Super indico. Atendimento show tanto da vendedora quanto do instalador.",
    estrelas: 5,
    data: "Jan 2024"
  },
  {
    id: 4,
    nome: "Karine Priester",
    texto: "A Andressa é super querida, tira todas as dúvidas e é sempre muito objetiva com o atendimento, o que facilita muito.",
    estrelas: 5,
    data: "Dez 2023"
  },
  {
    id: 5,
    nome: "Dandara Argenta",
    texto: "Trabalho excelente, Andressa sempre solicita e gentil, entregou antes do prazo, ficou linda a cortina!",
    estrelas: 5,
    data: "Nov 2023"
  },
  {
    id: 6,
    nome: "Guilherme Rovaris Daufenbach",
    texto: "Andressa foi muito atenciosa para conciliar os horários, o produto é de ótima qualidade e o resultado ficou excelente.",
    estrelas: 5,
    data: "Out 2023"
  },
]

function Testimonials() {
  return (
    <section className="testimonials" aria-label="Depoimentos de clientes — AG Cortinas">

      {/* Header */}
      <div className="testimonials-header">
        <span className="testimonials-label">Depoimentos</span>
        <h2 className="testimonials-titulo">
          O que nossos clientes dizem
        </h2>
        <p className="testimonials-subtitulo">
          4,9 ⭐ — 61 avaliações no Google
        </p>
      </div>

      {/* Grid */}
      <div className="testimonials-grid">
        {depoimentos.map(function(depoimento) {
          return (
            <div
              key={depoimento.id}
              className="testimonials-card"
              aria-label={'Depoimento de ' + depoimento.nome}
            >
              {/* Estrelas */}
              <div className="testimonials-estrelas" aria-label="5 estrelas">
                {'★'.repeat(depoimento.estrelas)}
              </div>

              {/* Texto */}
              <p className="testimonials-texto">
                "{depoimento.texto}"
              </p>

              {/* Footer do card */}
              <div className="testimonials-card-footer">
                <span className="testimonials-nome">{depoimento.nome}</span>
                <span className="testimonials-data">{depoimento.data}</span>
              </div>

            </div>
          )
        })}
      </div>

    </section>
  )
}

export default Testimonials