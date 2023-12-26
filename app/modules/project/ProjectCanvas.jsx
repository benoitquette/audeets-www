import React from "react";
import ProjectChartsLatest from './ProjectChartsLatest';
import ProjectLastAudits from './ProjectLastAudits';
import ProjectActions from './ProjectActions';
import ProjectChartsRolling from './ProjectChartsRolling';
import constants from '@modules/constants';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';

function ProjectCanvas(props) {
  const rollingWeekCharts = props.rollingWeek.data.map(category => {
    return (
      <ProjectChartsRolling
        key={category.category}
        loaded={props.rollingWeek.loaded}
        title={category.category}
        subtitle="Rolling Week"
        data={category.data}
        dateFormat={constants.rollingCharts.week.dateFormat}
      />
    );
  });
  return (
    <Box
      component="div"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        rowGap: 3
      }}
    >
      <ProjectChartsLatest
        loaded={props.latestScores.loaded}
        categories={props.latestScores.data}
        navigateToAudit={props.navigateToAudit}
      />
      <Box
        component="div"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'no-wrap',
          justifyContent: 'space-between',
          alignItems: 'stretch',
          columnGap: 3
        }}
      >
        <ProjectLastAudits
          loaded={props.lastAudits.loaded}
          audits={props.lastAudits.data}
          navigateToAudit={props.navigateToAudit}
          navigateToLog={props.navigateToLog}
        />
        <ProjectActions/>
      </Box>
      {rollingWeekCharts}
    </Box>
  )
}

ProjectCanvas.propTypes = {
  latestScores: PropTypes.object.isRequired,
  lastAudits: PropTypes.object.isRequired,
  rollingWeek: PropTypes.object.isRequired,
  navigateToAudit: PropTypes.func.isRequired,
  navigateToLog: PropTypes.func.isRequired
};

export default ProjectCanvas;

