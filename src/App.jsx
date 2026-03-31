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

// ─── Context para expor o smoother aos filhos (ex: botões "voltar ao topo") ───
export const SmootherContext = createContext(null)
export const useSmootherContext = () => useContext(SmootherContext)

// ─── Componente interno: precisa estar DENTRO do BrowserRouter para usar useLocation ───
function AppInner({ smootherRef, carregado, setCarregado }) {
  const location = useLocation()
  const wrapperRef = useRef(null)
  const contentRef = useRef(null)

  /**
   * Cria o ScrollSmoother UMA vez após o DOM estar pronto.
   * useGSAP usa useLayoutEffect internamente — roda antes da pintura,
   * garantindo que wrapper e content já existem no DOM.
   */
  useGSAP(() => {
    smootherRef.current = ScrollSmoother.create({
      wrapper: wrapperRef.current,
      content: contentRef.current,
      smooth: 1.2,
      effects: true,
      normalizeScroll: true, // normaliza diferenças entre browsers/devices
    })

    return () => {
      // Cleanup correto: mata o smoother ao desmontar
      if (smootherRef.current) {
        smootherRef.current.kill()
        smootherRef.current = null
      }
    }
  }, { scope: wrapperRef, dependencies: [] })

  /**
   * Recalcula o ScrollSmoother a cada troca de rota.
   *
   * Por que não recriar o smoother inteiro?
   * Recriar causa flash e perde o estado. O correto é:
   * 1. scrollTo(0) — volta ao topo da nova página
   * 2. ScrollTrigger.refresh() — recalcula TODAS as alturas
   *
   * O setTimeout garante que o React já terminou de pintar
   * o novo conteúdo antes do recálculo.
   */
  useGSAP(() => {
    if (!smootherRef.current) return

    // Reset imediato: antes de qualquer refresh, o scroll já precisa estar em 0
    smootherRef.current.scrollTo(0, false)

    // Refresh após o React terminar de pintar o novo layout
    const id = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 200)

    return () => clearTimeout(id)
  }, { dependencies: [location.pathname] })

  return (
    <>
      {!carregado && <Preloader onComplete={() => setCarregado(true)} />}

      <Navbar />
      <WhatsAppBtn />
      <CookieBanner />

      <div ref={wrapperRef} id="smooth-wrapper">
        <div ref={contentRef} id="smooth-content">
          <Routes>
            <Route path="/"             element={<Home />} />
            <Route path="/projects"     element={<Projects />} />
            <Route path="/about"        element={<About />} />
            <Route path="/blog"         element={<Blog />} />
            <Route path="/blog/:slug"   element={<BlogPost />} />
            <Route path="/contact"      element={<Contact />} />
            <Route path="/privacidade"  element={<Privacy />} />
            <Route path="/admin"        element={<Admin />} />
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
