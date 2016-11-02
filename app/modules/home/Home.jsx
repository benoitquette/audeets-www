import React, {Component} from "react";
import {Link} from 'react-router';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import muiThemeable from 'material-ui/styles/muiThemeable';

@muiThemeable()
export default class Home extends Component {
  static propTypes = {
    muiTheme: React.PropTypes.object.isRequired
  };

  render() {
    const backgroundColor = this.props.muiTheme.palette.primary3Color;
    return (
      <div style={{backgroundColor: backgroundColor}}>
        <div style={styles.canvas}>
          <div style={styles.header}>

          </div>
          <div style={styles.body}>
            <div style={styles.logo}>
              <img src="apple-icon-180x180.png"/>
              <div style={styles.logoText}>
                <span style={styles.title}>audeets</span>
                <span style={styles.tagline}>continuous site auditing</span>
              </div>
            </div>
            <div style={styles.buttons}>
              <RaisedButton
                containerElement={<Link to="/console" />}
                label="demo"
                style={styles.button}
                />
              <RaisedButton
                containerElement={<Link to="/console" />}
                label="console"
                icon={
                  <FontIcon
                    className="material-icons"
                    >account_circle</FontIcon>
                }
                />
            </div>
          </div>
          <div style={styles.footer}>
            © 2016 audeets.com. All Rights Reserved.
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  canvas: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column'
  },
  header: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  logo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logoText: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 0
  },
  title: {
    color: 'Charcoal',
    fontSize: 60,
    fontWeight: 'bold',
    flexBasis: 45
  },
  tagline: {
    color: 'grey',
    fontSize: 30,
    fontFamily: 'Indie Flower',
    fontStyle: 'italic'
  },
  buttons: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 30
  },
  button: {
    marginRight: 20
  },
  footer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
    fontSize: 11,
    padding: 10
  }
};
