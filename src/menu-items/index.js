import projects from './projects';
import dashboard from './dashboard';

const menuItems = (allProjects) => {
  return {
    items: [dashboard, projects(allProjects)]
  };
};

export default menuItems;
