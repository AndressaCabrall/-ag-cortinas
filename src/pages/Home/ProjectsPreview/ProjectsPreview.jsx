import { Link } from 'react-router-dom'
import './ProjectsPreview.css'

import cortinaPregaMacho from '../../assets/images/projects-preview/cortinaPregaMacho.webp'
import salaEstar from '../../assets/images/projects-preview/salaEstar.webp'
import persianaRolo from '../../assets/images/projects-preview/persiana-rolo.webp'
import cortinaWave from '../../assets/images/projects-preview/cortinaWave.webp'
import cortinaPregas from '../../assets/images/projects-preview/cortina-pregas.webp'
import persianaBlackout from '../../assets/images/projects-preview/persiana-blackout.webp'
import persianaDoubleVision from '../../assets/images/projects-preview/persiana-doubleVision.webp'

const projetosPreview = [
  {
    id: 1,
    imagem: cortinaPregaMacho,
    categoria: 'Cortina Prega Macho',
    titulo: 'Quarto Casal Moderno',
    tamanho: 'grande'
  },
  {
    id: 2,
    imagem: salaEstar,
    categoria: 'Cortinas Motorizadas',
    titulo: 'Sala de Estar',
    tamanho: 'pequeno'
  },
  {
    id: 3,
    imagem: persianaRolo,
    categoria: 'Persianas Rolo',
    titulo: 'Cozinha gourmet',
    tamanho: 'pequeno'
  },
  {
    id: 4,
    imagem: cortinaWave,
    categoria: 'Cortinas Pé Direito Duplo',
    titulo: 'Sala de Estar',
    tamanho: 'grande'
  },
  {
    id: 5,
    imagem: cortinaPregas,
    categoria: 'Cortina Prega Americana',
    titulo: 'Sala de Estar aconchegante',
    tamanho: 'pequeno'
  },
  {
    id: 6,
    imagem: persianaBlackout,
    categoria: 'Persiana Rolo Blackout',
    titulo: 'Quarto',
    tamanho: 'pequeno'
  },
  {
    id: 7,
    imagem: persianaDoubleVision,
    categoria: 'Persiana Rolo Double Vision',
    titulo: 'Ambientes Sofisticados',
    tamanho: 'pequeno'
  },
]

function ProjectsPreview() {
  return (
    <section className="projects-preview" aria-label="Projetos — AG Cortinas e Persianas">

      <div className="projects-preview-header">
        <span className="projects-preview-label">Projetos</span>
        <h2 className="projects-preview-titulo">
          Elegância sob medida para cada espaço
        </h2>
        <Link to="/projects" className="projects-preview-ver-todos">
          Ver todos os projetos →
        </Link>
      </div>

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
