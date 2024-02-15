import { red, orange, green } from '@mui/material/colors';

export default {
  defaultPath: '/',
  fontFamily: `'Public Sans', sans-serif`,
  i18n: 'en',
  miniDrawer: false,
  container: true,
  mode: 'light',
  presetColor: 'default',
  themeDirection: 'ltr'
};

export const drawerWidth = 260;

export const urlApiProjects = import.meta.env.VITE_URL_API_PROJECTS ? import.meta.env.VITE_URL_API_PROJECTS : apiProjectsUrl;
export const urlApiUsers = import.meta.env.VITE_URL_API_USERS ? import.meta.env.VITE_URL_API_USERS : apiUsersUrl;

export const severities = [
  { from: 0, color: red },
  { from: 50, color: orange },
  { from: 80, color: green }
];

export const getColorFromScore = (score) => {
  let res = null;
  for (const severity of severities) {
    if (score >= severity.from) res = severity.color;
  }
  return res;
};
