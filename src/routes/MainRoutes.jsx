import { lazy } from 'react';
import Loadable from '~/components/Loadable';
import Layout from '~/layout/Layout';
import Protected from '~/components/Protected';

const Dashboard = Loadable(lazy(() => import('~/pages/dashboard/Dashboard')));
const ProjectCreate = Loadable(lazy(() => import('~/pages/dashboard/create/ProjectCreate')));
const ProjectUpdate = Loadable(lazy(() => import('~/pages/dashboard/update/ProjectUpdate')));
const ProjectPage = Loadable(lazy(() => import('~/pages/project/ProjectPage')));

const MainRoutes = {
  path: '/',
  element: (
    <Protected>
      <Layout />
    </Protected>
  ),
  children: [
    {
      path: '/',
      children: [
        {
          path: '',
          element: <Dashboard />
        },
        {
          path: 'create',
          element: <ProjectCreate />
        },
        {
          path: ':projectId/update',
          element: <ProjectUpdate />
        }
      ]
    },
    {
      path: 'project',
      children: [
        {
          path: ':projectId',
          element: <ProjectPage />
        }
      ]
    }
  ]
};

export default MainRoutes;
