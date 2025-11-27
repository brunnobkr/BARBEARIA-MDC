import { useState } from 'react'
import { barbeiros } from '../data/barbeiros'
import { Agendamento as AgendamentoType } from '../types'
import './Agendamento.css'

const Agendamento = () => {
  const [step, setStep] = useState(1)
  const [barbeiroSelecionado, setBarbeiroSelecionado] = useState<string>('')
  const [servicoSelecionado, setServicoSelecionado] = useState<string>('')
  const [diaSelecionado, setDiaSelecionado] = useState<string>('')
  const [horarioSelecionado, setHorarioSelecionado] = useState<string>('')
  const [dadosCliente, setDadosCliente] = useState({
    nome: '',
    telefone: '',
    email: '',
    observacoes: ''
  })

  const barbeiro = barbeiros.find(b => b.id === barbeiroSelecionado)
  const servico = barbeiro?.servicos.find(s => s.id === servicoSelecionado)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const novoAgendamento: AgendamentoType = {
      id: Date.now().toString(),
      barbeiroId: barbeiroSelecionado,
      servicoId: servicoSelecionado,
      data: diaSelecionado,
      horario: horarioSelecionado,
      clienteNome: dadosCliente.nome,
      clienteTelefone: dadosCliente.telefone,
      clienteEmail: dadosCliente.email,
      observacoes: dadosCliente.observacoes
    }

    // Salvar no localStorage (em produção, enviaria para um backend)
    const agendamentos = JSON.parse(localStorage.getItem('agendamentos') || '[]')
    agendamentos.push(novoAgendamento)
    localStorage.setItem('agendamentos', JSON.stringify(agendamentos))

    alert('Agendamento realizado com sucesso!')
    
    // Resetar formulário
    setStep(1)
    setBarbeiroSelecionado('')
    setServicoSelecionado('')
    setDiaSelecionado('')
    setHorarioSelecionado('')
    setDadosCliente({ nome: '', telefone: '', email: '', observacoes: '' })
  }

  return (
    <div className="agendamento-page">
      <div className="container">
        <h1>Agendar Horário</h1>
        
        <div className="steps-indicator">
          <div className={`step ${step >= 1 ? 'active' : ''}`}>
            <span>1</span> Barbeiro
          </div>
          <div className={`step ${step >= 2 ? 'active' : ''}`}>
            <span>2</span> Serviço
          </div>
          <div className={`step ${step >= 3 ? 'active' : ''}`}>
            <span>3</span> Data/Hora
          </div>
          <div className={`step ${step >= 4 ? 'active' : ''}`}>
            <span>4</span> Dados
          </div>
        </div>

        <form onSubmit={handleSubmit} className="agendamento-form">
          {/* Passo 1: Selecionar Barbeiro */}
          {step === 1 && (
            <div className="form-step">
              <h2>Selecione o Barbeiro</h2>
              <div className="barbeiros-list">
                {barbeiros.map((b) => (
                  <div
                    key={b.id}
                    className={`barbeiro-option ${barbeiroSelecionado === b.id ? 'selected' : ''}`}
                    onClick={() => {
                      setBarbeiroSelecionado(b.id)
                      setTimeout(() => setStep(2), 300)
                    }}
                  >
                    <div className="barbeiro-option-avatar">
                      <span>{b.nome.charAt(b.nome.length - 1)}</span>
                    </div>
                    <div>
                      <h3>{b.nome}</h3>
                      <p>{b.descricao}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Passo 2: Selecionar Serviço */}
          {step === 2 && barbeiro && (
            <div className="form-step">
              <h2>Selecione o Serviço</h2>
              <button
                type="button"
                className="btn-back"
                onClick={() => setStep(1)}
              >
                ← Voltar
              </button>
              <div className="servicos-list">
                {barbeiro.servicos.map((s) => (
                  <div
                    key={s.id}
                    className={`servico-option ${servicoSelecionado === s.id ? 'selected' : ''}`}
                    onClick={() => {
                      setServicoSelecionado(s.id)
                      setTimeout(() => setStep(3), 300)
                    }}
                  >
                    <div>
                      <h3>{s.nome}</h3>
                      <p>{s.descricao}</p>
                      <span className="servico-info">
                        {s.duracao} min • R$ {s.preco.toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Passo 3: Selecionar Data e Hora */}
          {step === 3 && barbeiro && (
            <div className="form-step">
              <h2>Selecione Data e Horário</h2>
              <button
                type="button"
                className="btn-back"
                onClick={() => setStep(2)}
              >
                ← Voltar
              </button>
              <div className="horarios-section">
                {barbeiro.horariosDisponiveis.map((horario) => (
                  <div key={horario.dia} className="dia-horarios">
                    <h3>{horario.dia}</h3>
                    <div className="horarios-grid">
                      {horario.horarios.map((h) => (
                        <button
                          key={h}
                          type="button"
                          className={`horario-btn ${diaSelecionado === horario.dia && horarioSelecionado === h ? 'selected' : ''}`}
                          onClick={() => {
                            setDiaSelecionado(horario.dia)
                            setHorarioSelecionado(h)
                            setTimeout(() => setStep(4), 300)
                          }}
                        >
                          {h}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Passo 4: Dados do Cliente */}
          {step === 4 && (
            <div className="form-step">
              <h2>Seus Dados</h2>
              <button
                type="button"
                className="btn-back"
                onClick={() => setStep(3)}
              >
                ← Voltar
              </button>
              
              <div className="resumo-agendamento">
                <h3>Resumo do Agendamento</h3>
                <p><strong>Barbeiro:</strong> {barbeiro?.nome}</p>
                <p><strong>Serviço:</strong> {servico?.nome} - R$ {servico?.preco.toFixed(2)}</p>
                <p><strong>Data:</strong> {diaSelecionado}</p>
                <p><strong>Horário:</strong> {horarioSelecionado}</p>
              </div>

              <div className="form-group">
                <label htmlFor="nome">Nome Completo *</label>
                <input
                  type="text"
                  id="nome"
                  required
                  value={dadosCliente.nome}
                  onChange={(e) => setDadosCliente({ ...dadosCliente, nome: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="telefone">Telefone *</label>
                <input
                  type="tel"
                  id="telefone"
                  required
                  value={dadosCliente.telefone}
                  onChange={(e) => setDadosCliente({ ...dadosCliente, telefone: e.target.value })}
                  placeholder="(00) 00000-0000"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">E-mail</label>
                <input
                  type="email"
                  id="email"
                  value={dadosCliente.email}
                  onChange={(e) => setDadosCliente({ ...dadosCliente, email: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="observacoes">Observações</label>
                <textarea
                  id="observacoes"
                  rows={4}
                  value={dadosCliente.observacoes}
                  onChange={(e) => setDadosCliente({ ...dadosCliente, observacoes: e.target.value })}
                  placeholder="Alguma observação especial?"
                />
              </div>

              <button type="submit" className="btn-submit">
                Confirmar Agendamento
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

export default Agendamento

