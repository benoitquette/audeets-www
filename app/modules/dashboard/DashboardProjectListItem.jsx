import React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardHeader from '@mui/material/CardHeader'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import DashboardProjectRemoveDialog from './DashboardProjectRemoveDialog'
import PropTypes from 'prop-types'

function DashboardProjectListItem(props) {
  return (
    <div style={{ marginBottom: 20 }}>
      <DashboardProjectRemoveDialog
        dialogOpen={props.dialogOpen}
        toggleDialog={props.toggleDialog}
        removeProject={() => {
          return props.removeProject(props.id)
        }}
      />
      <Card>
        <CardHeader
          title={props.title}
          subtitle={props.description}
          avatar={(
            <Avatar
              src={props.url + '/favicon.ico'}
            />
          )}
        />
        <CardActions>
          <Button onClick={props.navigateToProject}>
            VIEW
          </Button>
          <Button onClick={props.toggleDialog}>
            REMOVE
          </Button>
        </CardActions>
      </Card>
    </div>
  )
}

DashboardProjectListItem.propTypes = {
  id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  dialogOpen: PropTypes.bool.isRequired,
  toggleDialog: PropTypes.func.isRequired,
  removeProject: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  verified: PropTypes.bool,
  verificationToken: PropTypes.string,
  crawling: PropTypes.string,
  navigateToProject: PropTypes.func.isRequired,
}

export default DashboardProjectListItem
