import React from 'react';
import _ from 'lodash';
import { Button, Typography } from '@mui/material';
import PropTypes from 'prop-types';

function ResultsDetailsItem(props) {
  return (
    <div key={props.text}>
      <Typography variant="body2">{props.text}</Typography>
      {props.urls && (
        <ul style={{ fontSize: 13 }}>
          {_.map(props.urls, (url) => {
            return <li key={url.text}>{url.text}</li>;
          })}
        </ul>
      )}
      {props.link && <Button variant="contained" label="More Details" labelPosition="before" primary={true} href={props.link} />}
    </div>
  );
}

ResultsDetailsItem.propTypes = {
  text: PropTypes.string.isRequired,
  link: PropTypes.string,
  urls: PropTypes.array
};

export default ResultsDetailsItem;
