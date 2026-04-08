import { Link } from 'react-router-dom'
import { posts } from '../../../data/posts'
import './BlogPreview.css'

function BlogPreview() {

  // Pega só os 2 primeiros posts

  const doisPosts = posts.slice(0, 2)

  return (

    <section className="blog-preview" aria-label="Blog — AG Cortinas e Persianas">

      {/* Header da seção */}

      <div className="blog-preview-header">
        <span className="blog-preview-label">Blog</span>
        <h2 className="blog-preview-titulo">
          Dicas e inspirações para o seu espaço
        </h2>
        <Link to="/blog" className="blog-preview-ver-todos">
          Ver todos os posts →
        </Link>
      </div>

      {/* Cards dos posts */}
      
      <div className="blog-preview-grid">
        {doisPosts.map(function(post) {
          return (
            <Link
              to={'/blog/' + post.slug}
              className="blog-preview-card"
              key={post.id}
              aria-label={'Ler post: ' + post.titulo}
            >
              <div className="blog-preview-card-imagem">
                <img
                  src={post.imagem}
                  alt={post.titulo}
                  loading="lazy"
                />
              </div>
              <div className="blog-preview-card-content">
                <span className="blog-preview-card-categoria">
                  {post.categoria}
                </span>
                <h3 className="blog-preview-card-titulo">
                  {post.titulo}
                </h3>
                <p className="blog-preview-card-resumo">
                  {post.resumo}
                </p>
                <span className="blog-preview-card-data">
                  {post.data}
                </span>
              </div>
            </Link>
          )
        })}
      </div>

    </section>
  )
}

export default BlogPreview