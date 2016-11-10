import React, {Component} from "react";
import ProjectChartsLatest from './ProjectChartsLatest';
import ProjectLastAudits from './ProjectLastAudits';
import ProjectActions from './ProjectActions';
import ProjectChartsRolling from './ProjectChartsRolling';

export default class ProjectCanvas extends Component {
  static propTypes = {
    latestScores: React.PropTypes.object.isRequired,
    lastAudits: React.PropTypes.object.isRequired,
    rollingWeek: React.PropTypes.object.isRequired,
    drawerOpen: React.PropTypes.bool.isRequired,
    onClick: React.PropTypes.func.isRequired,
    navigateToLog: React.PropTypes.func.isRequired
  };

  render() {
    return (
      <div style={styles.body}>
        <ProjectChartsLatest
          loaded={this.props.latestScores.loaded}
          categories={this.props.latestScores.data}
          onClick={this.props.onClick}
        />
        <div style={styles.multipleItems}>
          <ProjectLastAudits
            loaded={this.props.lastAudits.loaded}
            audits={this.props.lastAudits.data}
            onClick={this.props.onClick}
            navigateToLog={this.props.navigateToLog}
          />
          <ProjectActions/>
        </div>
        <ProjectChartsRolling
          loaded={this.props.rollingWeek.loaded}
          title="Rolling Week"
          data={this.props.rollingWeek.data}
          dateFormat=""
        />
      </div>
    );
  }
}

const styles = {
  body: {
    margin: 10,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  multipleItems: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    flexGrow: 1,
    flexShrink: 1
  }
};
