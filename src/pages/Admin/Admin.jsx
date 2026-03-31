// Painel protegido por senha para visualizar e gerenciar agendamentos


import { useState, useEffect, useCallback } from 'react'
import './Admin.css'

const SENHA_ADMIN = 'agcortinas2024' // ← troque por uma senha forte
const API_BASE = '/api'

const STATUS_LABELS = {
  pendente:   { label: 'Pendente',   cor: 'status-pendente' },
  confirmado: { label: 'Confirmado', cor: 'status-confirmado' },
  cancelado:  { label: 'Cancelado',  cor: 'status-cancelado' },
}

const SERVICO_LABELS = {
  cortinas:  'Cortinas',
  persianas: 'Persianas',
  ambos:     'Cortinas e Persianas',
  outro:     'Outro',
  '':        'Não informado',
}

function Admin() {
  const [autenticado, setAutenticado] = useState(false)
  const [senhaInput, setSenhaInput]   = useState('')
  const [erroSenha, setErroSenha]     = useState(false)

  const [agendamentos, setAgendamentos] = useState([])
  const [filtro, setFiltro]             = useState('todos')
  const [loading, setLoading]           = useState(false)
  const [erro, setErro]                 = useState(null)
  const [atualizando, setAtualizando]   = useState(null) // id do agendamento sendo atualizado

  // Carrega agendamentos da API
  const carregarAgendamentos = useCallback(async () => {
    setLoading(true)
    setErro(null)
    try {
      const res  = await fetch(`${API_BASE}/admin-agendamentos.php`)
      const data = await res.json()
      if (data.success) {
        setAgendamentos(data.agendamentos)
      } else {
        setErro('Erro ao carregar agendamentos.')
      }
    } catch {
      setErro('Não foi possível conectar à API.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (autenticado) carregarAgendamentos()
  }, [autenticado, carregarAgendamentos])

  // Login
  function handleLogin(e) {
    e.preventDefault()
    if (senhaInput === SENHA_ADMIN) {
      setAutenticado(true)
      setErroSenha(false)
    } else {
      setErroSenha(true)
      setSenhaInput('')
    }
  }

  // Sair — limpa tudo antes de desautenticar
  function handleSair(e) {
    e.stopPropagation()
    setAgendamentos([])
    setErro(null)
    setFiltro('todos')
    setSenhaInput('')
    setAutenticado(false)
  }

  // Atualizar
  function handleAtualizar(e) {
    e.stopPropagation()
    carregarAgendamentos()
  }

  // Alterar status
  async function alterarStatus(id, novoStatus) {
    setAtualizando(id)
    try {
      const res  = await fetch(`${API_BASE}/admin-agendamentos.php`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ id, status: novoStatus }),
      })
      const data = await res.json()
      if (data.success) {
        setAgendamentos(prev =>
          prev.map(a => a.id === id ? { ...a, status: novoStatus } : a)
        )
      }
    } catch {
      setErro('Erro ao atualizar status.')
    } finally {
      setAtualizando(null)
    }
  }

  // Filtro
  const lista = filtro === 'todos'
    ? agendamentos
    : agendamentos.filter(a => a.status === filtro)

  // Contadores
  const contadores = {
    todos:      agendamentos.length,
    pendente:   agendamentos.filter(a => a.status === 'pendente').length,
    confirmado: agendamentos.filter(a => a.status === 'confirmado').length,
    cancelado:  agendamentos.filter(a => a.status === 'cancelado').length,
  }

  // ---- TELA DE LOGIN ----
  if (!autenticado) {
    return (
      <div className="admin-login">
        <div className="admin-login-box">
          <div className="admin-login-logo">✦</div>
          <h1 className="admin-login-titulo">Painel AG Cortinas</h1>
          <p className="admin-login-sub">Área restrita — insira a senha para continuar</p>
          <form onSubmit={handleLogin} className="admin-login-form">
            <input
              type="password"
              placeholder="Senha"
              value={senhaInput}
              onChange={e => setSenhaInput(e.target.value)}
              className={`admin-login-input ${erroSenha ? 'erro' : ''}`}
              autoFocus
            />
            {erroSenha && <p className="admin-login-erro">Senha incorreta.</p>}
            <button type="submit" className="admin-login-btn">Entrar</button>
          </form>
        </div>
      </div>
    )
  }

  // ---- PAINEL ----
  return (
    <div className="admin">

      {/* Header */}
      <div className="admin-header">
        <div className="admin-header-left">
          <span className="admin-header-icone">✦</span>
          <div>
            <h1 className="admin-header-titulo">Painel de Agendamentos</h1>
            <p className="admin-header-sub">AG Cortinas e Persianas</p>
          </div>
        </div>
        <div className="admin-header-right">
          <button className="admin-btn-refresh" onClick={handleAtualizar} disabled={loading}>
            {loading ? 'Atualizando...' : '↻ Atualizar'}
          </button>
          <button className="admin-btn-sair" onClick={handleSair}>
            Sair
          </button>
        </div>
      </div>

      {/* Contadores */}
      <div className="admin-contadores">
        {[
          { key: 'todos',      label: 'Total' },
          { key: 'pendente',   label: 'Pendentes' },
          { key: 'confirmado', label: 'Confirmados' },
          { key: 'cancelado',  label: 'Cancelados' },
        ].map(item => (
          <button
            key={item.key}
            className={`admin-contador ${filtro === item.key ? 'ativo' : ''} admin-contador-${item.key}`}
            onClick={() => setFiltro(item.key)}
          >
            <span className="admin-contador-numero">{contadores[item.key]}</span>
            <span className="admin-contador-label">{item.label}</span>
          </button>
        ))}
      </div>

      {/* Erro */}
      {erro && <p className="admin-erro">{erro}</p>}

      {/* Loading */}
      {loading && <p className="admin-loading">Carregando agendamentos...</p>}

      {/* Lista vazia */}
      {!loading && lista.length === 0 && (
        <div className="admin-vazio">
          <p>Nenhum agendamento {filtro !== 'todos' ? `com status "${STATUS_LABELS[filtro]?.label}"` : ''} encontrado.</p>
        </div>
      )}

      {/* Tabela */}
      {!loading && lista.length > 0 && (
        <div className="admin-tabela-wrapper">
          <table className="admin-tabela">
            <thead>
              <tr>
                <th>#</th>
                <th>Cliente</th>
                <th>Contato</th>
                <th>Serviço</th>
                <th>Data / Horário</th>
                <th>Endereço</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {lista.map(a => (
                <tr key={a.id} className={`admin-linha admin-linha-${a.status}`}>
                  <td className="admin-id">#{a.id}</td>
                  <td className="admin-nome">
                    <span className="admin-nome-texto">{a.nome}</span>
                    <span className="admin-criado">
                      Solicitado em {formatarData(a.criado_em)}
                    </span>
                  </td>
                  <td className="admin-contato">
                    <a href={`mailto:${a.email}`} className="admin-link">{a.email}</a>
                    <a href={`tel:${a.telefone}`} className="admin-link">{a.telefone}</a>
                  </td>
                  <td>{SERVICO_LABELS[a.servico] || a.servico}</td>
                  <td className="admin-data">
                    <span className="admin-data-dia">{formatarDataVisita(a.data_visita)}</span>
                    <span className="admin-data-hora">{a.horario}</span>
                  </td>
                  <td className="admin-endereco">
                    {a.endereco}
                    {a.complemento && <span className="admin-complemento">{a.complemento}</span>}
                    {a.observacoes && (
                      <span className="admin-obs" title={a.observacoes}>💬 Ver obs.</span>
                    )}
                  </td>
                  <td>
                    <span className={`admin-status ${STATUS_LABELS[a.status]?.cor}`}>
                      {STATUS_LABELS[a.status]?.label}
                    </span>
                  </td>
                  <td className="admin-acoes">
                    {a.status !== 'confirmado' && (
                      <button
                        className="admin-acao admin-acao-confirmar"
                        onClick={() => alterarStatus(a.id, 'confirmado')}
                        disabled={atualizando === a.id}
                      >
                        Confirmar
                      </button>
                    )}
                    {a.status !== 'cancelado' && (
                      <button
                        className="admin-acao admin-acao-cancelar"
                        onClick={() => alterarStatus(a.id, 'cancelado')}
                        disabled={atualizando === a.id}
                      >
                        Cancelar
                      </button>
                    )}
                    {a.status !== 'pendente' && (
                      <button
                        className="admin-acao admin-acao-pendente"
                        onClick={() => alterarStatus(a.id, 'pendente')}
                        disabled={atualizando === a.id}
                      >
                        Pendente
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

// ---- Helpers de data ----
function formatarData(str) {
  if (!str) return '—'
  const d = new Date(str)
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

function formatarDataVisita(str) {
  if (!str) return '—'
  const [ano, mes, dia] = str.split('-')
  return `${dia}/${mes}/${ano}`
}

export default Admin
