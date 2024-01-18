// project import
import pages from './pages';
import projects from './projects';
import dashboard from './dashboard';
import utilities from './utilities';
import settings from './settings';

// ==============================|| MENU ITEMS ||============================== //

const menuItems = (allProjects) => {
  return {
    items: [dashboard, projects(allProjects), settings, pages, utilities]
  };
};

export default menuItems;
