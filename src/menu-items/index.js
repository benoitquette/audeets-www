import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';

const menuItems = (allProjects) => {
  return {
    items: [
      {
        id: 'group-dashboard',
        title: '',
        type: 'group',
        children: [
          {
            id: 'dashboard',
            title: 'Dashboard',
            type: 'item',
            url: '/',
            icon: DashboardOutlinedIcon,
            breadcrumbs: false
          }
        ]
      },
      {
        id: 'projects',
        title: 'Projects',
        type: 'group',
        children: allProjects.map((project) => ({
          id: project._id,
          title: project.title,
          type: 'item',
          url: `/project/${project._id}`,
          // icon: StarOutlined,
          breadcrumbs: false
        }))
      }
    ]
  };
};

export default menuItems;
