import { lazy } from 'react';

// project import
import Loadable from '~/components/Loadable';
import Layout from '~/layout';
import Protected from '~/components/Protected';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('~/pages/dashboard')));

// render - settings project
const SettingsProjects = Loadable(lazy(() => import('~/pages/settings-projects')));
const ProjectCreate = Loadable(lazy(() => import('~/pages/settings-projects/create')));

// render - project
const ProjectDefault = Loadable(lazy(() => import('~/pages/project')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('~/pages/extra-pages/SamplePage')));

// render - utilities
const Typography = Loadable(lazy(() => import('~/pages/components-overview/Typography')));
const Color = Loadable(lazy(() => import('~/pages/components-overview/Color')));
const Shadow = Loadable(lazy(() => import('~/pages/components-overview/Shadow')));
const AntIcons = Loadable(lazy(() => import('~/pages/components-overview/AntIcons')));

// ==============================|| MAIN ROUTING ||============================== //

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
