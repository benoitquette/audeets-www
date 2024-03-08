import { lazy } from 'react';
import Loadable from '~/components/Loadable/Loadable';
const Login = Loadable(lazy(() => import('~/pages/login/LoginPage')));

const LoginRoutes = {
  path: '/login',
  element: <Login />
};

export default LoginRoutes;
