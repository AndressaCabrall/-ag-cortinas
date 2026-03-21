import Hero from './Hero/Hero'
import BlogPreview from './BlogPreview/BlogPreview'
import Testimonials from './Testimonials/Testimonials'

function Home() {
  return (
    <main>
      <Hero />
      <Testimonials />
      <BlogPreview />
    </main>
  )
}

export default Home