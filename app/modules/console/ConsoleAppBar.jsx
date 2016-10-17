import React, {Component} from "react";
import AppBar from "material-ui/AppBar";
import MenuItem from "material-ui/MenuItem";
import IconMenu from "material-ui/IconMenu";
import IconButton from "material-ui/IconButton";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";

export default class Console extends Component {
  static propTypes = {
    toggleDrawer: React.PropTypes.func.isRequired,
    navigateToHome: React.PropTypes.func.isRequired,
    linkToHome: React.PropTypes.object.isRequired,
    linkToAccount: React.PropTypes.object.isRequired
  };

  render() {
    return (
      <AppBar
        style={styles.appBar}
        title="Web Audits"
        titleStyle={styles.title}
        onTitleTouchTap={this.props.navigateToHome}
        iconStyleRight={{verticalAlign: 'middle'}}
        iconElementRight={
          <IconMenu
            iconButtonElement={
              <IconButton><MoreVertIcon /></IconButton>
            }
            targetOrigin={styles.moreVertMenu}
            anchorOrigin={styles.moreVertMenu}
            >
            <MenuItem
              primaryText="Account"
              containerElement={this.props.linkToAccount}
              />
            <MenuItem
              primaryText="Sign out"
              containerElement={this.props.linkToHome}
              />
          </IconMenu>
        }
        onLeftIconButtonTouchTap={this.props.toggleDrawer}
        />
    );
  }
}

const styles = {
  title: {
    cursor: 'pointer'
  },
  moreVertMenu: {
    horizontal: 'right',
    vertical: 'top'
  },
  appBar: {
    position: 'fixed',
    top: 0
  }
};
