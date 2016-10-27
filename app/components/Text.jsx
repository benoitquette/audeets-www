import React, {Component} from "react";

export default class Text extends Component {
  static propTypes = {
    children: React.PropTypes.node.isRequired
  };

  render() {
    return (
      <p style={styles.text}>{this.props.children}</p>
    );
  }
}

const styles = {
  text: {
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 13
  }
};
