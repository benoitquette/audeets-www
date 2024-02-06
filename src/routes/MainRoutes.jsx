import { lazy } from 'react';
import Loadable from '~/components/Loadable';
import Layout from '~/layout';
import Protected from '~/components/Protected';

const DashboardDefault = Loadable(lazy(() => import('~/pages/dashboard')));
const SettingsProjects = Loadable(lazy(() => import('~/pages/settings-projects')));
const ProjectCreate = Loadable(lazy(() => import('~/pages/settings-projects/create')));
const ProjectUpdate = Loadable(lazy(() => import('~/pages/settings-projects/update')));
const ProjectDefault = Loadable(lazy(() => import('~/pages/project')));
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
      element: <DashboardDefault />
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
          element: <ProjectDefault />
        }
      ]
    },
    {
      path: 'settings',
      children: [
        {
          path: 'projects',
          element: <SettingsProjects />
        },
        {
          path: 'projects/create',
          element: <ProjectCreate />
        },
        {
          path: 'project/:projectId/update',
          element: <ProjectUpdate />
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
    },
    {
      path: 'dashboard',
      element: <DashboardDefault />
    }
  ]
};

export default MainRoutes;
