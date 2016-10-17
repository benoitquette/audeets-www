import React, {Component} from "react";
import Canvas from '@components/Canvas';

export default class Account extends Component {
  static propTypes = {
    drawerOpen: React.PropTypes.bool.isRequired
  };

  render() {
    return (
      <Canvas
        title="Account"
        text="sds sd sqd sqd sqdsq dsq dsqdsqdsqdsqdsqd"
        drawerOpen={this.props.drawerOpen}
      />
    );
  }
}
