// project import
import pages from './pages';
import projects from './projects';
import dashboard from './dashboard';
import utilities from './utilities';
import support from './support';

// ==============================|| MENU ITEMS ||============================== //

const menuItems = (allProjects) => {
  return {
    items: [dashboard, projects(allProjects), pages, utilities, support]
  };
};

export default menuItems;
