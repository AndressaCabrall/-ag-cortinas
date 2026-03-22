import './Projects.css'

const projetos = [
  {
    id: 1,
    imagem: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    categoria: 'Cortinas',
    titulo: 'Sala de estar elegante',
    descricao: 'Cortina sob medida em linho natural com trilho duplo embutido.'
  },
  {
    id: 2,
    imagem: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
    categoria: 'Persianas',
    titulo: 'Quarto moderno',
    descricao: 'Persiana rolo blackout com controle total de luminosidade.'
  },
  {
    id: 3,
    imagem: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
    categoria: 'Cortinas',
    titulo: 'Home office sofisticado',
    descricao: 'Cortina screen que permite trabalhar sem reflexo na tela.'
  },
  {
    id: 4,
    imagem: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
    categoria: 'Persianas',
    titulo: 'Escritório corporativo',
    descricao: 'Persiana vertical com controle de privacidade e luminosidade.'
  },
  {
    id: 5,
    imagem: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=800&q=80',
    categoria: 'Cortinas',
    titulo: 'Quarto infantil',
    descricao: 'Cortina blackout com voal — escuridão total para o sono das crianças.'
  },
  {
    id: 6,
    imagem: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=800&q=80',
    categoria: 'Cortinas',
    titulo: 'Sala de jantar',
    descricao: 'Cortina de veludo sob medida com acabamento em ilhós dourados.'
  },
  {
    id: 7,
    imagem: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800&q=80',
    categoria: 'Persianas',
    titulo: 'Varanda gourmet',
    descricao: 'Persiana de enrolar em PVC — resistente à umidade e ao sol.'
  },
  {
    id: 8,
    imagem: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80',
    categoria: 'Cortinas',
    titulo: 'Suite master',
    descricao: 'Cortina dupla — voal e blackout — em trilho embutido no gesso.'
  },
  {
    id: 9,
    imagem: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80',
    categoria: 'Toldos',
    titulo: 'Área externa',
    descricao: 'Toldo retrátil com acionamento manual para área gourmet.'
  },
  {
    id: 10,
    imagem: 'https://images.unsplash.com/photo-1615873968403-89e068629265?w=800&q=80',
    categoria: 'Persianas',
    titulo: 'Sala moderna',
    descricao: 'Persiana double vision — controle de luz com muito estilo.'
  },
]


function Projects() {

  return (
    <main className="projects" aria-label="Projetos — AG Cortinas e Persianas">

      {/* Header */}

      <div className="projects-header">
        <span className="projects-label">Projetos</span>
        <h1 className="projects-titulo">
          Ambientes transformados com elegância
        </h1>
        <p className="projects-subtitulo">
          Cada projeto é único — feito sob medida para o seu espaço.
        </p>
      </div>

      {/* Grid 2 colunas */}
      <div className="projects-grid">
        {projetos.map(function(projeto) {
          return (
            <div
              key={projeto.id}
              className="projects-item"
              aria-label={projeto.titulo}
            >
              <img
                src={projeto.imagem}
                alt={projeto.titulo + ' — AG Cortinas e Persianas'}
                className="projects-img"
              />
              <div className="projects-overlay">
                <span className="projects-categoria">{projeto.categoria}</span>
                <h2 className="projects-item-titulo">{projeto.titulo}</h2>
                <p className="projects-descricao">{projeto.descricao}</p>
              </div>
            </div>
          )
        })}
      </div>

    </main>
  )
}

export default Projects