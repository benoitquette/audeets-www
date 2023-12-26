import React from 'react'
import ProjectLastAuditsListItem from './ProjectLastAuditsListItem'
import moment from 'moment'
import PropTypes from 'prop-types'

function ProjectLastAuditsList(props) {
  const items = props.audits.map((dateString) => {
    const date = moment(dateString)
    return (
      <ProjectLastAuditsListItem
        key={date}
        date={date}
        navigateToAudit={() => props.navigateToAudit(date)}
      />
    )
  })
  return (
    <div>{items}</div>
  )
}

ProjectLastAuditsList.propTypes = {
  audits: PropTypes.array.isRequired,
  navigateToAudit: PropTypes.func.isRequired,
}

export default ProjectLastAuditsList
