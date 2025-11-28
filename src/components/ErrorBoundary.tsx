import { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (import.meta.env.DEV) {
      console.error('Erro capturado:', error, errorInfo)
    }
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '2rem 1rem',
          textAlign: 'center',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#f5f5f5'
        }}>
          <h1 style={{ color: '#c41e3a', marginBottom: '1rem', fontSize: '1.5rem' }}>Ops! Algo deu errado</h1>
          <p style={{ color: '#666', marginBottom: '2rem', fontSize: '1rem' }}>
            Ocorreu um erro ao carregar a página. Por favor, recarregue a página.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '1rem 2rem',
              backgroundColor: '#d4af37',
              color: '#1a1a1a',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              minHeight: '48px'
            }}
          >
            Recarregar Página
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
