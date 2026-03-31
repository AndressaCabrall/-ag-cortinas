
import './Projects.css'
import { useSEO } from '../../hooks/useSEO'

import cortinaPedireito from '../../assets/images/projects/cortina-pedireito.webp'
import cortinaWave from '../../assets/images/projects/cortina-wave.webp'
import cortinaPregaMacho from '../../assets/images/projects/cortina-pregaMacho.webp'
import cortinaScreen from '../../assets/images/projects/cortina-screen.webp'
import persianaDoublevision from '../../assets/images/projects/persiana-doublevision.webp'
import persianaVertical from '../../assets/images/projects/persiana-vertical.webp'
import cortinaDeSala from '../../assets/images/projects/cortinadesala.webp'
import motorizada from '../../assets/images/projects/motorizada.webp'
import toldo from '../../assets/images/projects/toldo.webp'
import ph50mm from '../../assets/images/projects/ph50mm.webp'

const projetos = [
  {
    id: 1,
    imagem: cortinaPedireito,
    categoria: 'Cortinas Wave com Pé direito duplo',
    titulo: 'Sala de estar elegante',
    descricao: 'Cortina sob medida em linho natural com trilho duplo embutido.'
  },
  {
    id: 2,
    imagem: cortinaWave,
    categoria: 'Cortina Voal Liso',
    titulo: 'Escritório Decorado',
    descricao: 'Cortina voal liso no trilho, ambiente decorado e estiloso.'
  },
  {
    id: 3,
    imagem: cortinaPregaMacho,
    categoria: 'Cortina para trilho curvo',
    titulo: 'Sala de Estar sofisticada',
    descricao: 'Cortina Prega Macho em Linho forrada com microfibra para trilho curvo.'
  },
  {
    id: 4,
    imagem: cortinaScreen,
    categoria: 'Persianas Rolo tela solar',
    titulo: 'Sacada',
    descricao: 'Persiana Rolo em tela solar 3% com controle de privacidade e luminosidade.'
  },
  {
    id: 5,
    imagem: persianaDoublevision,
    categoria: 'Cortinas Double Vision',
    titulo: 'Sala de Estar Moderna',
    descricao: 'Cortina Double Vision — Sofisticação e funcionalidade em um só produto.'
  },
  {
    id: 6,
    imagem: persianaVertical,
    categoria: 'Persianas Verticais Blackout e Translúcida',
    titulo: 'Salas corporativas',
    descricao: 'Clássica, funcional e perfeita para grandes vãos.'
  },
  {
    id: 7,
    imagem: cortinaDeSala,
    categoria: 'Cortina Prega Macho',
    titulo: 'Cortina Linho forrada',
    descricao: 'Beleza por fora, proteção por dentro, bloqueio de luz, isolamento térmico e privacidade total.'
  },
  {
    id: 8,
    imagem: motorizada,
    categoria: 'Cortinas Motorizadas',
    titulo: 'Cortina Motorizada',
    descricao: 'O conforto de controlar a luz e a privacidade do seu ambiente sem sair do lugar.'
  },
  {
    id: 9,
    imagem: toldo,
    categoria: 'Toldos',
    titulo: 'Área externa',
    descricao: 'Toldo rolo com acionamento manual para área gourmet.'
  },
  {
    id: 10,
    imagem: ph50mm,
    categoria: 'Persiana Horizontal',
    titulo: 'Sala de Jantar',
    descricao: 'Persiana horizontal 50mm em madeira com fita para sala de jantar.'
  },
]

function Projects() {
  useSEO({
    title: 'Projetos — Ambientes Transformados',
    description: 'Veja nossos projetos de cortinas, persianas e toldos sob medida. Cada ambiente recebe uma solução personalizada com elegância e sofisticação.',
    url: '/projects',
  })

  return (
    <main className="projects" aria-label="Projetos — AG Cortinas e Persianas">

      <div className="projects-header">
        <span className="projects-label">Projetos</span>
        <h1 className="projects-titulo">Projetos realizados com precisão e estilo</h1>
        <p className="projects-subtitulo">
          Do projeto à instalação, cada cortina e persiana é executada sob medida — para o seu espaço, do seu jeito.
        </p>
      </div>

      <div className="projects-grid">
        {projetos.map(function (projeto) {
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
