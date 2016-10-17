import React, {Component} from "react";
import {Card, CardHeader, CardText} from 'material-ui/Card';
import moment from 'moment';
import _ from 'lodash';
import {PieChart, Pie, Cell} from 'recharts';

export default class ProjectChartsLatest extends Component {
  static propTypes = {
    title: React.PropTypes.string.isRequired,
    score: React.PropTypes.number.isRequired,
    date: React.PropTypes.node.isRequired,
    flexStyle: React.PropTypes.object.isRequired,
    onClick: React.PropTypes.func.isRequired
  };

  render() {
    return (
      <Card style={this.props.flexStyle}>
        <CardHeader
          title={_.capitalize(this.props.title) }
          subtitle={
            'Latest Score (' +
            moment(this.props.date).format('MMM Do') +
            ')'}
          />
        <CardText style={styles.cardText} >
          <PieChart
            style={styles.pie}
            width={styles.pie.width}
            height={styles.pie.height}
          >
            <text
              x="49%" y="54%"
              textAnchor="middle"
              dominantBaseline="middle"
              style={styles.text}
              onClick={this.props.onClick}
            >
              {this.props.score}
            </text>
            <Pie
              data={[
                {name: 'score', value: this.props.score},
                {name: 'left', value: 100 - this.props.score}
              ]}
              cx="50%"
              cy="50%"
              innerRadius="65%"
              outerRadius="100%"
              startAngle={90}
              endAngle={450}
            >
              <Cell fill={'green'}/>
              <Cell fill={'red'}/>
            </Pie>
          </PieChart>
        </CardText>
      </Card>
    );
  }
}

const styles = {
  cardText: {
    textAlign: 'center'
  },
  text: {
    cursor: 'pointer'
  },
  pie: {
    height: 120,
    width: 120,
    textAlign: 'center',
    verticalAlign: 'middle',
    display: 'inline-block',
    fontSize: '280%',
    lineHeight: '100px',
    cursor: 'pointer'
  }
};
