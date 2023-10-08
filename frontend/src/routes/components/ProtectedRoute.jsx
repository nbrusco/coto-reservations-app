import PropTypes from "prop-types";

import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const ProtectedRoute = ({ user, requiredRole, redirectPath = "/", children }) => {
  const location = useLocation();
  const [userLoaded, setUserLoaded] = useState(false);

  useEffect(() => {
    if (user) {
      setUserLoaded(true);
    }
  }, [user]);

  if (!userLoaded) {
    return null;
  }

  if (!user || (requiredRole && user.role !== requiredRole))  {
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;

ProtectedRoute.propTypes = {
  user: PropTypes.object,
  requiredRole: PropTypes.string,
  redirectPath: PropTypes.string,
  children: PropTypes.node,
};
