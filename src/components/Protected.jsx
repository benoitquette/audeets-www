import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// third party
import Cookies from 'js-cookie';

// project import
import { fetchUser } from '~/store/reducers/user';

// ==============================|| AUTHENTICATION ||============================== //

const Protected = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, status } = useSelector((state) => state.user);
  const sessionCookie = Cookies.get('connect.sid');
  console.log({
    user,
    status,
    sessionCookie
  });

  useEffect(() => {
    if (!sessionCookie) {
      navigate(`/login?returnTo=${location.pathname}`);
    } else if (!user && ['succeeded', 'idle'].includes(status)) {
      dispatch(fetchUser());
    }
  }, [dispatch, location.pathname, navigate, sessionCookie, status, user]);

  if (!user) {
    return 'loading user';
  } else {
    console.log('user is here!');
    return children;
  }
};

Protected.propTypes = {
  children: PropTypes.node
};

export default Protected;
