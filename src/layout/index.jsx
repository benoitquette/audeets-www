import { useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Toolbar, useMediaQuery } from '@mui/material';

// project import
import Drawer from './Drawer';
import Header from './Header';
import menuItems from '~/menu-items';
import Breadcrumbs from '~/components/@extended/Breadcrumbs';

// types
import { openDrawer } from '~/store/reducers/menu';
import { useGetProjectsQuery } from '~/store/reducers/projectsApi';

// ==============================|| MAIN LAYOUT ||============================== //

const Layout = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const matchDownLG = useMediaQuery(theme.breakpoints.down('lg'));
  const { drawerOpen } = useSelector((state) => state.menu);
  const { data: projects, isSuccess } = useGetProjectsQuery();

  // drawer toggler
  const [open, setOpen] = useState(drawerOpen);
  const handleDrawerToggle = () => {
    setOpen(!open);
    dispatch(openDrawer({ drawerOpen: !open }));
  };

  // set media wise responsive drawer
  useEffect(() => {
    setOpen(!matchDownLG);
    dispatch(openDrawer({ drawerOpen: !matchDownLG }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchDownLG]);

  useEffect(() => {
    if (open !== drawerOpen) setOpen(drawerOpen);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drawerOpen]);

  if (!user) {
    return <Navigate to="/login" replace />;
  } else if (isSuccess) {
    const navigation = menuItems(projects);
    return (
      <Box sx={{ display: 'flex', width: '100%' }}>
        <Header open={open} handleDrawerToggle={handleDrawerToggle} />
        <Drawer open={open} handleDrawerToggle={handleDrawerToggle} navigation={navigation} />
        <Box component="main" sx={{ width: '100%', flexGrow: 1, p: { xs: 2, sm: 3 } }}>
          <Toolbar />
          <Breadcrumbs navigation={navigation} title />
          <Outlet />
        </Box>
      </Box>
    );
  }
};

export default Layout;
