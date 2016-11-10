import React, {Component} from "react";
import {Card, CardHeader, CardText, CardActions} from 'material-ui/Card';
import ProjectLastAuditsList from './ProjectLastAuditsList';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';

export default class ProjectLastAudits extends Component {
  static propTypes = {
    loaded: React.PropTypes.bool.isRequired,
    audits: React.PropTypes.array.isRequired,
    onClick: React.PropTypes.func.isRequired,
    navigateToLog: React.PropTypes.func.isRequired
  };

  render() {
    return (
      <Card style={styles.card}>
        <CardHeader title="Last Audits"/>
        <CardText style={styles.cardText}>
          {this.props.loaded ?
            <ProjectLastAuditsList
              audits={this.props.audits}
              onClick={this.props.onClick}
            /> : <CircularProgress/>
          }
        </CardText>
        <CardActions>
          <FlatButton
            label="View All"
            onTouchTap={this.props.navigateToLog}
          />
        </CardActions>
      </Card>
    );
  }
}

const styles = {
  card: {
    margin: 10,
    flexGrow: 1,
    flexShrink: 1
  },
  cardText: {
    paddingTop: 0
  }
};
