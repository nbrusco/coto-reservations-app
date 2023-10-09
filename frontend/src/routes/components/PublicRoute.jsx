import PropTypes from 'prop-types'
import { Navigate, Outlet } from 'react-router-dom'

const PublicRoute = ({ user, redirectPath = '/', children }) => {
  if (user) {
    return <Navigate to={redirectPath} replace />
  }

  return children || <Outlet />
}

export default PublicRoute

PublicRoute.propTypes = {
  children: PropTypes.node,
  user: PropTypes.object,
  redirectPath: PropTypes.string
}
