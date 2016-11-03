import React, {Component} from "react";
import {Card, CardHeader, CardText} from 'material-ui/Card';
import {ResponsiveContainer, LineChart, Line, XAxis, Tooltip} from 'recharts';
import moment from 'moment';
import CircularProgress from 'material-ui/CircularProgress';

export default class ProjectChartsRolling extends Component {
  static propTypes = {
    loaded: React.PropTypes.bool.isRequired,
    title: React.PropTypes.string.isRequired,
    data: React.PropTypes.array.isRequired,
    dateFormat: React.PropTypes.string.isRequired
  };

  render() {
    const data = this.props.data.map(datum => {
      return {
        score: datum.score,
        date: moment(datum.date)
          .format(this.props.dateFormat)
      };
    });
    return (
      <Card style={styles.card}>
        <CardHeader title={this.props.title}/>
        <CardText>
          {this.props.loaded ?
            <ResponsiveContainer minHeight={styles.container.minHeight}>
              <LineChart
                data={data}
                margin={styles.margin}>
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="blue" />
                  <Tooltip/>
                <XAxis dataKey="date" />
              </LineChart>
            </ResponsiveContainer> : <CircularProgress/>
          }
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
  container: {
    minHeight: 120
  },
  margin: {
    top: 0,
    right: 30,
    left: 30,
    bottom: 0
  }
};
