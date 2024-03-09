import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import { fetchUser } from '~/store/reducers/user';
import { sessionCookieName } from '~/config';

const Protected = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, status } = useSelector((state) => state.user);
  const sessionCookie = Cookies.get(sessionCookieName);

  if (status === 'failed') Cookies.remove(sessionCookieName);

  useEffect(() => {
    if (!sessionCookie) {
      navigate(`/login?returnTo=${location.pathname}`);
    } else if (!user && ['succeeded', 'idle'].includes(status)) {
      dispatch(fetchUser());
    }
  }, [dispatch, location.pathname, navigate, sessionCookie, status, user]);

  if (user) return children;
};

Protected.propTypes = {
  children: PropTypes.node
};

export default Protected;
