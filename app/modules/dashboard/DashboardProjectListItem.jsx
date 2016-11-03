import React, {Component} from "react";
import {Card, CardActions, CardHeader} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import {grey50} from 'material-ui/styles/colors';
import FlatButton from "material-ui/FlatButton";
import DashboardProjectRemoveDialog from './DashboardProjectRemoveDialog';

export default class DashboardProjectListItem extends Component {
  static propTypes = {
    id: React.PropTypes.string.isRequired,
    url: React.PropTypes.string.isRequired,
    dialogOpen: React.PropTypes.bool.isRequired,
    toggleDialog: React.PropTypes.func.isRequired,
    removeProject: React.PropTypes.func.isRequired,
    title: React.PropTypes.string.isRequired,
    description: React.PropTypes.string.isRequired,
    verified: React.PropTypes.bool.isRequired,
    verificationToken: React.PropTypes.string.isRequired,
    crawling: React.PropTypes.string.isRequired,
    navigateToProject: React.PropTypes.func.isRequired
  };

  render() {
    const avatar = <Avatar
      src={this.props.url + '/favicon.ico'}
      size={32}
      backgroundColor={grey50}
      style={styles.avatar}
    />;
    return (
      <div style={styles.card}>
        <DashboardProjectRemoveDialog
          dialogOpen={this.props.dialogOpen}
          toggleDialog={this.props.toggleDialog}
          removeProject={() => {
            return this.props.removeProject(this.props.id);
          }}
        />
        <Card>
          <CardHeader
            title={this.props.title}
            subtitle={this.props.description}
            avatar={avatar}
          />
          <CardActions>
            <FlatButton
              label="VIEW"
              onTouchTap = {this.props.navigateToProject}
              primary = {true}
            />
            <FlatButton
              label="REMOVE"
              onTouchTap = {this.props.toggleDialog}
              primary = {true}
            />
          </CardActions>
        </Card>
      </div>
    );
  }
}

const styles = {
  card: {
    marginBottom: 20
  }
};
