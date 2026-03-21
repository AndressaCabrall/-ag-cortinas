import './Contact.css'
import contatoDesktop from '../../assets/images/hero-footer/contato-desktop.webp'

function Contact() {
  return (
    <main className="contact" aria-label="Página de Contato — AG Cortinas e Persianas">

      {/* Left side — form */}
      <div className="contact-form-wrapper">

        <div className="contact-header">
          <h1 className="contact-title">Fale conosco</h1>
          <p className="contact-subtitle">
            Quer transformar seu ambiente? Entre em contato e receba um orçamento personalizado.
          </p>
        </div>

        <form className="contact-form" aria-label="Formulário de contato">

          <div className="contact-field">
            <label htmlFor="nome">Nome completo*</label>
            <input
              type="text"
              id="nome"
              name="nome"
              placeholder="Seu nome"
              required
              aria-required="true"
            />
          </div>

          <div className="contact-field">
            <label htmlFor="email">Email*</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="seu@email.com"
              required
              aria-required="true"
            />
          </div>

          <div className="contact-field">
            <label htmlFor="telefone">Telefone*</label>
            <input
              type="tel"
              id="telefone"
              name="telefone"
              placeholder="(47) 00000-0000"
              required
              aria-required="true"
            />
          </div>

          <div className="contact-field">
            <label htmlFor="servico">Tipo de serviço</label>
            <select id="servico" name="servico" aria-label="Selecione o tipo de serviço">
              <option value="">Selecione...</option>
              <option value="cortinas">Cortinas</option>
              <option value="persianas">Persianas</option>
              <option value="ambos">Cortinas e Persianas</option>
              <option value="outro">Outro</option>
            </select>
          </div>

          <div className="contact-field">
            <label htmlFor="mensagem">Mensagem</label>
            <textarea
              id="mensagem"
              name="mensagem"
              placeholder="Conte um pouco sobre o seu projeto..."
              rows="4"
              aria-label="Mensagem"
            ></textarea>
          </div>

          <button type="submit" className="contact-btn-submit">
            Enviar mensagem
          </button>

        </form>

       </div>

      {/* Right side — image */}

      <div className="contact-image" aria-hidden="true">
        <img
          src={contatoDesktop}
          alt="Cortinas sob medida instaladas — AG Cortinas e Persianas"
        />

        {/* Info over image */}
        
        <div className="contact-info">
          <div className="contact-info-item">
            <span className="contact-info-label">Telefone</span>
            <a href="tel:+5547984211262">(47) 98421-1262</a>
          </div>
          <div className="contact-info-item">
            <span className="contact-info-label">Email</span>
            <a href="mailto:agcortinasepersianas@gmail.com">agcortinasepersianas@gmail.com</a>
          </div>
          <div className="contact-info-item">
            <span className="contact-info-label">Horário</span>
            <span>Seg a Sex — 8h às 18h</span>
          </div>
        </div>

      </div>

    </main>
  )
}

export default Contact