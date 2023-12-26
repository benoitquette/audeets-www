import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toggleDrawer, fetchProjects } from './actions'
import ConsoleAppBar from './ConsoleAppBar'
import ConsoleDrawer from './ConsoleDrawer'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Toolbar from '@mui/material/Toolbar'

const drawerWidth = 240

function Console(props) {
  const dispatch = useDispatch()
  const { drawerOpen, projects, loading } = useSelector(state => state.console)

  useEffect(() => {
    dispatch(fetchProjects())
  }, [dispatch])

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <ConsoleAppBar
        toggleDrawer={() => {
          dispatch(toggleDrawer())
        }}
        navigateToAccount={() => {
          props.history.push('/console/account')
        }}
        drawerWidth={drawerWidth}
      />
      <ConsoleDrawer
        projects={projects}
        drawerOpen={drawerOpen}
        toggleDrawer={() => {
          dispatch(toggleDrawer())
        }}
        navigateToDashboard={() => {
          props.history.push('/console/dashboard')
        }}
        navigateToProject={(projectId) => {
          props.history.push('/console/' + projectId)
        }}
        navigateToSettings={() => {
          props.history.push('/settings')
        }}
        drawerWidth={drawerWidth}
        loading={loading}
      />
      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
        <Toolbar />
        {props.children}
      </Box>
    </Box>
  )
}

Console.propTypes = {
  history: PropTypes.object.isRequired,
  children: PropTypes.node,
}

export default withRouter(Console)
