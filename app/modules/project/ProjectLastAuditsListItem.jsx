import React from 'react'
import moment from 'moment'
import constants from '@modules/constants'
import PropTypes from 'prop-types'

function ProjectLastAuditsListItem(props) {
  const dateString = moment(props.date).format(constants.longDateFormat)
  return (
    <div style={{ cursor: 'pointer' }}>
      <a onClick={props.navigateToAudit}>{dateString}</a>
      <br />
    </div>
  )
}

ProjectLastAuditsListItem.propTypes = {
  date: PropTypes.object.isRequired,
  navigateToAudit: PropTypes.func.isRequired,
}

export default ProjectLastAuditsListItem
