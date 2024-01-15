// project import
import pages from './pages';
import projects from './projects';
import console from './console';
import utilities from './utilities';
import support from './support';

// ==============================|| MENU ITEMS ||============================== //

const menuItems = (allProjects) => {
  return {
    items: [console, projects(allProjects), pages, utilities, support]
  };
};

export default menuItems;
