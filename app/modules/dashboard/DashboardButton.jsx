import React from "react";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import PropTypes from 'prop-types';

function DashboardButton(props) {
  return (
    <Fab
      onClick={props.navigateToCreateProject}
      sx={{
        position: "fixed",
        bottom: (theme) => theme.spacing(2),
        right: (theme) => theme.spacing(2)
      }}
    >
      <AddIcon />
    </Fab>
  )
}

DashboardButton.propTypes = {
  navigateToCreateProject: PropTypes.func.isRequired
};

export default DashboardButton;
