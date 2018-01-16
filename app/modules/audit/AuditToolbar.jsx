import React, {Component} from "react";
import {
  Toolbar,
  ToolbarGroup
} from 'material-ui/Toolbar';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import Toggle from 'material-ui/Toggle';

export default class AuditToolbar extends Component {
  static propTypes = {
    urls: React.PropTypes.array.isRequired,
    selectedUrl: React.PropTypes.string,
    urlFilterSelected: React.PropTypes.func.isRequired,
    setShowFailsOnly: React.PropTypes.func.isRequired,
    showFailsOnly: React.PropTypes.bool.isRequired,
    navigateToProject: React.PropTypes.func.isRequired
  };

  onUrlFilterChange = (e, key, value) => {
    this.props.urlFilterSelected(value);
  }

  onToggle = (object, toggled) => {
    this.props.setShowFailsOnly(toggled);
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
          {/* <ToolbarTitle text="URL" /> */}
          <DropDownMenu
            value={this.props.selectedUrl}
            onChange={this.onUrlFilterChange}
          >
            {filters}
          </DropDownMenu>
        </ToolbarGroup>
        <ToolbarGroup>
          <Toggle
            toggled={this.props.showFailsOnly}
            onToggle={this.onToggle}
            label="Show failed rules only"
          />
        </ToolbarGroup>
        <ToolbarGroup lastChild={true}>
          <RaisedButton
            label="Back to Project"
            primary={true}
            onClick={this.props.navigateToProject}
          />
        </ToolbarGroup>
      </Toolbar>
    );
  }
}

const styles = {
  toolbar: {
    paddingLeft: 25,
    paddingRight: 25
  }
};
