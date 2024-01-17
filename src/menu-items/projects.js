// assets
import { StarOutlined } from '@ant-design/icons';

// icons
const icons = {
  StarOutlined
};

// ==============================|| MENU ITEMS - PROJECTS ||============================== //

const projects = (allProjects) => {
  return {
    id: 'projects',
    title: 'Projects',
    type: 'group',
    children: allProjects.map((project) => ({
      id: project._id,
      title: project.title,
      type: 'item',
      url: `/project/${project._id}`,
      icon: icons.StarOutlined
    }))
  };
};

export default projects;
