import { useParams, Link } from 'react-router-dom'
import { posts } from '../../data/posts'
import './BlogPost.css'

function BlogPost() {

  // Pega o slug da URL — ex: /blog/cortina-blackout
  const params = useParams()
  const slug = params.slug

  // Encontra o post pelo slug
  const post = posts.find(function(p) {
    return p.slug === slug
  })

  // Se não encontrar o post
  if (!post) {
    return (
      <main className="blogpost-erro">
        <h1>Post não encontrado</h1>
        <Link to="/blog">← Voltar para o Blog</Link>
      </main>
    )
  }

  return (
    <main className="blogpost" aria-label={post.titulo}>

      {/* Header do post */}
      <div className="blogpost-header">
        <Link to="/blog" className="blogpost-voltar">
          ← Voltar para o Blog
        </Link>
        <span className="blogpost-categoria">{post.categoria}</span>
        <h1 className="blogpost-titulo">{post.titulo}</h1>
        <p className="blogpost-data">{post.data}</p>
      </div>

      {/* Imagem de capa */}
      <div className="blogpost-imagem">
        <img
          src={post.imagem}
          alt={post.titulo}
        />
      </div>

      {/* Conteúdo do post */}
      <div className="blogpost-content">
        {post.conteudo.map(function(bloco, index) {

          if (bloco.tipo === 'subtitulo') {
            return (
              <h2 key={index} className="blogpost-subtitulo">
                {bloco.texto}
              </h2>
            )
          }

          if (bloco.tipo === 'dica') {
            return (
              <div key={index} className="blogpost-dica">
                <p>{bloco.texto}</p>
              </div>
            )
          }

          return (
            <p key={index} className="blogpost-paragrafo">
              {bloco.texto}
            </p>
          )

        })}
      </div>

      {/* CTA no final */}
      <div className="blogpost-cta">
        <h2 className="blogpost-cta-titulo">
          Gostou das dicas?
        </h2>
        <p className="blogpost-cta-texto">
          Entre em contato e receba um orçamento personalizado para o seu espaço.
        </p>
        <Link to="/contact" className="blogpost-cta-btn">
          Solicitar orçamento
        </Link>
      </div>

      {/* Posts relacionados */}
      <div className="blogpost-relacionados">
        <h2 className="blogpost-relacionados-titulo">
          Leia também
        </h2>
        <div className="blogpost-relacionados-grid">
          {posts
            .filter(function(p) { return p.slug !== slug })
            .slice(0, 2)
            .map(function(p) {
              return (
                <Link
                  to={'/blog/' + p.slug}
                  className="blogpost-relacionado-card"
                  key={p.id}
                >
                  <div className="blogpost-relacionado-imagem">
                    <img src={p.imagem} alt={p.titulo} />
                  </div>
                  <span className="blogpost-relacionado-categoria">
                    {p.categoria}
                  </span>
                  <h3 className="blogpost-relacionado-titulo">
                    {p.titulo}
                  </h3>
                </Link>
              )
            })}
        </div>
      </div>

    </main>
  )
}

export default BlogPost