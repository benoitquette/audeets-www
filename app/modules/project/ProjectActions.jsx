import React from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'

function ProjectLastActions() {
  return (
    <Card
      sx={{
        flex: 50,
      }}
    >
      <CardHeader title="Actions" />
      <CardContent sx={{ paddingTop: 0 }}>
      </CardContent>
      <CardActions>
        <Button>
          View All
        </Button>
      </CardActions>
    </Card>
  )
}

export default ProjectLastActions
