import React, {Component} from "react";
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';

export default class AuditToolbar extends Component {
  static propTypes = {
    urls: React.PropTypes.array.isRequired
  };

  render() {
    const filters = this.props.urls.map(function(url) {
      return (
        <MenuItem
          key={url}
          value={url}
          primaryText={url}
        />
      );
    });
    return (
      <Toolbar style={styles.toolbar}>
        <ToolbarGroup firstChild={true}>
          <DropDownMenu value={0}>
            <MenuItem key={0} value={0} primaryText="All URLs" />
            {filters}
          </DropDownMenu>
        </ToolbarGroup>
      </Toolbar>
    );
  }
}

const styles = {
  toolbar: {
    paddingLeft: 55,
    paddingRight: 10
  }
};
