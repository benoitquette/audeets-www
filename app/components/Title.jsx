import React, {Component} from "react";
import Divider from 'material-ui/Divider';

export default class Title extends Component {
  static propTypes = {
    text: React.PropTypes.string.isRequired
  };

  render() {
    return (
      <div style={styles.title}>
        <h1>{this.props.text}</h1>
        <Divider/>
      </div>
    );
  }
}

const styles = {
  title: {
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 35
  }
};
