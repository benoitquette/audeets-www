import { StarOutlined } from '@ant-design/icons';

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
      icon: StarOutlined,
      breadcrumbs: false
    }))
  };
};

export default projects;
