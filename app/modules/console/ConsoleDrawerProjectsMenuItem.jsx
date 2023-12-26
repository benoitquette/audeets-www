import React from 'react'
import PropTypes from 'prop-types'
import ListItemText from '@mui/material/ListItemText'
import ListItemButton from '@mui/material/ListItemButton'

function ConsoleDrawerProjectsMenuItem(props) {
  return (
    <ListItemButton
      sx={{ pl: 4 }}
      onClick={props.callback}
    >
      <ListItemText primary={props.title} />
    </ListItemButton>
  )
}

ConsoleDrawerProjectsMenuItem.propTypes = {
  title: PropTypes.string,
  callback: PropTypes.func.isRequired,
}

export default ConsoleDrawerProjectsMenuItem
