import React, {Component} from "react";
import Title from "@components/Title";
import Text from "@components/Text";
import withWidth, {SMALL} from 'material-ui/utils/withWidth';
import muiThemeable from 'material-ui/styles/muiThemeable';

@withWidth()
@muiThemeable()
export default class Canvas extends Component {
  static propTypes = {
    muiTheme: React.PropTypes.object.isRequired,
    drawerOpen: React.PropTypes.bool.isRequired,
    title: React.PropTypes.string,
    text: React.PropTypes.string,
    children: React.PropTypes.node,
    width: React.PropTypes.number.isRequired,
    toolbar: React.PropTypes.object
  };

  render() {
    let paddingDrawer = styles.drawerClosed;
    if (this.props.drawerOpen && this.props.width !== SMALL) {
      paddingDrawer = styles.drawerOpened;
    }
    let contentStyle = styles.content;
    contentStyle.backgroundColor = this.props.muiTheme.palette.primary3Color;
    return (
      <div>
        <div style={paddingDrawer}>
          {this.props.toolbar !== undefined && (this.props.toolbar)}
          {this.props.title !== undefined && (
            <Title text={this.props.title}/>
          )}
          {this.props.text !== undefined && (
            <Text text={this.props.text}/>
          )}
          <div style={contentStyle}>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  content: {
  },
  drawerOpened: {
    marginLeft: 256,
    paddingTop: 64
  },
  drawerClosed: {
    marginLeft: 0,
    paddingTop: 64
  }
};
