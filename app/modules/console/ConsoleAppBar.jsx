import React, {Component} from "react";
import AppBar from "material-ui/AppBar";
import MenuItem from "material-ui/MenuItem";
import IconMenu from "material-ui/IconMenu";
import IconButton from "material-ui/IconButton";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
import withWidth, {SMALL} from "material-ui/utils/withWidth";

@withWidth()
export default class Console extends Component {
  static propTypes = {
    toggleDrawer: React.PropTypes.func.isRequired,
    navigateToHome: React.PropTypes.func.isRequired,
    linkToHome: React.PropTypes.object.isRequired,
    linkToAccount: React.PropTypes.object.isRequired,
    width: React.PropTypes.number.isRequired
  };

  render() {
    return (
      <AppBar
        style={styles.appBar}
        title="audeets"
        titleStyle={styles.title}
        onTitleClick={this.props.navigateToHome}
        showMenuIconButton={this.props.width === SMALL}
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
        onLeftIconButtonClick={this.props.toggleDrawer}
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
