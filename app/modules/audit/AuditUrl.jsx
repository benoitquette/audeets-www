import React from "react";
import {Card} from '@mui/material/Card';
import AuditUrlResults from './AuditUrlResults';
import ListSubheader from '@mui/material/ListSubheader';
import PropTypes from 'prop-types';

function AuditUrl(props) {
  return (
    <div>
      <ListSubheader>{props.url}</ListSubheader>
      <Card
        sx={{
          marginBottom: 30
        }}
        expanded={true}
        onExpandChange={handleExpandChange}>
        <AuditUrlResults results={props.results}/>
      </Card>
    </div>
  )
}

AuditUrl.propTypes = {
  url: PropTypes.string.isRequired,
  results: PropTypes.array.isRequired
};

export default AuditUrl;
