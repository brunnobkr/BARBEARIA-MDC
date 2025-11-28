import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Navbar.css'

const Navbar = () => {
  const location = useLocation()
  const { isBarbeiroAuthenticated, isClienteAuthenticated, cliente, logoutCliente, logoutBarbeiro } = useAuth()

  const handleLogout = () => {
    if (isClienteAuthenticated) {
      logoutCliente()
    }
    if (isBarbeiroAuthenticated) {
      logoutBarbeiro()
    }
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="navbar-logo-text">BARBEARIA MDC</span>
        </Link>
        <div className="navbar-menu">
          <Link 
            to="/" 
            className={`navbar-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            Início
          </Link>
          <Link 
            to="/agendamento" 
            className={`navbar-link ${location.pathname === '/agendamento' ? 'active' : ''}`}
          >
            Agendar
          </Link>
          <Link 
            to="/produtos" 
            className={`navbar-link ${location.pathname === '/produtos' ? 'active' : ''}`}
          >
            Produtos
          </Link>
          {isBarbeiroAuthenticated && (
            <Link 
              to="/dashboard" 
              className={`navbar-link ${location.pathname === '/dashboard' ? 'active' : ''}`}
            >
              Dashboard
            </Link>
          )}
          {isClienteAuthenticated ? (
            <>
              <Link 
                to="/meus-agendamentos" 
                className={`navbar-link ${location.pathname === '/meus-agendamentos' ? 'active' : ''}`}
              >
                Agendamentos
              </Link>
              <Link 
                to="/meus-pedidos" 
                className={`navbar-link ${location.pathname === '/meus-pedidos' ? 'active' : ''}`}
              >
                Pedidos
              </Link>
              <span className="navbar-user">Olá, {cliente?.nome.split(' ')[0]}</span>
              <button onClick={handleLogout} className="navbar-link btn-logout-nav">
                Sair
              </button>
            </>
          ) : (
            <Link 
              to="/login-cliente" 
              className={`navbar-link ${location.pathname === '/login-cliente' ? 'active' : ''}`}
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar

