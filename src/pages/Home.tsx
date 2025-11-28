import { Link } from 'react-router-dom'
import { barbeiros } from '../data/barbeiros'
import './Home.css'

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Bem-vindo à Barbearia MDC</h1>
          <p>Estilo, qualidade e tradição em cada corte</p>
          <Link to="/agendamento" className="btn-primary">
            Agendar Horário
          </Link>
        </div>
      </section>

      <section className="barbeiros-section">
        <div className="container">
          <h2>Nossos Barbeiros</h2>
          <div className="barbeiros-grid">
            {barbeiros.map((barbeiro) => (
              <Link
                key={barbeiro.id}
                to={`/barbeiro/${barbeiro.id}`}
                className="barbeiro-card"
              >
                <div className="barbeiro-avatar">
                  <span>{barbeiro.nome.charAt(barbeiro.nome.length - 1)}</span>
                </div>
                <h3>{barbeiro.nome}</h3>
                <p>{barbeiro.descricao}</p>
                <div className="barbeiro-stats">
                  {barbeiro.servicos.length} Serviços
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="servicos-section">
        <div className="container">
          <h2>Nossos Serviços</h2>
          <div className="servicos-grid">
            <div className="servico-item">
              <div className="servico-icon">✂️</div>
              <h3>Corte Social</h3>
              <p>Corte clássico e elegante</p>
            </div>
            <div className="servico-item">
              <div className="servico-icon">🎨</div>
              <h3>Corte Degradê</h3>
              <p>Degradê moderno e estiloso</p>
            </div>
            <div className="servico-item">
              <div className="servico-icon">🧔</div>
              <h3>Barba</h3>
              <p>Aparar e modelar barba</p>
            </div>
            <div className="servico-item">
              <div className="servico-icon">👁️</div>
              <h3>Sobrancelha</h3>
              <p>Design e modelagem</p>
            </div>
            <div className="servico-item">
              <div className="servico-icon">🎨</div>
              <h3>Pintura de Cabelo</h3>
              <p>Coloração completa</p>
            </div>
            <div className="servico-item">
              <div className="servico-icon">✨</div>
              <h3>Luzes</h3>
              <p>Aplicação de luzes</p>
            </div>
            <div className="servico-item">
              <div className="servico-icon">⚪</div>
              <h3>Descolorimento</h3>
              <p>Descolorimento completo</p>
            </div>
            <div className="servico-item">
              <div className="servico-icon">🧴</div>
              <h3>Limpeza de Pele</h3>
              <p>Limpeza facial profunda</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>Pronto para um novo visual?</h2>
          <p>Agende seu horário agora mesmo</p>
          <Link to="/agendamento" className="btn-primary">
            Agendar Agora
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home
