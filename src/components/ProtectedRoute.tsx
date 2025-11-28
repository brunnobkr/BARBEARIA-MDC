import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

interface ProtectedRouteProps {
  children: React.ReactNode
  requireBarbeiro?: boolean
}

const ProtectedRoute = ({ children, requireBarbeiro = true }: ProtectedRouteProps) => {
  const { isBarbeiroAuthenticated, isClienteAuthenticated } = useAuth()

  // Rota protegida para barbeiros
  if (requireBarbeiro && !isBarbeiroAuthenticated) {
    return <Navigate to="/login" replace />
  }

  // Rota protegida para clientes (futuro)
  if (!requireBarbeiro && !isClienteAuthenticated) {
    return <Navigate to="/login-cliente" replace />
  }

  return <>{children}</>
}

export default ProtectedRoute

