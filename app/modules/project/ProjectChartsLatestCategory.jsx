import React from "react";
import {PieChart, Pie, Cell} from 'recharts';
import ListSubheader from '@mui/material/ListSubheader';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';

function ProjectChartsLatestCategory(props) {
  return (
    <Box
      component="div"
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <PieChart
        style={{
          fontSize: '200%',
          lineHeight: '80px',
          cursor: 'pointer'
        }}
        width={80}
        height={80}
      >
        <text
          x="49%" y="54%"
          textAnchor="middle"
          dominantBaseline="middle"
          sx={{cursor: 'pointer'}}
          onClick={props.onClick}
        >
          {props.score}
        </text>
        <Pie
          data={[
            {name: 'score', value: props.score},
            {name: 'left', value: 100 - props.score}
          ]}
          cx="50%"
          cy="50%"
          innerRadius="65%"
          outerRadius="100%"
          startAngle={90}
          endAngle={450}
        >
          <Cell fill={'green'}/>
          <Cell fill={'red'}/>
        </Pie>
      </PieChart>
      <ListSubheader
        sx={{
          margin: 0,
          padding: 0,
          lineHeight: '28px',
          textAlign: 'center'
        }}
      >
        {props.title}
      </ListSubheader>
    </Box>
  )
}

ProjectChartsLatestCategory.propTypes = {
  title: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
};

export default ProjectChartsLatestCategory;

