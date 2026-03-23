import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollSmoother } from "gsap/ScrollSmoother"
import Home from "./pages/Home/Home.jsx"
import Projects from "./pages/Projects/Projects.jsx"
import About from "./pages/About/About.jsx"
import Blog from "./pages/Blog/Blog.jsx"
import BlogPost from "./pages/BlogPost/BlogPost.jsx"
import Contact from "./pages/Contact/Contact.jsx"
import Navbar from "./components/Navbar/Navbar.jsx"
import Footer from "./components/Footer/Footer.jsx"
import WhatsAppBtn from "./components/WhatsAppBtn/WhatsAppBtn.jsx"

gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

// Detecta mudança de rota e recalcula alturas do ScrollSmoother
function ScrollSmootherRefresh({ smootherRef }) {
  const location = useLocation()

  useEffect(() => {
    if (smootherRef.current) {
      // Aguarda o React terminar de renderizar a nova página
      setTimeout(() => {
        smootherRef.current.scrollTo(0, true) // volta pro topo suavemente
        ScrollTrigger.refresh()               // recalcula todas as alturas
      }, 100)
    }
  }, [location.pathname])

  return null
}

function App() {
  const smootherRef = useRef(null)

  useEffect(function () {
    smootherRef.current = ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: 1.5,
      effects: true,
    })

    return function () {
      if (smootherRef.current) {
        smootherRef.current.kill()
      }
    }
  }, [])

  return (
    <BrowserRouter>
      <Navbar />
      <WhatsAppBtn />
      <ScrollSmootherRefresh smootherRef={smootherRef} />

      <div id="smooth-wrapper">
        <div id="smooth-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
          <Footer />
        </div>
      </div>

    </BrowserRouter>
  )
}

export default App
