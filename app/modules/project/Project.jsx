import React, {Component} from "react";
import {connect} from "react-redux";
import {
  fetchLatestScores,
  fetchLastAudits,
  fetchRollingWeek,
  setProjectState
} from './actions';
import constants from '@modules/constants';
import _ from 'lodash';
import {withRouter} from 'react-router';
import moment from 'moment';
import ProjectCanvas from './ProjectCanvas';
import Canvas from "@components/Canvas";

@withRouter
@connect(state => ({
  latestScores: state.project.latestScores,
  lastAudits: state.project.lastAudits,
  rollingWeek: state.project.rollingWeek,
  projectStates: state.project.projectStates
}), {fetchLatestScores, setProjectState, fetchLastAudits, fetchRollingWeek})
export default class Project extends Component {
  static propTypes = {
    params: React.PropTypes.object.isRequired,
    fetchLatestScores: React.PropTypes.func.isRequired,
    fetchLastAudits: React.PropTypes.func.isRequired,
    fetchRollingWeek: React.PropTypes.func.isRequired,
    latestScores: React.PropTypes.object.isRequired,
    lastAudits: React.PropTypes.object.isRequired,
    rollingWeek: React.PropTypes.object.isRequired,
    projectStates: React.PropTypes.object.isRequired,
    setProjectState: React.PropTypes.func.isRequired,
    drawerOpen: React.PropTypes.bool.isRequired,
    router: React.PropTypes.object.isRequired
  };

  componentDidMount() {
    const params = this.props.params;
    const projectId = params.projectId;
    this.fetchData(projectId);
  }

  componentDidUpdate(previousProps) {
    let oldProjectId = previousProps.params.projectId;
    let newProjectId = this.props.params.projectId;
    if (oldProjectId !== newProjectId)
      this.fetchData(newProjectId);
  }

  fetchData(projectId) {
    this.props.fetchLatestScores(projectId);
    this.props.fetchLastAudits(projectId);
    this.props.fetchRollingWeek(projectId);
  }

  getRollingPeriodData(rollingPeriod, categoryData) {
    switch (rollingPeriod) {
      case constants.rollingCharts.month.id:
      case constants.rollingCharts.year.id:
      default:
        return this.props.rollingWeek.data;
    }
  }

  getRollingPeriodConfig(rollingPeriodId) {
    return _.find(constants.rollingCharts, item => {
      return item.id === rollingPeriodId;
    });
  }

  setPeriod(rollingPeriod) {
    const params = this.props.params;
    const projectId = params.projectId;
    this.props.setProjectState(projectId, {rollingPeriod});
  }

  navigateToAudit(date, category) {
    const params = this.props.params;
    const projectId = params.projectId;
    const router = this.props.router;
    const shortDate = moment(date).format(constants.shortDateFormat);
    router.push(`/console/${projectId}/${shortDate}#${category}`);
  }

  navigateToLog() {
    const params = this.props.params;
    const projectId = params.projectId;
    const router = this.props.router;
    router.push(`/console/${projectId}/log`);
  }

  render() {
    // const params = this.props.params;
    // const projectId = params.projectId;
    // const projectState = this.props.projectStates[projectId];
    // const rollingPeriodId = (projectState === undefined ?
    //   constants.rollingCharts.week.id :
    //   projectState.rollingPeriod);
    return (
      <Canvas drawerOpen={this.props.drawerOpen}>
        <ProjectCanvas
          latestScores={this.props.latestScores}
          lastAudits={this.props.lastAudits}
          rollingWeek={this.props.rollingWeek}
          drawerOpen={this.props.drawerOpen}
          onClick={this.navigateToAudit.bind(this)}
          navigateToLog={this.navigateToLog.bind(this)}
        />
      </Canvas>
    );
  }
}
