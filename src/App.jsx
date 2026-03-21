import { BrowserRouter, Routes, Route } from  "react-router-dom"
import Home from "./pages/Home/Home.jsx"
import Projects from "./pages/Projects/Projects.jsx"
import About from "./pages/About/About.jsx"
import Blog from "./pages/Blog/Blog.jsx"
import BlogPost from './pages/BlogPost/BlogPost.jsx'
import Contact from "./pages/Contact/Contact.jsx"
import Navbar from "./components/Navbar/Navbar.jsx"
import Footer from "./components/Footer/Footer.jsx"



function App() {
  return (
    <BrowserRouter>
      <Navbar />
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
      
    </BrowserRouter>
  )
}

export default App