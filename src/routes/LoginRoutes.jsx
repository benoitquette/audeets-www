import { lazy } from 'react';

// project import
import Loadable from '~/components/Loadable';
import MinimalLayout from '~/layout/MinimalLayout';

// render - login
const Login = Loadable(lazy(() => import('~/pages/login')));

// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: 'login',
      element: <Login />
    }
  ]
};

export default LoginRoutes;
