import React, {Component} from "react";

export default class Text extends Component {
  static propTypes = {
    text: React.PropTypes.string.isRequired
  };

  render() {
    return (
      <p style={styles.text}>{this.props.text}</p>
    );
  }
}

const styles = {
  text: {
    paddingLeft: 10,
    paddingRight: 10
  }
};
