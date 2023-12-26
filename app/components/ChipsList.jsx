import React from "react";
import Chip from '@mui/material/Chip';
import _ from 'lodash';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

function ChipsList(props) {
  let chips = [];
  if (!_.isNil(props.items)) {
    let clickProps = {};
    if (props.onClickUrl)
      clickProps = {
        component: {Link},
        to: props.onClickUrl,
        clickable: true
      };
    chips = props.items.map(item => {
      return (
        <Chip
          label={item}
          key={item}
          {...clickProps}
        />
      );
    });
  }
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap'
      }}
      data-key={props.dataKey}
    >
      {chips}
      {!_.isNil(props.children) &&
        React.cloneElement(props.children, {})}
    </div>
  )
}

ChipsList.propTypes = {
  items: PropTypes.array.isRequired,
  children: PropTypes.node,
  dataKey: PropTypes.string,
  onClickUrl: PropTypes.string
};

export default ChipsList;
