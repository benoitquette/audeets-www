// assets
import { ProjectOutlined } from '@ant-design/icons';

// icons
const icons = {
  ProjectOutlined
};

// ==============================|| MENU ITEMS - SETTINGS ||============================== //

const settings = {
  id: 'group-settings',
  title: 'Settings',
  type: 'group',
  children: [
    {
      id: 'projects',
      title: 'Projects',
      type: 'item',
      url: '/settings/projects',
      icon: icons.ProjectOutlined,
      breadcrumbs: false
    }
  ]
};

export default settings;
