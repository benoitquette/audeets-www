// assets
import { SafetyOutlined } from '@ant-design/icons';

// icons
const icons = {
  SafetyOutlined
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
      icon: icons.SafetyOutlined
    }))
  };
};

export default projects;
