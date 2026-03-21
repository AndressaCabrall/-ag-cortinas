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

        {/* WhatsApp button */}
        <a
          href="https://wa.me/5547984211262?text=Olá!%20Gostaria%20de%20um%20orçamento."
          target="_blank"
          rel="noopener noreferrer"
          className="contact-btn-whatsapp"
          aria-label="Entre em contato pelo WhatsApp"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
          </svg>
          Falar pelo WhatsApp
        </a>

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