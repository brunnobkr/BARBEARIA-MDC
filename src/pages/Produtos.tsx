import { useState } from 'react'
import { produtos } from '../data/produtos'
import { Produto } from '../types'
import './Produtos.css'

const Produtos = () => {
  const [categoriaFiltro, setCategoriaFiltro] = useState<'todos' | 'cabelo' | 'barba' | 'tratamento'>('todos')

  const produtosFiltrados = categoriaFiltro === 'todos' 
    ? produtos 
    : produtos.filter(p => p.categoria === categoriaFiltro)

  const categorias = [
    { id: 'todos', nome: 'Todos', emoji: '🛍️' },
    { id: 'cabelo', nome: 'Cabelo', emoji: '✂️' },
    { id: 'barba', nome: 'Barba', emoji: '🧔' },
    { id: 'tratamento', nome: 'Tratamento', emoji: '💊' }
  ]

  const handleComprar = (produto: Produto) => {
    alert(`Produto "${produto.nome}" adicionado!\n\nEntre em contato conosco para finalizar a compra.`)
  }

  return (
    <div className="produtos-page">
      <div className="container">
        <h1>Nossos Produtos</h1>
        <p className="page-subtitle">
          Produtos de qualidade para cuidar do seu cabelo e barba
        </p>

        <div className="filtros">
          {categorias.map((cat) => (
            <button
              key={cat.id}
              className={`filtro-btn ${categoriaFiltro === cat.id ? 'active' : ''}`}
              onClick={() => setCategoriaFiltro(cat.id as any)}
            >
              <span className="filtro-emoji">{cat.emoji}</span>
              <span>{cat.nome}</span>
            </button>
          ))}
        </div>

        <div className="produtos-grid">
          {produtosFiltrados.map((produto) => (
            <div key={produto.id} className="produto-card">
              <div className="produto-header">
                <h3>{produto.nome}</h3>
                <span className="produto-categoria">
                  {produto.categoria === 'cabelo' && '✂️'}
                  {produto.categoria === 'barba' && '🧔'}
                  {produto.categoria === 'tratamento' && '💊'}
                </span>
              </div>
              <p className="produto-descricao">{produto.descricao}</p>
              <div className="produto-footer">
                <span className="produto-preco">R$ {produto.preco.toFixed(2)}</span>
                <button 
                  className="btn-comprar"
                  onClick={() => handleComprar(produto)}
                >
                  Comprar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Produtos
