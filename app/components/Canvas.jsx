import React, {Component} from "react";
import Title from "@components/Title";
import Text from "@components/Text";
import withWidth, {SMALL} from 'material-ui/utils/withWidth';

@withWidth()
export default class Canvas extends Component {
  static propTypes = {
    drawerOpen: React.PropTypes.bool.isRequired,
    title: React.PropTypes.string,
    text: React.PropTypes.string,
    children: React.PropTypes.node,
    width: React.PropTypes.number.isRequired
  };

  render() {
    let paddingDrawer = styles.drawerClosed;
    if (this.props.drawerOpen && this.props.width !== SMALL) {
      paddingDrawer = styles.drawerOpened;
    }
    return (
      <div>
        <div style={paddingDrawer}>
          {this.props.title !== undefined && (
            <Title text={this.props.title}/>
          )}
          {this.props.text !== undefined && (
            <Text text={this.props.text}/>
          )}
          <div style={styles.content}>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  content: {
    paddingTop: 64
  },
  drawerOpened: {
    marginLeft: 256
  },
  drawerClosed: {
    marginLeft: 0
  }
};
