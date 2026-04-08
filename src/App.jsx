import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import { useRef, useState, createContext, useContext } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollSmoother } from "gsap/ScrollSmoother"
import { useGSAP } from "@gsap/react"

import Home from "./pages/Home/Home.jsx"
import Projects from "./pages/Projects/Projects.jsx"
import About from "./pages/About/About.jsx"
import Blog from "./pages/Blog/Blog.jsx"
import BlogPost from "./pages/BlogPost/BlogPost.jsx"
import Contact from "./pages/Contact/Contact.jsx"
import Privacy from "./pages/Privacy/Privacy.jsx"
import Admin from "./pages/Admin/Admin.jsx"
import Navbar from "./components/Navbar/Navbar.jsx"
import Footer from "./components/Footer/Footer.jsx"
import WhatsAppBtn from "./components/WhatsAppBtn/WhatsAppBtn.jsx"
import CookieBanner from "./components/CookieBanner/CookieBanner.jsx"
import Preloader from "./pages/home/Hero/Preloader.jsx"

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, useGSAP)


export const SmootherContext = createContext(null)
export const useSmootherContext = () => useContext(SmootherContext)

// ─── Componente interno: precisa estar DENTRO do BrowserRouter para usar useLocation ───
function AppInner({ smootherRef, carregado, setCarregado }) {
  const location = useLocation()
  const wrapperRef = useRef(null)
  const contentRef = useRef(null)

  
  useGSAP(() => {
    smootherRef.current = ScrollSmoother.create({
      wrapper: wrapperRef.current,
      content: contentRef.current,
      smooth: 1.2,
      effects: true,
      normalizeScroll: true, 
    })

    return () => {
      

      if (smootherRef.current) {
        smootherRef.current.kill()
        smootherRef.current = null
      }
    }
  }, { scope: wrapperRef, dependencies: [] })

  
  useGSAP(() => {
    if (!smootherRef.current) return

    // Reset imediato: antes de qualquer refresh, o scroll já precisa estar em 0
    smootherRef.current.scrollTo(0, false)

    // Refresh após o React terminar de pintar o novo layout
    // Home tem mais conteúdo — precisa de mais tempo para calcular
    const tempo = location.pathname === '/' ? 1200 : 600
    const id = setTimeout(() => {
      ScrollTrigger.refresh()
    }, tempo)

    return () => clearTimeout(id)
  }, { dependencies: [location.pathname] })

  return (
    <>
      {!carregado && <Preloader onComplete={() => {
        setCarregado(true)
        setTimeout(() => {
          ScrollTrigger.refresh()
          if (smootherRef.current) {
            smootherRef.current.scrollTo(0, false)
          }
        }, 300)
      }} />}

      <Navbar />
      <WhatsAppBtn />
      <CookieBanner />

      <div ref={wrapperRef} id="smooth-wrapper">
        <div ref={contentRef} id="smooth-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacidade" element={<Privacy />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </>
  )
}

// ─── Componente raiz: só provê BrowserRouter, Context e estado global ───

function App() {
  const smootherRef = useRef(null)
  const [carregado, setCarregado] = useState(false)

  return (
    <SmootherContext.Provider value={smootherRef}>
      <BrowserRouter>
        <AppInner
          smootherRef={smootherRef}
          carregado={carregado}
          setCarregado={setCarregado}
        />
      </BrowserRouter>
    </SmootherContext.Provider>
  )
}

export default App
