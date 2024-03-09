import { red, orange, green, purple, indigo, blue, deepPurple } from '@mui/material/colors';
import SettingsAccessibilityIcon from '@mui/icons-material/SettingsAccessibility';
import SpeedIcon from '@mui/icons-material/Speed';
import TroubleshootIcon from '@mui/icons-material/Troubleshoot';
import SecurityIcon from '@mui/icons-material/Security';

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

export const urlApiProjects = import.meta.env.VITE_URL_API_PROJECTS ?? apiProjectsUrl;
export const urlApiUsers = import.meta.env.VITE_URL_API_USERS ?? apiUsersUrl;

export const severities = [
  { from: 0, color: red, name: 'bad' },
  { from: 50, color: orange, name: 'warning' },
  { from: 80, color: green, name: 'good' }
];

export const getColorFromScore = (score) => {
  let res = null;
  for (const severity of severities) {
    if (score >= severity.from) res = severity.color;
  }
  return res;
};

export const getSeverityFromScore = (score) => {
  let res = null;
  for (const severity of severities) {
    if (score >= severity.from) res = severity;
  }
  return res;
};

export const categoriesTheme = {
  Accessibility: {
    color: deepPurple,
    icon: <SettingsAccessibilityIcon />
  },
  Performance: {
    color: purple,
    icon: <SpeedIcon />
  },
  Search: {
    color: indigo,
    icon: <TroubleshootIcon />
  },
  Security: {
    color: blue,
    icon: <SecurityIcon />
  }
};

export const cookieName = import.meta.env.VITE_COOKIE_NAME || cookieName;
