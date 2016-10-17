import React, {Component} from "react";
import Title from "@components/Title";
import Text from "@components/Text";
import withWidth, {LARGE} from 'material-ui/utils/withWidth';

@withWidth()
export default class Canvas extends Component {
  static propTypes = {
    drawerOpen: React.PropTypes.bool.isRequired,
    title: React.PropTypes.string,
    text: React.PropTypes.string,
    children: React.PropTypes.node,
    width: React.PropTypes.number.isRequired,
    toolbar: React.PropTypes.object
  };

  render() {
    let paddingDrawer = styles.drawerClosed;
    if (this.props.drawerOpen && this.props.width === LARGE) {
      paddingDrawer = styles.drawerOpened;
    }
    let containerStyle = styles.containerWithoutToolbar;
    if (this.props.toolbar !== undefined) {
      containerStyle = styles.containerWithToolbar;
    }
    return (
      <div>
        {this.props.toolbar !== undefined && (
          <div style={paddingDrawer}>
            {this.props.toolbar}
          </div>
        )}
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
  containerWithoutToolbar: {
    padding: 30
  },
  containerWithToolbar: {
    padding: 30,
    marginTop: '-64px'
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
