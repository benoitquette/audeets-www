import React, {Component} from "react";
import Title from "@components/Title";
import Text from "@components/Text";
import withWidth, {SMALL, LARGE} from 'material-ui/utils/withWidth';

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
    if (this.props.drawerOpen && this.props.width === LARGE) {
      paddingDrawer = styles.drawerOpened;
    }
    let containerStyle = styles.container;
    if (this.props.width === SMALL) {
      containerStyle = styles.containerSmall;
    }
    return (
      <div>
        <div style={containerStyle}>
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
      </div>
    );
  }
}

const styles = {
  container: {
    padding: 0
  },
  containerSmall: {
    padding: 0
  },
  drawerOpened: {
    marginTop: 64,
    marginLeft: 256
  },
  drawerClosed: {
    marginTop: 64,
    marginLeft: 0
  }
};
