import { Link } from 'react-router-dom'
import logoUrl from '../assets/logo.svg?url'
import './Navbar.css'

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src={logoUrl} alt="Barbearia MDC" className="logo-img" />
        </Link>
        <ul className="navbar-menu">
          <li>
            <Link to="/">Início</Link>
          </li>
          <li>
            <Link to="/agendamento">Agendamento</Link>
          </li>
          <li>
            <Link to="/produtos">Produtos</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar

