import React, {Component} from "react";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";

export default class DashboardProjectRemoveDialog extends Component {
  static propTypes = {
    dialogOpen: React.PropTypes.bool.isRequired,
    toggleDialog: React.PropTypes.func.isRequired,
    removeProject: React.PropTypes.func.isRequired
  };

  render() {
    const standardActions = ([
      <FlatButton
        label="Remove"
        primary={true}
        onTouchTap={this.props.removeProject}
      />,
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.props.toggleDialog}
      />
    ]);
    return (
      <Dialog
        open={this.props.dialogOpen}
        title="Remove audit"
        actions={standardActions}
        onRequestClose={this.props.toggleDialog}
      >
        Are you sure you want to remove this site configuration?
      </Dialog>
    );
  }
}
