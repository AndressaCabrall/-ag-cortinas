
import Hero from './Hero/Hero'
import ProjectsPreview from './ProjectsPreview/ProjectsPreview'
import Stats from './Stats/Stats'
import Testimonials from './Testimonials/Testimonials'
import BlogPreview from './BlogPreview/BlogPreview'
import { useSEO } from '../../hooks/useSEO' 

function Home() {
  // ← ADICIONAR
  useSEO({
    title: 'Cortinas e Persianas Sob Medida em Joinville',
    description: 'A AG Cortinas transforma ambientes com cortinas e persianas sob medida. Mais de 13 anos de experiência, atendimento em joinville e região. Solicite um orçamento grátis.',
    url: '/',
  })

  return (
    <main>
      <div id="hero">
        <Hero />
      </div>
      <div id="projects-preview">
        <ProjectsPreview />
      </div>
      <div id="stats">
        <Stats />
      </div>
      <div id="testimonials">
        <Testimonials />
      </div>
      <div id="blog-preview">
        <BlogPreview />
      </div>
    </main>
  )
}

export default Home
