import React from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import ProjectChartsLatestCategory from './ProjectChartsLatestCategory'
import _ from 'lodash'
import moment from 'moment'
import constants from '@modules/constants'
import PropTypes from 'prop-types'
import Spinner from '@components/Spinner'

function ProjectChartsLatest(props) {
  let date
  if (!_.isNil(props.categories) && props.categories.length > 0) {
    date = props.categories[0].date
  }
  const dateString = moment(date).format(constants.longDateFormat)
  const charts = props.categories.map((cat) => {
    return (
      <ProjectChartsLatestCategory
        key={cat.category}
        title={cat.category}
        score={cat.score}
        onClick={() => props.navigateToAudit(date, cat.category)}
      />
    )
  })

  return (
    <Card>
      <CardHeader title="Latest Scoring" subheader={dateString} />
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          // flexWrap: 'nowrap',
        }}
      >
        <Spinner loading={!props.loaded}>
          {charts}
        </Spinner>
      </CardContent>
    </Card>
  )
}

ProjectChartsLatest.propTypes = {
  loaded: PropTypes.bool.isRequired,
  categories: PropTypes.array.isRequired,
  navigateToAudit: PropTypes.func.isRequired,
}

export default ProjectChartsLatest
