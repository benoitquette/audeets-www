import React from "react";
import _ from 'lodash';
import Button from '@mui/material/Button';
import Text from '@components/Text';
import PropTypes from 'prop-types';

function AuditUrlResultsDetailsItem(props) {
  return (
    <div key={this.props.text}>
      <Text>{this.props.text}</Text>
      {this.props.urls && (
        <ul style={{fontSize: 13}}>
          {_.map(this.props.urls, url => {
            return (
              <li key={url.text}>{url.text}</li>
            );
          })
          }
        </ul>
      )}
      {this.props.link && (
        <Button
        variant="contained"
          label="More Details"
          labelPosition="before"
          primary={true}
          href={this.props.link}
        />
      )}
    </div>
  )
}

AuditUrlResultsDetailsItem.propTypes = {
  text: PropTypes.string.isRequired,
  link: PropTypes.string,
  urls: PropTypes.array
};

export default AuditUrlResultsDetailsItem;
