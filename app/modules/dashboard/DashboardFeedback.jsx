import React, {Component} from "react";
import Snackbar from "material-ui/Snackbar";

export default class DashboardFeedback extends Component {
  static propTypes = {
    errors: React.PropTypes.object.isRequired,
    confirmations: React.PropTypes.object.isRequired,
    ackProjectDeleted: React.PropTypes.func.isRequired,
    ackProjectAdded: React.PropTypes.func.isRequired
  };

  render() {
    const errors = this.props.errors;
    const confirmations = this.props.confirmations;
    return (
      <div>
        <Snackbar
          open={errors.deleteProject}
          message="Site configuration could not be deleted"
        />
        <Snackbar
          open={confirmations.deleteProject}
          message="Site configuration was deleted"
          onRequestClose={this.props.ackProjectDeleted}
        />
        <Snackbar
          open={confirmations.addProject}
          message="Site configuration was added"
          onRequestClose={this.props.ackProjectAdded}
        />
      </div>
    );
  }
}
