import React, {Component} from "react";
import {PieChart, Pie, Cell} from 'recharts';
import Subheader from 'material-ui/Subheader';

export default class ProjectChartsLatestCategory extends Component {
  static propTypes = {
    title: React.PropTypes.string.isRequired,
    score: React.PropTypes.number.isRequired,
    onClick: React.PropTypes.func.isRequired
  };

  render() {
    return (
      <div style={styles.chart}>
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
        <Subheader style={styles.header}>{this.props.title}</Subheader>
      </div>
    );
  }
}

const styles = {
  chart: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  header: {
    margin: 0,
    padding: 0,
    lineHeight: '28px',
    textAlign: 'center'
  },
  text: {
    cursor: 'pointer'
  },
  pie: {
    height: 80,
    width: 80,
    fontSize: '200%',
    lineHeight: '80px',
    cursor: 'pointer'
  }
};
