import React, {Component} from "react";
import {Card, CardHeader, CardText} from 'material-ui/Card';
import ProjectChartsLatestCategory from './ProjectChartsLatestCategory';
import _ from 'lodash';
import moment from 'moment';
import constants from '@modules/constants';
import CircularProgress from 'material-ui/CircularProgress';

export default class ProjectChartsLatest extends Component {
  static propTypes = {
    loaded: React.PropTypes.bool.isRequired,
    categories: React.PropTypes.array.isRequired,
    onClick: React.PropTypes.func.isRequired
  };

  render() {
    let date;
    if (!_.isNil(this.props.categories) && this.props.categories.length > 0) {
      console.log(this.props.categories);
      date = this.props.categories[0].date;
    }
    const dateString = moment(date).format(constants.longDateFormat);
    const charts = this.props.categories.map(cat => {
      return (
        <ProjectChartsLatestCategory
          key={cat.category}
          title={cat.category}
          score={cat.score}
          onClick={() => this.props.onClick(date)}
          />
      );
    });

    return (
      <Card style={styles.card}>
        <CardHeader title="Latest Scoring" subtitle={dateString}/>
        <CardText style={styles.cardText}>
          <div style={styles.charts}>
            {this.props.loaded ? charts : <CircularProgress/>}
          </div>
        </CardText>
      </Card>
    );
  }
}

const styles = {
  card: {
    margin: 10,
    width: '100%'
  },
  cardText: {
    paddingTop: 0
  },
  charts: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start'
  }
};
