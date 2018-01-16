import React, {Component} from "react";
import MenuItem from "material-ui/MenuItem";
import Drawer from "material-ui/Drawer";
import Divider from "material-ui/Divider";
import Subheader from "material-ui/Subheader";
import ConsoleDrawerProjectsMenu from "./ConsoleDrawerProjectsMenu";
import withWidth, {SMALL} from "material-ui/utils/withWidth";
import FontIcon from "material-ui/FontIcon";
import CircularProgress from 'material-ui/CircularProgress';

@withWidth()
export default class ConsoleDrawer extends Component {
  static propTypes = {
    projects: React.PropTypes.array.isRequired,
    drawerOpen: React.PropTypes.bool.isRequired,
    toggleDrawer: React.PropTypes.func.isRequired,
    width: React.PropTypes.number.isRequired,
    navigateToDashboard: React.PropTypes.func.isRequired,
    navigateToProject: React.PropTypes.func.isRequired,
    loading: React.PropTypes.bool.isRequired
  };

  render() {
    return (
      <Drawer
        open={this.props.drawerOpen}
        docked={this.props.drawerOpen && this.props.width !== SMALL}
        containerStyle={styles.drawer}
        onRequestChange={this.props.toggleDrawer}>
        <MenuItem
          primaryText="Dashboard"
          onTouchTap={this.props.navigateToDashboard}
          leftIcon={
            <FontIcon className="material-icons">dashboard</FontIcon>
            }
        />
        <Divider/>
        <Subheader>Sites</Subheader>
        {this.props.loading ?
          <CircularProgress
            size={20}
            style={styles.progress}
          /> :
          <ConsoleDrawerProjectsMenu
            projects={this.props.projects}
            callback={this.props.navigateToProject}
          />
        }
      </Drawer>
    );
  }
}

const styles = {
  drawer: {
    marginTop: 64,
    marginBottom: 64
  },
  progress: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto'
  }
};
