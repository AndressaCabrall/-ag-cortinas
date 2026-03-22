import { Link } from 'react-router-dom'
import './ProjectsPreview.css'

const projetosPreview = [
  {
    id: 1,
    imagem: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    categoria: 'Cortinas',
    titulo: 'Sala de estar elegante',
    tamanho: 'grande'
  },
  {
    id: 2,
    imagem: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
    categoria: 'Persianas',
    titulo: 'Quarto moderno',
    tamanho: 'pequeno'
  },
  {
    id: 3,
    imagem: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
    categoria: 'Cortinas',
    titulo: 'Home office sofisticado',
    tamanho: 'pequeno'
  },
  {
    id: 4,
    imagem: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=800&q=80',
    categoria: 'Cortinas',
    titulo: 'Sala de jantar',
    tamanho: 'grande'
  },
  {
    id: 5,
    imagem: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800&q=80',
    categoria: 'Persianas',
    titulo: 'Varanda gourmet',
    tamanho: 'pequeno'
  },
  {
    id: 6,
    imagem: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800&q=80',
    categoria: 'Persianas',
    titulo: 'Varanda gourmet',
    tamanho: 'pequeno'
  },
  {
    id: 7,
    imagem: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
    categoria: 'Persianas',
    titulo: 'Quarto moderno',
    tamanho: 'pequeno'
  },
]

function ProjectsPreview() {
  return (
    <section className="projects-preview" aria-label="Projetos — AG Cortinas e Persianas">

      {/* Header */}
      <div className="projects-preview-header">
        <span className="projects-preview-label">Projetos</span>
        <h2 className="projects-preview-titulo">
          Ambientes transformados com elegância
        </h2>
        <Link to="/projects" className="projects-preview-ver-todos">
          Ver todos os projetos →
        </Link>
      </div>

      {/* Grid Masonry */}
      <div className="projects-preview-grid">
        {projetosPreview.map(function(projeto) {
          return (
            <Link
              to="/projects"
              key={projeto.id}
              className={'projects-preview-item projects-preview-item--' + projeto.tamanho}
              aria-label={projeto.titulo}
            >
              <img
                src={projeto.imagem}
                alt={projeto.titulo + ' — AG Cortinas e Persianas'}
                className="projects-preview-img"
              />
              <div className="projects-preview-overlay">
                <span className="projects-preview-categoria">
                  {projeto.categoria}
                </span>
                <h3 className="projects-preview-item-titulo">
                  {projeto.titulo}
                </h3>
              </div>
            </Link>
          )
        })}
      </div>

    </section>
  )
}

export default ProjectsPreview