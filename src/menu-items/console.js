// assets
import { ProfileOutlined } from '@ant-design/icons';

// icons
const icons = {
  ProfileOutlined
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
      icon: icons.ProfileOutlined,
      breadcrumbs: false
    }
  ]
};

export default console;
