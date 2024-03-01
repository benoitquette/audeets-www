import { lazy } from 'react';
import Loadable from '~/components/Loadable';
import Layout from '~/layout';
import Protected from '~/components/Protected';

const Dashboard = Loadable(lazy(() => import('~/pages/dashboard/Dashboard')));
const ProjectCreate = Loadable(lazy(() => import('~/pages/dashboard/create/ProjectCreate')));
const ProjectUpdate = Loadable(lazy(() => import('~/pages/dashboard/update/ProjectUpdate')));
const ProjectPage = Loadable(lazy(() => import('~/pages/project/ProjectPage')));
const SamplePage = Loadable(lazy(() => import('~/pages/extra-pages/SamplePage')));
const Typography = Loadable(lazy(() => import('~/pages/components-overview/Typography')));
const Color = Loadable(lazy(() => import('~/pages/components-overview/Color')));
const Shadow = Loadable(lazy(() => import('~/pages/components-overview/Shadow')));
const AntIcons = Loadable(lazy(() => import('~/pages/components-overview/AntIcons')));

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
      path: 'color',
      element: <Color />
    },
    {
      path: 'project',
      children: [
        {
          path: ':projectId',
          element: <ProjectPage />
        }
      ]
    },
    {
      path: 'sample-page',
      element: <SamplePage />
    },
    {
      path: 'shadow',
      element: <Shadow />
    },
    {
      path: 'typography',
      element: <Typography />
    },
    {
      path: 'icons/ant',
      element: <AntIcons />
    }
  ]
};

export default MainRoutes;
