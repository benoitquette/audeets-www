import React from 'react'
import DashboardProjectListItem from './DashboardProjectListItem'
import PropTypes from 'prop-types'
import Spinner from '@components/Spinner'

function DashboardProjectList(props) {
  return (
    <Spinner loading={props.loading}>
      {
        props.projects.map((project) => {
          return (
            <DashboardProjectListItem
              title={project.title}
              description={project.description}
              verified={project.verified}
              verificationToken={project.verificationToken}
              crawling={project.crawling}
              url={project.url}
              key={project._id}
              id={project._id}
              navigateToProject={() => {
                return props.navigateToProject(project._id)
              }}
              dialogOpen={props.dialogOpen}
              toggleDialog={props.toggleDialog}
              removeProject={props.removeProject}
            />
          )
        })
      }
    </Spinner>
  )
}

DashboardProjectList.propTypes = {
  projects: PropTypes.array.isRequired,
  navigateToProject: PropTypes.func.isRequired,
  toggleDialog: PropTypes.func.isRequired,
  removeProject: PropTypes.func.isRequired,
  dialogOpen: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
}

export default DashboardProjectList
