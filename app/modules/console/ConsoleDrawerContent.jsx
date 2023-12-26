import React from 'react'
import Divider from '@mui/material/Divider'
import ListSubheader from '@mui/material/ListSubheader'
import ConsoleDrawerProjectsMenu from './ConsoleDrawerProjectsMenu'
import PropTypes from 'prop-types'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import DashboardIcon from '@mui/icons-material/Dashboard'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import SettingsIcon from '@mui/icons-material/Settings'
import Spinner from '@components/Spinner'

function ConsoleDrawerContent(props) {
  return (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={props.navigateToDashboard}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>
      </List>
      <List
        subheader={(
          <ListSubheader>
            Sites
          </ListSubheader>
        )}
      >
        <Spinner loading={props.loading}>
          <ConsoleDrawerProjectsMenu
            projects={props.projects}
            callback={props.navigateToProject}
          />
        </Spinner>
      </List>
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={props.navigateToSettings}>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  )
}

ConsoleDrawerContent.propTypes = {
  projects: PropTypes.array.isRequired,
  navigateToDashboard: PropTypes.func.isRequired,
  navigateToProject: PropTypes.func.isRequired,
  navigateToSettings: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
}

export default ConsoleDrawerContent
