import React from "react";
import PropTypes from 'prop-types';

function Text(props) {
  return (
    <p
      style={{
        paddingLeft: 20,
        paddingRight: 20,
        fontSize: 13
      }}
    >
      {props.text}
    </p>
  );
}

Text.propTypes = {
  text: PropTypes.string.isRequired
};

export default Text;
