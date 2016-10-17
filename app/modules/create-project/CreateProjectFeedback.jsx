import React, {Component} from "react";
import Snackbar from "material-ui/Snackbar";

export default class CreateProjectFeedback extends Component {
  static propTypes = {
    errors: React.PropTypes.object.isRequired
  };

  render() {
    const errors = this.props.errors;
    return (
      <div>
        <Snackbar
          open={errors.addProject}
          message="Site configuration could not be added"
        />
      </div>
    );
  }
}
