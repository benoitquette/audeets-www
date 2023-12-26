import React from 'react'
import _ from 'lodash'
import Icon from '@mui/material/Icon'
import IconButton from '@mui/material/IconButton'
import Dialog from '@mui/material/Dialog'
import AuditUrlResultsDetailsItem from './AuditUrlResultsDetailsItem'
import { grey } from '@mui/material/colors'
import PropTypes from 'prop-types'

function AuditUrlResultsDetails(props) {
  // let state = {
  //   open: false,
  // }

  // const handleOpen = () => {
  //   this.setState({ open: true })
  // }

  // const handleClose = () => {
  //   this.setState({ open: false })
  // }

  const items = _.map(props.details, (detail) => {
    return (
      <AuditUrlResultsDetailsItem
        key={detail.text}
        text={detail.text}
        link={detail.link}
        urls={detail.urls}
      />
    )
  })
  return (
    <div>
      <IconButton
        style={{
          verticalAlign: 'middle',
          color: grey,
        }}
        onTouchTap={this.handleOpen}
      >
        <Icon className="material-icons">info</Icon>
      </IconButton>
      <Dialog
        actions={[]}
        open={this.state.open}
        onRequestClose={this.handleClose}
        autoScrollBodyContent={true}
      >
        <div>{items}</div>
      </Dialog>
    </div>
  )
}

AuditUrlResultsDetails.propTypes = {
  details: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
}

export default AuditUrlResultsDetails
