import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { barbeiros } from '../data/barbeiros'
import { produtos as produtosIniciais } from '../data/produtos'
import { Agendamento, Produto } from '../types'
import './Dashboard.css'

const Dashboard = () => {
  const { barbeiro, logout } = useAuth()
  const navigate = useNavigate()
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([])
  const [activeTab, setActiveTab] = useState<'agendamentos' | 'servicos' | 'horarios' | 'produtos'>('agendamentos')
  const [barbeiroData, setBarbeiroData] = useState(barbeiros.find(b => b.id === barbeiro?.id))
  const [produtos, setProdutos] = useState<Produto[]>(produtosIniciais)

  useEffect(() => {
    if (!barbeiro) {
      navigate('/login')
      return
    }

    // Carregar agendamentos do localStorage
    const agendamentosSalvos = JSON.parse(localStorage.getItem('agendamentos') || '[]')
    const agendamentosBarbeiro = agendamentosSalvos.filter(
      (a: Agendamento) => a.barbeiroId === barbeiro.id
    )
    setAgendamentos(agendamentosBarbeiro)

    // Carregar dados do barbeiro (primeiro tenta carregar edições salvas)
    const barbeirosEditados = JSON.parse(localStorage.getItem('barbeirosEditados') || '{}')
    const dadosEditados = barbeirosEditados[barbeiro.id]
    
    if (dadosEditados) {
      setBarbeiroData(dadosEditados)
    } else {
      // Se não houver edições, usa os dados padrão
      const dados = barbeiros.find(b => b.id === barbeiro.id)
      if (dados) {
        setBarbeiroData(dados)
      }
    }

    // Carregar produtos editados
    const produtosEditados = JSON.parse(localStorage.getItem('produtosEditados') || '[]')
    if (produtosEditados.length > 0) {
      setProdutos(produtosEditados)
    } else {
      setProdutos(produtosIniciais)
    }
  }, [barbeiro, navigate])

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const updateServico = (servicoId: string, campo: 'preco' | 'duracao', valor: number) => {
    if (!barbeiroData || !barbeiro) return

    const servicosAtualizados = barbeiroData.servicos.map(s => {
      if (s.id === servicoId) {
        return { ...s, [campo]: valor }
      }
      return s
    })

    const barbeiroAtualizado = { ...barbeiroData, servicos: servicosAtualizados }
    setBarbeiroData(barbeiroAtualizado)

    // Salvar alterações no localStorage (em produção, isso seria uma API)
    const barbeirosSalvos = JSON.parse(localStorage.getItem('barbeirosEditados') || '{}')
    barbeirosSalvos[barbeiro.id] = barbeiroAtualizado
    localStorage.setItem('barbeirosEditados', JSON.stringify(barbeirosSalvos))
  }

  const updateProduto = (produtoId: string, campo: 'nome' | 'preco' | 'estoque', valor: string | number) => {
    const produtosAtualizados = produtos.map(p => {
      if (p.id === produtoId) {
        return { ...p, [campo]: valor }
      }
      return p
    })

    setProdutos(produtosAtualizados)
    // Salvar alterações no localStorage
    localStorage.setItem('produtosEditados', JSON.stringify(produtosAtualizados))
  }

  const formatarData = (data: string) => {
    return data || 'Data não especificada'
  }

  const formatarPreco = (preco: number) => {
    return `R$ ${preco.toFixed(2)}`
  }

  if (!barbeiro || !barbeiroData) {
    return null
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div className="dashboard-header-content">
          <div>
            <h1>Olá, {barbeiro.nome.split(' ')[1]}!</h1>
            <p>Painel de Controle</p>
          </div>
          <button onClick={handleLogout} className="btn-logout">
            Sair
          </button>
        </div>
      </div>

      <div className="dashboard-tabs">
        <button
          className={`tab ${activeTab === 'agendamentos' ? 'active' : ''}`}
          onClick={() => setActiveTab('agendamentos')}
        >
          📅 Agendamentos ({agendamentos.length})
        </button>
        <button
          className={`tab ${activeTab === 'servicos' ? 'active' : ''}`}
          onClick={() => setActiveTab('servicos')}
        >
          ✂️ Serviços
        </button>
        <button
          className={`tab ${activeTab === 'horarios' ? 'active' : ''}`}
          onClick={() => setActiveTab('horarios')}
        >
          ⏰ Horários
        </button>
        <button
          className={`tab ${activeTab === 'produtos' ? 'active' : ''}`}
          onClick={() => setActiveTab('produtos')}
        >
          🛍️ Produtos
        </button>
      </div>

      <div className="dashboard-content">
        {activeTab === 'agendamentos' && (
          <div className="tab-content">
            <h2>Agendamentos</h2>
            {agendamentos.length === 0 ? (
              <div className="empty-state">
                <p>Nenhum agendamento encontrado</p>
              </div>
            ) : (
              <div className="agendamentos-list">
                {agendamentos.map((agendamento) => {
                  const servico = barbeiroData.servicos.find(s => s.id === agendamento.servicoId)
                  return (
                    <div key={agendamento.id} className="agendamento-card">
                      <div className="agendamento-header">
                        <h3>{agendamento.clienteNome}</h3>
                        <span className="agendamento-status">Agendado</span>
                      </div>
                      <div className="agendamento-info">
                        <p><strong>Serviço:</strong> {servico?.nome || 'N/A'}</p>
                        <p><strong>Data:</strong> {formatarData(agendamento.data)}</p>
                        <p><strong>Horário:</strong> {agendamento.horario}</p>
                        <p><strong>Telefone:</strong> {agendamento.clienteTelefone}</p>
                        {agendamento.clienteEmail && (
                          <p><strong>Email:</strong> {agendamento.clienteEmail}</p>
                        )}
                        {agendamento.observacoes && (
                          <p><strong>Observações:</strong> {agendamento.observacoes}</p>
                        )}
                        {servico && (
                          <p className="agendamento-preco">
                            <strong>Valor:</strong> {formatarPreco(servico.preco)}
                          </p>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {activeTab === 'servicos' && (
          <div className="tab-content">
            <h2>Gerenciar Serviços</h2>
            <div className="servicos-edit-list">
              {barbeiroData.servicos.map((servico) => (
                <div key={servico.id} className="servico-edit-card">
                  <h3>{servico.nome}</h3>
                  <p className="servico-descricao">{servico.descricao}</p>
                  
                  <div className="servico-edit-fields">
                    <div className="edit-field">
                      <label>Preço (R$)</label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={servico.preco}
                        onChange={(e) => updateServico(servico.id, 'preco', parseFloat(e.target.value) || 0)}
                      />
                    </div>
                    
                    <div className="edit-field">
                      <label>Tempo (minutos)</label>
                      <input
                        type="number"
                        step="1"
                        min="1"
                        value={servico.duracao}
                        onChange={(e) => updateServico(servico.id, 'duracao', parseInt(e.target.value) || 1)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'horarios' && (
          <div className="tab-content">
            <h2>Horários Disponíveis</h2>
            <div className="horarios-edit-list">
              {barbeiroData.horariosDisponiveis.map((horario) => (
                <div key={horario.dia} className="horario-edit-card">
                  <h3>{horario.dia}</h3>
                  <div className="horarios-badges">
                    {horario.horarios.map((h) => (
                      <span key={h} className="horario-badge">{h}</span>
                    ))}
                  </div>
                  <p className="horario-info">
                    {horario.horarios.length} horários disponíveis
                  </p>
                </div>
              ))}
            </div>
            <div className="info-box">
              <p>💡 Para editar horários, entre em contato com o administrador.</p>
            </div>
          </div>
        )}

        {activeTab === 'produtos' && (
          <div className="tab-content">
            <h2>Gerenciar Produtos</h2>
            <div className="produtos-edit-list">
              {produtos.map((produto) => (
                <div key={produto.id} className="produto-edit-card">
                  <div className="produto-edit-header">
                    <div className="produto-categoria-badge">
                      {produto.categoria === 'cabelo' && '✂️'}
                      {produto.categoria === 'barba' && '🧔'}
                      {produto.categoria === 'tratamento' && '💊'}
                    </div>
                    <h3>{produto.nome}</h3>
                  </div>
                  <p className="produto-descricao">{produto.descricao}</p>
                  
                  <div className="produto-edit-fields">
                    <div className="edit-field full-width">
                      <label>Nome do Produto</label>
                      <input
                        type="text"
                        value={produto.nome}
                        onChange={(e) => updateProduto(produto.id, 'nome', e.target.value)}
                        placeholder="Nome do produto"
                      />
                    </div>
                    
                    <div className="edit-field">
                      <label>Preço (R$)</label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={produto.preco}
                        onChange={(e) => updateProduto(produto.id, 'preco', parseFloat(e.target.value) || 0)}
                      />
                    </div>
                    
                    <div className="edit-field">
                      <label>Estoque</label>
                      <input
                        type="number"
                        step="1"
                        min="0"
                        value={produto.estoque}
                        onChange={(e) => updateProduto(produto.id, 'estoque', parseInt(e.target.value) || 0)}
                      />
                    </div>
                  </div>

                  <div className="produto-estoque-info">
                    <span className={`estoque-badge ${produto.estoque === 0 ? 'sem-estoque' : produto.estoque < 5 ? 'estoque-baixo' : 'estoque-ok'}`}>
                      {produto.estoque === 0 ? 'Sem estoque' : produto.estoque < 5 ? 'Estoque baixo' : 'Em estoque'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard

