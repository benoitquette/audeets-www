import React from "react";
import CircularProgress from '@mui/material/CircularProgress';
import PropTypes from 'prop-types';

function Spinner(props) {
  return props.loading ?
      <CircularProgress
        size={20}
        sx={{
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto'
        }}
      /> : props.children
}

Spinner.propTypes = {
  loading: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

export default Spinner;
