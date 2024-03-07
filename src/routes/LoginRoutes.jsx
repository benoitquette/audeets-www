import { lazy } from 'react';
import Loadable from '~/components/Loadable';
const Login = Loadable(lazy(() => import('~/pages/login/LoginPage')));

const LoginRoutes = {
  path: '/login',
  element: <Login />
};

export default LoginRoutes;
