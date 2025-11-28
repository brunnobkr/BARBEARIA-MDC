import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Navbar.css'

const Navbar = () => {
  const location = useLocation()
  const { isAuthenticated } = useAuth()

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
          {isAuthenticated && (
            <Link 
              to="/dashboard" 
              className={`navbar-link ${location.pathname === '/dashboard' ? 'active' : ''}`}
            >
              Dashboard
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
