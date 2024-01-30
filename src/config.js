// ==============================|| THEME CONFIG  ||============================== //

const config = {
  defaultPath: '/',
  fontFamily: `'Public Sans', sans-serif`,
  i18n: 'en',
  miniDrawer: false,
  container: true,
  mode: 'light',
  presetColor: 'default',
  themeDirection: 'ltr'
};

export default config;
export const drawerWidth = 260;

export const twitterColor = '#1DA1F2';
export const facebookColor = '#3b5998';
export const linkedInColor = '#0e76a8';

export const urlApiProjects = import.meta.env.VITE_URL_API_PROJECTS ? import.meta.env.VITE_URL_API_PROJECTS : apiProjectsUrl;
export const urlApiUsers = import.meta.env.VITE_URL_API_USERS ? import.meta.env.VITE_URL_API_USERS : apiUsersUrl;
