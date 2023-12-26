import React from "react";
import Drawer from "@mui/material/Drawer";
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import ConsoleDrawerContent from "./ConsoleDrawerContent";

function ConsoleDrawer(props) {
  const drawer = (
    <ConsoleDrawerContent
      projects={props.projects}
      navigateToDashboard={props.navigateToDashboard}
      navigateToProject={props.navigateToProject}
      navigateToSettings={props.navigateToSettings}
      loading={props.loading}
    />
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: props.drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant="temporary"
        anchor={'left'}
        open={props.drawerOpen}
        onClose={props.toggleDrawer}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: props.drawerWidth },
        }}
        ModalProps={{
          keepMounted: true // Better open performance on mobile.
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: props.drawerWidth },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
}

ConsoleDrawer.propTypes = {
  projects: PropTypes.array.isRequired,
  drawerOpen: PropTypes.bool.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
  navigateToDashboard: PropTypes.func.isRequired,
  navigateToProject: PropTypes.func.isRequired,
  navigateToSettings: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  drawerWidth: PropTypes.number.isRequired
};

export default ConsoleDrawer;
