import { PropTypes } from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useAuth } from 'components/auth/index';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.object.isRequired
};

export default ProtectedRoute;
