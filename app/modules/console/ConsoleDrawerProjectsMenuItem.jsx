import React, {Component} from "react";
import MenuItem from 'material-ui/MenuItem';

export default class ConsoleDrawerProjectsMenuItem extends Component {
  static propTypes = {
    title: React.PropTypes.string.isRequired,
    callback: React.PropTypes.func.isRequired
  };

  render() {
    return (
      <MenuItem
        primaryText={this.props.title}
        style={styles.item}
        onTouchTap={this.props.callback}
      />
    );
  }
}

const styles = {
  item: {
    paddingLeft: 0
  }
};
