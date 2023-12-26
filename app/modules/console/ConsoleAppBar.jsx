import React from 'react'
import AppBar from '@mui/material/AppBar'
import IconButton from '@mui/material/IconButton'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import PropTypes from 'prop-types'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import MenuIcon from '@mui/icons-material/Menu'

function ConsoleAppBar(props) {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${props.drawerWidth}px)` },
        ml: { sm: `${props.drawerWidth}px` },
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          onClick={props.toggleDrawer}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, display: { sm: 'block' } }}
        >
          Audeets
        </Typography>
        <IconButton color="inherit" onClick={props.navigateToAccount}>
          <AccountCircleIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

ConsoleAppBar.propTypes = {
  toggleDrawer: PropTypes.func.isRequired,
  navigateToAccount: PropTypes.func.isRequired,
  drawerWidth: PropTypes.number.isRequired,
}

export default ConsoleAppBar
