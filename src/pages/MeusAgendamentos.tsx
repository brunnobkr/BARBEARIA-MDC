import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { Agendamento } from '../types'
import { barbeiros } from '../data/barbeiros'
import './MeusAgendamentos.css'

const MeusAgendamentos = () => {
  const { cliente, isClienteAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([])

  useEffect(() => {
    if (!isClienteAuthenticated) {
      navigate('/login-cliente')
      return
    }

    // Carregar agendamentos do cliente
    const agendamentosSalvos = JSON.parse(localStorage.getItem('agendamentos') || '[]')
    const agendamentosCliente = agendamentosSalvos.filter(
      (a: Agendamento) => a.clienteId === cliente?.id && a.status !== 'cancelado'
    )
    setAgendamentos(agendamentosCliente)
  }, [cliente, isClienteAuthenticated, navigate])

  const cancelarAgendamento = (agendamentoId: string) => {
    if (!confirm('Tem certeza que deseja cancelar este agendamento?')) return

    const agendamentosSalvos = JSON.parse(localStorage.getItem('agendamentos') || '[]')
    const agendamentosAtualizados = agendamentosSalvos.map((a: Agendamento) => {
      if (a.id === agendamentoId) {
        return { ...a, status: 'cancelado' as const }
      }
      return a
    })

    localStorage.setItem('agendamentos', JSON.stringify(agendamentosAtualizados))

    // Atualizar lista
    const agendamentosCliente = agendamentosAtualizados.filter(
      (a: Agendamento) => a.clienteId === cliente?.id && a.status !== 'cancelado'
    )
    setAgendamentos(agendamentosCliente)

    alert('Agendamento cancelado com sucesso!')
  }

  const formatarData = (data: string) => {
    return data || 'Data não especificada'
  }

  const formatarPreco = (preco: number) => {
    return `R$ ${preco.toFixed(2)}`
  }

  if (!cliente) {
    return null
  }

  return (
    <div className="meus-agendamentos-page">
      <div className="container">
        <h1>Meus Agendamentos</h1>
        <p className="page-subtitle">Gerencie seus agendamentos na Barbearia MDC</p>

        {agendamentos.length === 0 ? (
          <div className="empty-state">
            <p>Você não possui agendamentos no momento.</p>
            <button
              className="btn-agendar"
              onClick={() => navigate('/agendamento')}
            >
              Fazer Agendamento
            </button>
          </div>
        ) : (
          <div className="agendamentos-list">
            {agendamentos.map((agendamento) => {
              const barbeiro = barbeiros.find(b => b.id === agendamento.barbeiroId)
              const servico = barbeiro?.servicos.find(s => s.id === agendamento.servicoId)
              
              return (
                <div key={agendamento.id} className="agendamento-card">
                  <div className="agendamento-header">
                    <div>
                      <h3>{servico?.nome || 'Serviço'}</h3>
                      <p className="agendamento-barbeiro">Com {barbeiro?.nome || 'Barbeiro'}</p>
                    </div>
                    <span className={`agendamento-status ${agendamento.status}`}>
                      {agendamento.status === 'agendado' && 'Agendado'}
                      {agendamento.status === 'concluido' && 'Concluído'}
                    </span>
                  </div>

                  <div className="agendamento-details">
                    <div className="detail-item">
                      <span className="detail-label">📅 Data:</span>
                      <span className="detail-value">{formatarData(agendamento.data)}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">⏰ Horário:</span>
                      <span className="detail-value">{agendamento.horario}</span>
                    </div>
                    {servico && (
                      <div className="detail-item">
                        <span className="detail-label">💰 Valor:</span>
                        <span className="detail-value">{formatarPreco(servico.preco)}</span>
                      </div>
                    )}
                    {agendamento.observacoes && (
                      <div className="detail-item">
                        <span className="detail-label">📝 Observações:</span>
                        <span className="detail-value">{agendamento.observacoes}</span>
                      </div>
                    )}
                  </div>

                  {agendamento.status === 'agendado' && (
                    <button
                      className="btn-cancelar"
                      onClick={() => cancelarAgendamento(agendamento.id)}
                    >
                      Cancelar Agendamento
                    </button>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default MeusAgendamentos

