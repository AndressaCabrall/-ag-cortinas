import Hero from './Hero/Hero'
import ProjectsPreview from './ProjectsPreview/ProjectsPreview'
import Stats from './Stats/Stats'
import Testimonials from './Testimonials/Testimonials'
import BlogPreview from './BlogPreview/BlogPreview'

function Home() {
  return (
    <main>
      <Hero />
      <ProjectsPreview />
      <Stats />
      <Testimonials />
      <BlogPreview />
    </main>
  )
}

export default Home