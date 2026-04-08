
import { Link } from 'react-router-dom'
import { posts } from '../../data/posts'
import './Blog.css'
import { useSEO } from '../../hooks/useSEO' // ← ADICIONAR

function Blog() {
  // ← ADICIONAR: SEO da página
  useSEO({
    title: 'Blog — Dicas e Inspirações de Decoração',
    description: 'Dicas, tendências e inspirações sobre cortinas, persianas e decoração de interiores. Transforme seu ambiente com as ideias da AG Cortinas.',
    url: '/blog',
  })

  return (
    <main className="blog" aria-label="Blog — AG Cortinas e Persianas">

      <div className="blog-header">
        <span className="blog-label">Blog</span>
        <h1 className="blog-titulo">Dicas e inspirações para o seu espaço</h1>
        <p className="blog-subtitulo">
          Conteúdo sobre cortinas, persianas e decoração para transformar seu ambiente.
        </p>
      </div>

      <div className="blog-grid">
        {posts.map(function(post) {
          return (
            <Link
              to={'/blog/' + post.slug}
              className="blog-card"
              key={post.id}
              aria-label={'Ler post: ' + post.titulo}
            >
              <div className="blog-card-imagem">
                <img src={post.imagem} alt={post.titulo} loading="lazy" />
                <span className="blog-card-categoria">{post.categoria}</span>
              </div>
              <div className="blog-card-content">
                <h2 className="blog-card-titulo">{post.titulo}</h2>
                <p className="blog-card-resumo">{post.resumo}</p>
                <div className="blog-card-footer">
                  <span className="blog-card-data">{post.data}</span>
                  <span className="blog-card-ler">Ler mais →</span>
                </div>
              </div>
            </Link>
          )
        })}
      </div>

    </main>
  )
}

export default Blog
