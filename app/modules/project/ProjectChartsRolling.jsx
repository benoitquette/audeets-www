import React from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { ResponsiveContainer, LineChart, Line, XAxis, Tooltip } from 'recharts'
import moment from 'moment'
import PropTypes from 'prop-types'
import Spinner from '@components/Spinner'

function ProjectChartsRolling(props) {
  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }
  // iterate through the data to format the dates
  const data = props.data.map((datum) => {
    return {
      score: datum.score,
      date: moment(datum.date)
        .format(props.dateFormat),
    }
  })
  return (
    <Card>
      <CardHeader
        title={capitalize(props.title)}
        subheader={props.subtitle}
      />
      <CardContent>
        <Spinner loading={!props.loaded}>
          <ResponsiveContainer minHeight={120}>
            <LineChart
              data={data}
              margin={{
                top: 0,
                right: 30,
                left: 30,
                bottom: 0,
              }}
            >
              <Line
                type="monotone"
                dataKey="score"
                stroke="blue"
              />
              <Tooltip />
              <XAxis dataKey="date" />
            </LineChart>
          </ResponsiveContainer>
        </Spinner>
      </CardContent>
    </Card>
  )
}

ProjectChartsRolling.propTypes = {
  loaded: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  dateFormat: PropTypes.string.isRequired,
}

export default ProjectChartsRolling
