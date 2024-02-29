import React from 'react';
import _ from 'lodash';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import ResultsDetailsItem from './ResultsDetailsItem';
import { grey } from '@mui/material/colors';
import PropTypes from 'prop-types';

function ResultsDetails({ details }) {
  // let state = {
  //   open: false,
  // }

  // const handleOpen = () => {
  //   this.setState({ open: true })
  // }

  // const handleClose = () => {
  //   this.setState({ open: false })
  // }

  return (
    <>
      <IconButton
        style={{
          verticalAlign: 'middle',
          color: grey
        }}
        // onTouchTap={this.handleOpen}
        disabled={!details}
      >
        <Icon className="material-icons">info</Icon>
      </IconButton>
      {/* <Dialog actions={[]} open={this.state.open} onRequestClose={this.handleClose} autoScrollBodyContent={true}>
        <div>
          {details.map((detail) => (
            <ResultsDetailsItem key={detail.text} text={detail.text} link={detail.link} urls={detail.urls} />
          ))}
        </div>
      </Dialog> */}
    </>
  );
}

ResultsDetails.propTypes = {
  details: PropTypes.array
};

export default ResultsDetails;
