import PropTypes from 'prop-types';
import { PieChart, Pie, Cell, Label } from 'recharts';
import { Typography } from '@mui/material';

const IndicatorGauge = ({ score, color, size }) => (
  <PieChart
    style={{
      lineHeight: '80px',
      cursor: 'pointer'
    }}
    width={size}
    height={size}
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
      <Label
        position="center"
        content={({ viewBox }) => {
          const { cx, cy } = viewBox;
          const fontSize = size / 5;
          return (
            <text x={cx - fontSize / 1.6} y={cy + fontSize / 2.7} fontSize={fontSize}>
              {score}
            </text>
          );
        }}
      ></Label>
    </Pie>
  </PieChart>
);

IndicatorGauge.propTypes = {
  score: PropTypes.number.isRequired,
  color: PropTypes.object.isRequired,
  size: PropTypes.number
};

IndicatorGauge.defaultProps = {
  size: 50
};

export default IndicatorGauge;
