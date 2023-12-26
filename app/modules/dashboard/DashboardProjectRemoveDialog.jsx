import React, {Component} from "react";
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import Button from "@mui/material/Button";
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';

export default class DashboardProjectRemoveDialog extends Component {
  static propTypes = {
    dialogOpen: PropTypes.bool.isRequired,
    toggleDialog: PropTypes.func.isRequired,
    removeProject: PropTypes.func.isRequired
  };

  render() {
    return (
      <Dialog open={this.props.dialogOpen}>
        <DialogTitle>Remove audit</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to remove this site configuration?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.removeProject}>
            Remove
          </Button>
          <Button
            onClick={this.props.toggleDialog}
            variant="contained"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
