import React, {useEffect} from "react";
import {
  fetchLatestScores,
  fetchLastAudits,
  fetchRollingWeek,
  setProjectState
} from './actions';
import constants from '@modules/constants';
import _ from 'lodash';
import {withRouter} from 'react-router-dom';
import moment from 'moment';
import ProjectCanvas from './ProjectCanvas';
import Canvas from "@components/Canvas";
import PropTypes from 'prop-types';
import {useSelector, useDispatch} from "react-redux";

// TODO use state to store the selected project so that it refreshes auto
function Project(props) {
  const dispatch = useDispatch();
  const {
    latestScores,
    lastAudits,
    rollingWeek,
    projectStates} = useSelector(state => state.project)
  const {drawerOpen} = useSelector(state => state.console)
  const projectId = props.match.params.projectId;

  useEffect(() => {
    dispatch(fetchLatestScores(projectId));
    dispatch(fetchLastAudits(projectId));
    dispatch(fetchRollingWeek(projectId));
  }, [projectId]);

  const getRollingPeriodData = (rollingPeriod, categoryData) => {
    switch (rollingPeriod) {
      case constants.rollingCharts.month.id:
      case constants.rollingCharts.year.id:
      default:
        return this.props.rollingWeek.data;
    }
  }

  const getRollingPeriodConfig = (rollingPeriodId) => {
    return _.find(constants.rollingCharts, item => {
      return item.id === rollingPeriodId;
    });
  }

  const setPeriod = (rollingPeriod) => {
    let projectId = props.match.params.projectId;
    this.props.setProjectState(projectId, {rollingPeriod});
  }

    // const params = this.props.params;
    // const projectId = params.projectId;
    // const projectState = this.props.projectStates[projectId];
    // const rollingPeriodId = (projectState === undefined ?
    //   constants.rollingCharts.week.id :
    //   projectState.rollingPeriod);
  return (
    <Canvas drawerOpen={drawerOpen}>
      <ProjectCanvas
        latestScores={latestScores}
        lastAudits={lastAudits}
        rollingWeek={rollingWeek}
        drawerOpen={drawerOpen}
        navigateToAudit={(date, category) => {
          const shortDate = moment(date).format(constants.shortDateFormat);
          props.history.push(`/console/${projectId}/${shortDate}#${category}`);
        }}
        navigateToLog={() => {
          props.history.push(`/console/${projectId}/log`);
        }}
      />
    </Canvas>
  )
}

Project.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

export default withRouter(Project);
