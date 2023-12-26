import React from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Avatar from '@mui/material/Avatar'
import AuditUrlResults from './AuditUrlResults'
import PropTypes from 'prop-types'

function AuditCategory(props) {
  return (
    <Card sx={{ margin: 2 }}>
      <CardHeader
        title={props.categoryName}
        subtitle="not sure what we can put here..."
        avatar={<Avatar>{props.categoryName.charAt(0).toUpperCase()}</Avatar>}
      />
      <CardContent>
        <div id={props.categoryName}>
          <AuditUrlResults results={props.results} showFailsOnly={props.showFailsOnly} />
        </div>
      </CardContent>
    </Card>
  )
}

AuditCategory.propTypes = {
  categoryName: PropTypes.string.isRequired,
  results: PropTypes.array.isRequired,
  showFailsOnly: PropTypes.bool.isRequired,
}

export default AuditCategory
