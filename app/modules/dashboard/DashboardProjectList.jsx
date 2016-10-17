import React, {Component} from "react";
import DashboardProjectListItem from './DashboardProjectListItem';

export default class DashboardProjectList extends Component {
  static propTypes = {
    projects: React.PropTypes.array.isRequired,
    navigateToProject: React.PropTypes.func.isRequired,
    toggleDialog: React.PropTypes.func.isRequired,
    removeProject: React.PropTypes.func.isRequired,
    dialogOpen: React.PropTypes.bool.isRequired
  };

  render() {
    const items = this.props.projects.map(project => {
      return (
        <DashboardProjectListItem
          title={project.title}
          description={project.description}
          verified={project.verified}
          verificationToken={project.verificationToken}
          crawling={project.crawling}
          url={project.url}
          key={project._id}
          id={project._id}
          style={styles.list}
          navigateToProject={() => {
            return this.props.navigateToProject(project._id);
          }}
          dialogOpen={this.props.dialogOpen}
          toggleDialog={this.props.toggleDialog}
          removeProject={this.props.removeProject}
        />
      );
    });
    return (
      <div>
        {items}
      </div>
    );
  }
}

const styles = {
  list: {
    marginTop: 20
  }
};
