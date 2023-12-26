import React from 'react'
import ConsoleDrawerProjectsMenuItem from './ConsoleDrawerProjectsMenuItem'
import PropTypes from 'prop-types'
import List from '@mui/material/List'

function ConsoleDrawerProjectsMenu(props) {
  const items = props.projects.map(function (project) {
    return (
      <ConsoleDrawerProjectsMenuItem
        title={project.title}
        key={project._id}
        callback={() => {
          return props.callback(project._id)
        }}
      />
    )
  }, this)
  return (
    <List component="div" disablePadding>
      {items}
    </List>
  )
}

ConsoleDrawerProjectsMenu.propTypes = {
  projects: PropTypes.array.isRequired,
  callback: PropTypes.func.isRequired,
}

export default ConsoleDrawerProjectsMenu
