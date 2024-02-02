import { lazy } from 'react';

// project import
import Loadable from '~/components/Loadable';

// render - login
const Login = Loadable(lazy(() => import('~/pages/login')));

// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
  path: '/login',
  element: <Login />
};

export default LoginRoutes;
