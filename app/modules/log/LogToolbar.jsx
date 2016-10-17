import React, {Component} from "react";
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';

export default class LogToolbar extends Component {
  static propTypes = {
  };

  render() {
    return (
      <Toolbar style={styles.toolbar}>
        <ToolbarGroup firstChild={true}>
        </ToolbarGroup>
        <ToolbarGroup>
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
