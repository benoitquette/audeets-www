import React, {Component} from "react";
import Canvas from "@components/Canvas";
import {connect} from "react-redux";
import {fetchData, setProjectState} from './actions';
import ProjectCharts from './ProjectCharts';
import ProjectToolbar from './ProjectToolbar';
import constants from '@modules/constants';
import _ from 'lodash';
import {withRouter, Link} from 'react-router';
import moment from 'moment';

@withRouter
@connect(state => ({
  data: state.project.list,
  projectStates: state.project.projectStates
}), {fetchData, setProjectState})
export default class Project extends Component {
  static propTypes = {
    params: React.PropTypes.object.isRequired,
    data: React.PropTypes.array.isRequired,
    fetchData: React.PropTypes.func.isRequired,
    projectStates: React.PropTypes.object.isRequired,
    setProjectState: React.PropTypes.func.isRequired,
    drawerOpen: React.PropTypes.bool.isRequired,
    router: React.PropTypes.object.isRequired
  };

  componentWillMount() {
    const params = this.props.params;
    const projectId = params.projectId;
    this.props.fetchData(projectId);
  }

  getRollingPeriodData(rollingPeriod, categoryData) {
    switch (rollingPeriod) {
      case constants.rollingCharts.month.id:
        return categoryData.rollingMonth;
      case constants.rollingCharts.year.id:
        return categoryData.rollingYear;
      default:
        return categoryData.rollingWeek;
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

  navigateToAudit(date) {
    const params = this.props.params;
    const projectId = params.projectId;
    const router = this.props.router;
    const shortDate = moment(date).format(constants.shortDateFormat);
    router.push(`/console/${projectId}/${shortDate}`);
  }

  render() {
    const params = this.props.params;
    const projectId = params.projectId;
    const projectState = this.props.projectStates[projectId];
    const rollingPeriodId = (projectState === undefined ?
      constants.rollingCharts.week.id :
      projectState.rollingPeriod);
    const metrics = this.props.data.map(category => {
      const latest = category.latest;
      return (
        <ProjectCharts
          key={category.category}
          projectId={projectId}
          title={category.category}
          latestScore={latest}
          rollingPeriod={this.getRollingPeriodConfig(rollingPeriodId)}
          rollingPeriodData={
            this.getRollingPeriodData(rollingPeriodId, category)}
          navigateToAudit={this.navigateToAudit.bind(this, latest.date)}
        />
      );
    }, this);
    const toolbar = (
      <ProjectToolbar
        categories={this.props.data.map(category => {
          return category.category;
        })}
        rollingPeriod={rollingPeriodId}
        setPeriod={this.setPeriod.bind(this)}
        projectId={projectId}
        navigateToLog={<Link to={`/console/${projectId}/log`} />}
        rollingChartsConf={constants.rollingCharts}
      />
    );
    return (
      <Canvas toolbar={toolbar} drawerOpen={this.props.drawerOpen}>
        {metrics}
      </Canvas>
    );
  }
}
