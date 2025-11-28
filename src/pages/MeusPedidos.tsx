import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { Compra, CompraProduto } from '../types'
import './MeusPedidos.css'

const MeusPedidos = () => {
  const { cliente, isClienteAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [compras, setCompras] = useState<Compra[]>([])
  const [carrinho, setCarrinho] = useState<CompraProduto[]>([])

  useEffect(() => {
    if (!isClienteAuthenticated) {
      navigate('/login-cliente')
      return
    }

    // Carregar compras do cliente
    const comprasSalvas = JSON.parse(localStorage.getItem('compras') || '[]')
    const comprasCliente = comprasSalvas.filter(
      (c: Compra) => c.clienteId === cliente?.id && c.status !== 'cancelado'
    )
    setCompras(comprasCliente)

    // Carregar carrinho
    const carrinhoSalvo = JSON.parse(localStorage.getItem('carrinho') || '[]')
    setCarrinho(carrinhoSalvo)
  }, [cliente, isClienteAuthenticated, navigate])

  const finalizarCompra = () => {
    if (carrinho.length === 0) {
      alert('Seu carrinho está vazio!')
      return
    }

    const total = carrinho.reduce((sum, item) => sum + (item.preco * item.quantidade), 0)

    const novaCompra: Compra = {
      id: Date.now().toString(),
      clienteId: cliente!.id,
      produtos: [...carrinho],
      total,
      status: 'pendente',
      dataCriacao: new Date().toISOString()
    }

    const comprasSalvas = JSON.parse(localStorage.getItem('compras') || '[]')
    comprasSalvas.push(novaCompra)
    localStorage.setItem('compras', JSON.stringify(comprasSalvas))

    // Limpar carrinho
    localStorage.removeItem('carrinho')
    setCarrinho([])
    setCompras([...compras, novaCompra])

    alert(`Pedido realizado! Total: R$ ${total.toFixed(2)}\n\nO pagamento será feito na barbearia ou com o barbeiro.`)
  }

  const cancelarCompra = (compraId: string) => {
    if (!confirm('Tem certeza que deseja cancelar este pedido?')) return

    const comprasSalvas = JSON.parse(localStorage.getItem('compras') || '[]')
    const comprasAtualizadas = comprasSalvas.map((c: Compra) => {
      if (c.id === compraId) {
        return { ...c, status: 'cancelado' as const }
      }
      return c
    })

    localStorage.setItem('compras', JSON.stringify(comprasAtualizadas))

    // Atualizar lista
    const comprasCliente = comprasAtualizadas.filter(
      (c: Compra) => c.clienteId === cliente?.id && c.status !== 'cancelado'
    )
    setCompras(comprasCliente)

    alert('Pedido cancelado com sucesso!')
  }

  const removerDoCarrinho = (produtoId: string) => {
    const carrinhoAtualizado = carrinho.filter(item => item.produtoId !== produtoId)
    setCarrinho(carrinhoAtualizado)
    localStorage.setItem('carrinho', JSON.stringify(carrinhoAtualizado))
  }

  const formatarPreco = (preco: number) => {
    return `R$ ${preco.toFixed(2)}`
  }

  if (!cliente) {
    return null
  }

  const totalCarrinho = carrinho.reduce((sum, item) => sum + (item.preco * item.quantidade), 0)

  return (
    <div className="meus-pedidos-page">
      <div className="container">
        <h1>Meus Pedidos</h1>

        {/* Carrinho */}
        {carrinho.length > 0 && (
          <div className="carrinho-section">
            <h2>Carrinho</h2>
            <div className="carrinho-list">
              {carrinho.map((item) => (
                <div key={item.produtoId} className="carrinho-item">
                  <div className="carrinho-item-info">
                    <h3>{item.nome}</h3>
                    <p>{item.quantidade}x {formatarPreco(item.preco)}</p>
                    <p className="carrinho-item-total">
                      Total: {formatarPreco(item.preco * item.quantidade)}
                    </p>
                  </div>
                  <button
                    className="btn-remover"
                    onClick={() => removerDoCarrinho(item.produtoId)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
            <div className="carrinho-footer">
              <div className="carrinho-total">
                <strong>Total: {formatarPreco(totalCarrinho)}</strong>
              </div>
              <button className="btn-finalizar" onClick={finalizarCompra}>
                Finalizar Pedido
              </button>
              <p className="carrinho-info">
                💳 O pagamento será feito na barbearia ou com o barbeiro
              </p>
            </div>
          </div>
        )}

        {/* Pedidos */}
        <h2>Meus Pedidos</h2>
        {compras.length === 0 ? (
          <div className="empty-state">
            <p>Você não possui pedidos no momento.</p>
            <button
              className="btn-comprar"
              onClick={() => navigate('/produtos')}
            >
              Ver Produtos
            </button>
          </div>
        ) : (
          <div className="pedidos-list">
            {compras.map((compra) => (
              <div key={compra.id} className="pedido-card">
                <div className="pedido-header">
                  <div>
                    <h3>Pedido #{compra.id.slice(-6)}</h3>
                    <p className="pedido-data">
                      {new Date(compra.dataCriacao).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <span className={`pedido-status ${compra.status}`}>
                    {compra.status === 'pendente' && 'Pendente'}
                    {compra.status === 'concluido' && 'Concluído'}
                  </span>
                </div>

                <div className="pedido-produtos">
                  {compra.produtos.map((produto, index) => (
                    <div key={index} className="pedido-produto-item">
                      <span>{produto.quantidade}x {produto.nome}</span>
                      <span>{formatarPreco(produto.preco * produto.quantidade)}</span>
                    </div>
                  ))}
                </div>

                <div className="pedido-footer">
                  <div className="pedido-total">
                    <strong>Total: {formatarPreco(compra.total)}</strong>
                  </div>
                  {compra.status === 'pendente' && (
                    <button
                      className="btn-cancelar-pedido"
                      onClick={() => cancelarCompra(compra.id)}
                    >
                      Cancelar Pedido
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default MeusPedidos

