import React from "react";
import Snackbar from "@mui/material/Snackbar";
import PropTypes from 'prop-types';

function DashboardFeedback(props) {
  return (
    <div>
      <Snackbar
        open={props.confirmation}
        onClose={props.acknowledge}
        message={props.confirmationMessage}
      />
      <Snackbar
        open={props.error}
        onClose={props.acknowledge}
        message={props.errorMessage}
      />
    </div>
  )
}

DashboardFeedback.propTypes = {
  error: PropTypes.bool.isRequired,
  confirmation: PropTypes.bool.isRequired,
  acknowledge: PropTypes.func,
  errorMessage: PropTypes.string.isRequired,
  confirmationMessage: PropTypes.string.isRequired
};

export default DashboardFeedback;
