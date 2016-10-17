import React, {Component} from "react";
import DashboardProjectList from "./DashboardProjectList";
import Canvas from "@components/Canvas";
import {Link, withRouter} from "react-router";
import {connect} from "react-redux";
import {toggleDialog} from './actions';
import DashboardFeedback from './DashboardFeedback';
import DashboardButton from './DashboardButton';

@withRouter
@connect(state => ({
  dialogOpen: state.dashboard.dialogOpen
}), {
  toggleDialog
})
export default class Dashboard extends Component {
  static propTypes = {
    projects: React.PropTypes.array.isRequired,
    errors: React.PropTypes.object.isRequired,
    confirmations: React.PropTypes.object.isRequired,
    drawerOpen: React.PropTypes.bool.isRequired,
    dialogOpen: React.PropTypes.bool.isRequired,
    toggleDialog: React.PropTypes.func.isRequired,
    router: React.PropTypes.object.isRequired,
    addProject: React.PropTypes.func.isRequired,
    ackProjectAdded: React.PropTypes.func.isRequired,
    deleteProject: React.PropTypes.func.isRequired,
    ackProjectDeleted: React.PropTypes.func.isRequired
  };

  navigateToProject(projectId) {
    const router = this.props.router;
    router.push(`/console/${projectId}`);
  }

  removeProject(projectId) {
    this.props.deleteProject(projectId);
    this.props.toggleDialog();
  }

  render() {
    return (
      <Canvas title="Dashboard" drawerOpen={this.props.drawerOpen}>
        <DashboardProjectList
          projects={this.props.projects}
          navigateToProject={this.navigateToProject.bind(this)}
          dialogOpen={this.props.dialogOpen}
          toggleDialog={this.props.toggleDialog}
          removeProject={this.removeProject.bind(this)}
        />
        <DashboardButton navigateToCreateProject={<Link to="/console/add" />}/>
        <DashboardFeedback
          errors={this.props.errors}
          confirmations={this.props.confirmations}
          ackProjectDeleted={this.props.ackProjectDeleted}
          ackProjectAdded={this.props.ackProjectAdded}
        />
      </Canvas>
    );
  }
}
