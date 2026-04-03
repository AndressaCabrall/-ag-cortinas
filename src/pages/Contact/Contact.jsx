import { useState } from 'react'
import './Contact.css'
import contatoDesktop from '../../assets/images/hero-footer/contato-desktop.webp'
import { useSEO } from '../../hooks/useSEO'

const API_BASE = '/api'

function Contact() {
  useSEO({
    title: 'Contato — Solicite um Orçamento Grátis',
    description: 'Entre em contato com a AG Cortinas e Persianas. Agende uma visita técnica gratuita ou envie sua mensagem. Atendemos Joinville e região.',
    url: '/contact',
  })

  const [activeTab, setActiveTab] = useState('mensagem')

  const [contatoForm, setContatoForm] = useState({
    nome: '', email: '', telefone: '', servico: '', mensagem: ''
  })
  const [contatoStatus, setContatoStatus] = useState(null)

  const [agendaForm, setAgendaForm] = useState({
    nome: '', email: '', telefone: '',
    servico: '', data: '', horario: '',
    endereco: '', complemento: '', observacoes: ''
  })
  const [agendaStatus, setAgendaStatus] = useState(null)

  function handleContatoChange(e) {
    setContatoForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleContatoSubmit(e) {
    e.preventDefault()
    setContatoStatus('loading')
    try {
      const res = await fetch(`${API_BASE}/contato.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contatoForm)
      })
      const data = await res.json()
      if (data.success) {
        setContatoStatus('success')
        setContatoForm({ nome: '', email: '', telefone: '', servico: '', mensagem: '' })
      } else {
        setContatoStatus('error')
      }
    } catch {
      setContatoStatus('error')
    }
  }

  function handleAgendaChange(e) {
    setAgendaForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleAgendaSubmit(e) {
    e.preventDefault()
    setAgendaStatus('loading')
    try {
      const res = await fetch(`${API_BASE}/agendamento.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(agendaForm)
      })
      const data = await res.json()
      if (data.success) {
        setAgendaStatus('success')
        setAgendaForm({
          nome: '', email: '', telefone: '',
          servico: '', data: '', horario: '',
          endereco: '', complemento: '', observacoes: ''
        })
      } else {
        setAgendaStatus('error')
      }
    } catch {
      setAgendaStatus('error')
    }
  }

  const hoje = new Date().toISOString().split('T')[0]
  const horarios = [
    '08:00', '09:00', '10:00', '11:00',
    '13:00', '14:00', '15:00', '16:00', '17:00'
  ]

  return (
    <main className="contact" aria-label="Página de Contato — AG Cortinas e Persianas">

      <div className="contact-form-wrapper">

        <div className="contact-header">
          <h1 className="contact-title">Fale conosco</h1>
          <p className="contact-subtitle">
            Quer transformar seu ambiente? Entre em contato ou agende uma visita técnica gratuita.
          </p>
        </div>

        <div className="contact-tabs" role="tablist">
          <button
            role="tab"
            aria-selected={activeTab === 'mensagem'}
            className={`contact-tab ${activeTab === 'mensagem' ? 'active' : ''}`}
            onClick={() => { setActiveTab('mensagem'); setContatoStatus(null) }}
          >
            Enviar mensagem
          </button>
          <button
            role="tab"
            aria-selected={activeTab === 'agendamento'}
            className={`contact-tab ${activeTab === 'agendamento' ? 'active' : ''}`}
            onClick={() => { setActiveTab('agendamento'); setAgendaStatus(null) }}
          >
            Agendar visita
          </button>
        </div>

        {activeTab === 'mensagem' && (
          <form className="contact-form" aria-label="Formulário de contato" onSubmit={handleContatoSubmit}>
            <div className="contact-field">
              <label htmlFor="nome">Nome completo*</label>
              <input type="text" id="nome" name="nome" placeholder="Seu nome"
                value={contatoForm.nome} onChange={handleContatoChange} required aria-required="true" />
            </div>
            <div className="contact-row">
              <div className="contact-field">
                <label htmlFor="email">Email*</label>
                <input type="email" id="email" name="email" placeholder="seu@email.com"
                  value={contatoForm.email} onChange={handleContatoChange} required aria-required="true" />
              </div>
              <div className="contact-field">
                <label htmlFor="telefone">Telefone*</label>
                <input type="tel" id="telefone" name="telefone" placeholder="(41) 00000-0000"
                  value={contatoForm.telefone} onChange={handleContatoChange} required aria-required="true" />
              </div>
            </div>
            <div className="contact-field">
              <label htmlFor="servico">Tipo de serviço</label>
              <select id="servico" name="servico" value={contatoForm.servico} onChange={handleContatoChange}>
                <option value="">Selecione...</option>
                <option value="cortinas">Cortinas</option>
                <option value="persianas">Persianas</option>
                <option value="ambos">Cortinas e Persianas</option>
                <option value="outro">Outro</option>
              </select>
            </div>
            <div className="contact-field">
              <label htmlFor="mensagem">Mensagem</label>
              <textarea id="mensagem" name="mensagem" placeholder="Conte um pouco sobre o seu projeto..."
                rows="4" value={contatoForm.mensagem} onChange={handleContatoChange} />
            </div>
            {contatoStatus === 'success' && (
              <p className="contact-feedback success">✓ Mensagem enviada! Retornaremos em breve.</p>
            )}
            {contatoStatus === 'error' && (
              <p className="contact-feedback error">✗ Erro ao enviar. Tente novamente ou nos chame no WhatsApp.</p>
            )}
            <button type="submit" className="contact-btn-submit" disabled={contatoStatus === 'loading'}>
              {contatoStatus === 'loading' ? 'Enviando...' : 'Enviar mensagem'}
            </button>
          </form>
        )}

        {activeTab === 'agendamento' && (
          <form className="contact-form" aria-label="Formulário de agendamento de visita" onSubmit={handleAgendaSubmit}>
            <p className="contact-agenda-info">
              A visita técnica é <strong>gratuita</strong>. Nossa equipe vai até você para medir e apresentar as melhores opções.
            </p>
            <div className="contact-field">
              <label htmlFor="a-nome">Nome completo*</label>
              <input type="text" id="a-nome" name="nome" placeholder="Seu nome"
                value={agendaForm.nome} onChange={handleAgendaChange} required aria-required="true" />
            </div>
            <div className="contact-row">
              <div className="contact-field">
                <label htmlFor="a-email">Email*</label>
                <input type="email" id="a-email" name="email" placeholder="seu@email.com"
                  value={agendaForm.email} onChange={handleAgendaChange} required aria-required="true" />
              </div>
              <div className="contact-field">
                <label htmlFor="a-telefone">Telefone*</label>
                <input type="tel" id="a-telefone" name="telefone" placeholder="(41) 00000-0000"
                  value={agendaForm.telefone} onChange={handleAgendaChange} required aria-required="true" />
              </div>
            </div>
            <div className="contact-field">
              <label htmlFor="a-servico">Tipo de serviço</label>
              <select id="a-servico" name="servico" value={agendaForm.servico} onChange={handleAgendaChange}>
                <option value="">Selecione...</option>
                <option value="cortinas">Cortinas</option>
                <option value="persianas">Persianas</option>
                <option value="ambos">Cortinas e Persianas</option>
                <option value="outro">Outro</option>
              </select>
            </div>
            <div className="contact-row">
              <div className="contact-field">
                <label htmlFor="a-data">Data preferida*</label>
                <input type="date" id="a-data" name="data" min={hoje}
                  value={agendaForm.data} onChange={handleAgendaChange} required aria-required="true" />
              </div>
              <div className="contact-field">
                <label htmlFor="a-horario">Horário preferido*</label>
                <select id="a-horario" name="horario" value={agendaForm.horario}
                  onChange={handleAgendaChange} required aria-required="true">
                  <option value="">Selecione...</option>
                  {horarios.map(h => <option key={h} value={h}>{h}</option>)}
                </select>
              </div>
            </div>
            <div className="contact-field">
              <label htmlFor="a-endereco">Endereço para visita*</label>
              <input type="text" id="a-endereco" name="endereco" placeholder="Rua, número, bairro, cidade"
                value={agendaForm.endereco} onChange={handleAgendaChange} required aria-required="true" />
            </div>
            <div className="contact-field">
              <label htmlFor="a-complemento">Complemento</label>
              <input type="text" id="a-complemento" name="complemento" placeholder="Apto, bloco, referência..."
                value={agendaForm.complemento} onChange={handleAgendaChange} />
            </div>
            <div className="contact-field">
              <label htmlFor="a-observacoes">Observações</label>
              <textarea id="a-observacoes" name="observacoes"
                placeholder="Quantos ambientes, alguma preferência de produto..." rows="3"
                value={agendaForm.observacoes} onChange={handleAgendaChange} />
            </div>
            {agendaStatus === 'success' && (
              <p className="contact-feedback success">✓ Agendamento solicitado! Entraremos em contato para confirmar.</p>
            )}
            {agendaStatus === 'error' && (
              <p className="contact-feedback error">✗ Erro ao agendar. Tente novamente ou nos chame no WhatsApp.</p>
            )}
            <button type="submit" className="contact-btn-submit" disabled={agendaStatus === 'loading'}>
              {agendaStatus === 'loading' ? 'Agendando...' : 'Solicitar visita gratuita'}
            </button>
          </form>
        )}

      </div>

      <div className="contact-image" aria-hidden="true">
        <img src={contatoDesktop} alt="Cortinas sob medida instaladas — AG Cortinas e Persianas" />
        <div className="contact-info">
          <div className="contact-info-item">
            <span className="contact-info-label">Telefone</span>
            <a href="tel:+5541984211262">(41) 98421-1262</a>
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
