import React from 'react'
import DashboardProjectList from './DashboardProjectList'
import Canvas from '@components/Canvas'
import { useSelector, useDispatch } from 'react-redux'
import { toggleDialog } from './actions'
import { deleteProject } from '@modules/console/actions'
import { reset } from '@modules/create-project/actions'
import DashboardFeedback from './DashboardFeedback'
import DashboardButton from './DashboardButton'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

function Dashboard(props) {
  const dispatch = useDispatch()
  const {
    drawerOpen,
    projects,
    loading,
    errors,
    confirmations } = useSelector(state => state.console)
  const { dialogOpen } = useSelector(state => state.dashboard)

  return (
    <Canvas
      title="Dashboard"
      drawerOpen={drawerOpen}
    >
      <DashboardProjectList
        projects={projects}
        navigateToProject={(projectId) => {
          props.history.push('/console/' + projectId)
        }}
        dialogOpen={dialogOpen}
        toggleDialog={() => {
          dispatch(toggleDialog())
        }}
        removeProject={(projectId) => {
          dispatch(deleteProject(projectId))
          dispatch(toggleDialog())
        }}
        loading={loading}
      />
      <DashboardButton
        navigateToCreateProject={() => {
          props.history.push('/console/add')
        }}
      />
      <DashboardFeedback
        error={errors.deleteProject}
        confirmation={confirmations.deleteProject}
        errorMessage="An error occured whilst deleting the configuration"
        confirmationMessage="Site removed."
      />
      <DashboardFeedback
        error={errors.createProject}
        confirmation={confirmations.createProject}
        acknowledge={() => {
          dispatch(reset())
        }}
        errorMessage="An error occured whilst creating the configuration"
        confirmationMessage="Site created."
      />
    </Canvas>
  )
}

Dashboard.propTypes = {
  history: PropTypes.object.isRequired,
}

export default withRouter(Dashboard)
