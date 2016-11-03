import React, {Component} from "react";
import {Card, CardHeader, CardText, CardActions} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

export default class ProjectLastAudits extends Component {
  static propTypes = {
  };

  render() {
    return (
      <Card style={styles.card}>
        <CardHeader title="Actions"/>
        <CardText style={styles.cardText}>
        </CardText>
        <CardActions>
          <FlatButton label="View All" />
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
