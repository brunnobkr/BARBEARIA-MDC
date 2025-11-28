import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './LoginCliente.css'

const LoginCliente = () => {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [loading, setLoading] = useState(false)
  const { loginCliente } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setErro('')
    setLoading(true)

    setTimeout(() => {
      const sucesso = loginCliente(email, senha)

      if (sucesso) {
        navigate('/')
      } else {
        setErro('Email ou senha incorretos')
        setLoading(false)
      }
    }, 500)
  }

  return (
    <div className="login-cliente-page">
      <div className="login-cliente-container">
        <div className="login-cliente-header">
          <h1>🪒 Barbearia MDC</h1>
          <p>Login Cliente</p>
        </div>

        <form onSubmit={handleSubmit} className="login-cliente-form">
          {erro && (
            <div className="login-cliente-error">
              {erro}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
              autoComplete="email"
              autoFocus
            />
          </div>

          <div className="form-group">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="••••••••"
              required
              autoComplete="current-password"
            />
          </div>

          <button 
            type="submit" 
            className="btn-login-cliente"
            disabled={loading}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <div className="login-cliente-footer">
          <p>
            Não tem uma conta?{' '}
            <Link to="/cadastro" className="link-cadastro">
              Criar Conta
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginCliente

