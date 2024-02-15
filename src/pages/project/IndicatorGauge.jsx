import PropTypes from 'prop-types';
import { PieChart, Pie, Cell, Label } from 'recharts';

const IndicatorGauge = ({ score, color }) => (
  <PieChart
    style={{
      lineHeight: '80px',
      cursor: 'pointer'
    }}
    width={50}
    height={50}
    margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
  >
    <Pie
      data={[
        { name: 'score', value: score },
        { name: 'left', value: 100 - score }
      ]}
      cx="50%"
      cy="50%"
      innerRadius="65%"
      outerRadius="100%"
      startAngle={90}
      endAngle={-270}
      dataKey="value"
    >
      <Cell fill={color[500]} />
      <Cell fill={color[50]} />
      <Label position="center">{score}</Label>
    </Pie>
  </PieChart>
);

IndicatorGauge.propTypes = {
  score: PropTypes.number.isRequired,
  color: PropTypes.object.isRequired
};

export default IndicatorGauge;
