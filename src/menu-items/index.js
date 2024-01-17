// project import
import pages from './pages';
import projects from './projects';
import dashboard from './dashboard';
import utilities from './utilities';
import support from './support';
import settings from './settings';

// ==============================|| MENU ITEMS ||============================== //

const menuItems = (allProjects) => {
  return {
    items: [dashboard, projects(allProjects), settings, pages, utilities, support]
  };
};

export default menuItems;
