// assets
import { DashboardOutlined } from '@ant-design/icons';

// icons
const icons = {
  DashboardOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const console = {
  id: 'group-console',
  title: '',
  type: 'group',
  children: [
    {
      id: 'console',
      title: 'Console',
      type: 'item',
      url: '/console',
      icon: icons.DashboardOutlined,
      breadcrumbs: false
    }
  ]
};

export default console;
