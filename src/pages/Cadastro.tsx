import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Cadastro.css'

const Cadastro = () => {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [telefone, setTelefone] = useState('')
  const [senha, setSenha] = useState('')
  const [confirmarSenha, setConfirmarSenha] = useState('')
  const [erro, setErro] = useState('')
  const [loading, setLoading] = useState(false)
  const { cadastrarCliente } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setErro('')

    // Validações
    if (!nome.trim()) {
      setErro('Nome é obrigatório')
      return
    }

    if (!email.trim()) {
      setErro('Email é obrigatório')
      return
    }

    if (!telefone.trim()) {
      setErro('Telefone é obrigatório')
      return
    }

    if (senha.length < 6) {
      setErro('Senha deve ter no mínimo 6 caracteres')
      return
    }

    if (senha !== confirmarSenha) {
      setErro('As senhas não coincidem')
      return
    }

    setLoading(true)

    // Simular delay
    setTimeout(() => {
      const sucesso = cadastrarCliente(nome, email, senha, telefone)

      if (sucesso) {
        navigate('/')
      } else {
        setErro('Email já cadastrado. Tente fazer login.')
        setLoading(false)
      }
    }, 500)
  }

  return (
    <div className="cadastro-page">
      <div className="cadastro-container">
        <div className="cadastro-header">
          <h1>🪒 Barbearia MDC</h1>
          <p>Criar Conta</p>
        </div>

        <form onSubmit={handleSubmit} className="cadastro-form">
          {erro && (
            <div className="cadastro-error">
              {erro}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="nome">Nome Completo *</label>
            <input
              type="text"
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Seu nome completo"
              required
              autoComplete="name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="telefone">Telefone *</label>
            <input
              type="tel"
              id="telefone"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              placeholder="(00) 00000-0000"
              required
              autoComplete="tel"
            />
          </div>

          <div className="form-group">
            <label htmlFor="senha">Senha *</label>
            <input
              type="password"
              id="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Mínimo 6 caracteres"
              required
              autoComplete="new-password"
              minLength={6}
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmarSenha">Confirmar Senha *</label>
            <input
              type="password"
              id="confirmarSenha"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              placeholder="Digite a senha novamente"
              required
              autoComplete="new-password"
              minLength={6}
            />
          </div>

          <button 
            type="submit" 
            className="btn-cadastro"
            disabled={loading}
          >
            {loading ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </form>

        <div className="cadastro-footer">
          <p>
            Já tem uma conta?{' '}
            <Link to="/login-cliente" className="link-login">
              Fazer Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Cadastro

