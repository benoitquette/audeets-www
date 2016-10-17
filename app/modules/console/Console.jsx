import React, {Component} from "react";
import {withRouter, Link} from "react-router";
import withWidth, {SMALL} from "material-ui/utils/withWidth";
import {connect} from "react-redux";
import {
  toggleDrawer,
  fetchProjects,
  addProject,
  ackProjectAdded,
  deleteProject,
  ackProjectDeleted
} from "./actions";
import ConsoleAppBar from "./ConsoleAppBar";
import ConsoleDrawer from "./ConsoleDrawer";

@withWidth()
@withRouter
@connect(state => ({
  drawerOpen: state.console.drawerOpen,
  projects: state.console.projects,
  errors: state.console.errors,
  confirmations: state.console.confirmations
}), {
  toggleDrawer,
  fetchProjects,
  addProject,
  ackProjectAdded,
  deleteProject,
  ackProjectDeleted
})
export default class Console extends Component {
  static propTypes = {
    projects: React.PropTypes.array.isRequired,
    fetchProjects: React.PropTypes.func.isRequired,
    drawerOpen: React.PropTypes.bool.isRequired,
    toggleDrawer: React.PropTypes.func.isRequired,
    children: React.PropTypes.node.isRequired,
    router: React.PropTypes.object.isRequired,
    width: React.PropTypes.number.isRequired,
    addProject: React.PropTypes.func.isRequired,
    ackProjectAdded: React.PropTypes.func.isRequired,
    deleteProject: React.PropTypes.func.isRequired,
    ackProjectDeleted: React.PropTypes.func.isRequired,
    errors: React.PropTypes.object.isRequired,
    confirmations: React.PropTypes.object.isRequired
  };

  componentDidMount() {
    this.props.fetchProjects();
  }

  navigateToProject(projectId) {
    const router = this.props.router;
    router.push('/console/' + projectId);
    if (this.props.width === SMALL) this.props.toggleDrawer();
  }

  navigateToDashboard() {
    const router = this.props.router;
    router.push('/console');
    if (this.props.width === SMALL) this.props.toggleDrawer();
  }

  render() {
    return (
      <div>
        <ConsoleAppBar
          toggleDrawer={this.props.toggleDrawer}
          navigateToHome={() => {
            this.props.router.push('/');
          }}
          linkToHome={<Link to="/" />}
          linkToAccount={<Link to="/console/account" />}
        />
        <ConsoleDrawer
          projects={this.props.projects}
          drawerOpen={this.props.drawerOpen}
          toggleDrawer={this.props.toggleDrawer}
          navigateToDashboard={this.navigateToDashboard.bind(this)}
          navigateToProject={this.navigateToProject.bind(this)}
        />
        <div>
          {React.cloneElement(
            this.props.children, {
              projects: this.props.projects,
              drawerOpen: this.props.drawerOpen,
              addProject: this.props.addProject,
              ackProjectAdded: this.props.ackProjectAdded,
              deleteProject: this.props.deleteProject,
              ackProjectDeleted: this.props.ackProjectDeleted,
              errors: this.props.errors,
              confirmations: this.props.confirmations
            })
          }
        </div>
      </div>
    );
  }
}
