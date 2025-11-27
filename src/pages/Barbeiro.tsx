import { useParams, Link } from 'react-router-dom'
import { barbeiros } from '../data/barbeiros'
import './Barbeiro.css'

const Barbeiro = () => {
  const { id } = useParams<{ id: string }>()
  const barbeiro = barbeiros.find(b => b.id === id)

  if (!barbeiro) {
    return (
      <div className="barbeiro-page">
        <div className="container">
          <h1>Barbeiro não encontrado</h1>
          <Link to="/">Voltar para a página inicial</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="barbeiro-page">
      <div className="container">
        <div className="barbeiro-header">
          <div className="barbeiro-avatar-large">
            <span>{barbeiro.nome.charAt(barbeiro.nome.length - 1)}</span>
          </div>
          <div className="barbeiro-info">
            <h1>{barbeiro.nome}</h1>
            <p className="barbeiro-descricao">{barbeiro.descricao}</p>
            <Link to="/agendamento" className="btn-primary">
              Agendar com {barbeiro.nome.split(' ')[1]}
            </Link>
          </div>
        </div>

        <div className="barbeiro-content">
          <section className="servicos-section">
            <h2>Serviços Disponíveis</h2>
            <div className="servicos-grid">
              {barbeiro.servicos.map((servico) => (
                <div key={servico.id} className="servico-card">
                  <h3>{servico.nome}</h3>
                  <p>{servico.descricao}</p>
                  <div className="servico-details">
                    <span>⏱️ {servico.duracao} min</span>
                    <span className="servico-preco">R$ {servico.preco.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="horarios-section">
            <h2>Horários Disponíveis</h2>
            <div className="horarios-disponiveis">
              {barbeiro.horariosDisponiveis.map((horario) => (
                <div key={horario.dia} className="dia-card">
                  <h3>{horario.dia}</h3>
                  <div className="horarios-list">
                    {horario.horarios.map((h) => (
                      <span key={h} className="horario-badge">{h}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Barbeiro

