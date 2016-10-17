import React, {Component} from "react";
import AppBar from "material-ui/AppBar";
import {Link} from 'react-router';
import FontIcon from 'material-ui/FontIcon';
import {white} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';

export default class HomeMaster extends Component {
  static propTypes = {
    children: React.PropTypes.node.isRequired
  };

  render() {
    return (
        <div>
          <AppBar
            showMenuIconButton={false}
            iconElementRight={
              <FlatButton
                containerElement={<Link to="/console" />}
                label="console"
                icon={
                      <FontIcon
                        className="material-icons"
                        color={white}>account_circle</FontIcon>
                    }
               />
             }
          />
          <div>
            {this.props.children}
          </div>
        </div>
    );
  }
}
