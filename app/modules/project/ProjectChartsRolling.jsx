import React, {Component} from "react";
import {Card, CardHeader, CardText} from 'material-ui/Card';
import {ResponsiveContainer, LineChart, Line, XAxis, Tooltip} from 'recharts';
import moment from 'moment';
import _ from 'lodash';

export default class ProjectChartsRolling extends Component {
  static propTypes = {
    title: React.PropTypes.string.isRequired,
    data: React.PropTypes.array.isRequired,
    flexStyle: React.PropTypes.object.isRequired,
    rollingPeriod: React.PropTypes.object.isRequired
  };

  render() {
    const data = this.props.data.map(datum => {
      return {
        score: datum.score,
        date: moment(datum.date)
          .format(this.props.rollingPeriod.dateFormat)
      };
    });
    return (
      <Card style={this.props.flexStyle}>
        <CardHeader
          title={_.capitalize(this.props.title) }
          subtitle={this.props.rollingPeriod.subtitle}
          />
        <CardText>
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
          </ResponsiveContainer>
        </CardText>
      </Card>
    );
  }
}

const styles = {
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
