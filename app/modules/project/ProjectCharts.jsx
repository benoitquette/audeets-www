import React, {Component} from "react";
import ProjectChartsRolling from './ProjectChartsRolling';
import ProjectChartsLatest from './ProjectChartsLatest';

export default class ProjectCharts extends Component {
  static propTypes = {
    title: React.PropTypes.string.isRequired,
    latestScore: React.PropTypes.object.isRequired,
    rollingPeriod: React.PropTypes.object.isRequired,
    rollingPeriodData: React.PropTypes.array.isRequired,
    navigateToAudit: React.PropTypes.func.isRequired
  };

  render() {
    return (
      <div style={styles.container} >
        <ProjectChartsLatest
          title={this.props.title}
          score={this.props.latestScore.score}
          date={this.props.latestScore.date}
          flexStyle={styles.item1}
          onClick={this.props.navigateToAudit}
          />
        <ProjectChartsRolling
          title={this.props.title}
          rollingPeriod={this.props.rollingPeriod}
          flexStyle={styles.item2}
          data={this.props.rollingPeriodData}
          />
      </div>
    );
  }
}

const styles = {
  container: {
    display: 'flex'
  },
  item1: {
    marginBottom: 20,
    flexShrink: 1,
    flexGrow: 1,
    marginRight: 20
  },
  item2: {
    marginBottom: 20,
    flexShrink: 1,
    flexGrow: 5
  }
};
