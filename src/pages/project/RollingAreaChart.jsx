import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import { AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';
import { categoriesTheme } from '~/config.js';

const RollingAreaChart = ({ data, selectedCategory }) => {
  const theme = useTheme();
  const fontStyle = {
    fontSize: theme.typography.body2.fontSize,
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.body2.fontWeight,
    lineHeight: theme.typography.body2.lineHeight
  };

  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart
        data={data}
        margin={{
          top: 15,
          right: 10,
          left: -25,
          bottom: -10
        }}
      >
        <defs>
          {data &&
            Object.entries(data[0]).map(([key]) => {
              if (key !== 'name')
                return (
                  <linearGradient key={key} id={key} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={categoriesTheme[key].color[300]} stopOpacity={0.5} />
                    <stop offset="95%" stopColor={categoriesTheme[key].color[300]} stopOpacity={0} />
                  </linearGradient>
                );
            })}
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="name" style={fontStyle} />
        <YAxis style={fontStyle} axisLine={false} tick={true} domain={[0, 100]} />
        <Tooltip itemStyle={fontStyle} />
        {/* <Legend
          verticalAlign="bottom"
          height={36}
          wrapperStyle={{ ...fontStyle, position: 'relative', marginTop: '-40px' }}
          iconType="circle"
          iconSize={12}
        /> */}
        {data &&
          Object.entries(data[0]).map(([key]) => {
            if (key === selectedCategory)
              return (
                <Area
                  connectNulls
                  type="monotone"
                  dataKey={key}
                  key={key}
                  fillOpacity={1}
                  stroke={categoriesTheme[key].color[700]}
                  strokeWidth={2}
                  fill={`url(#${key})`}
                />
              );
          })}
      </AreaChart>
    </ResponsiveContainer>
  );
};

RollingAreaChart.propTypes = {
  data: PropTypes.array,
  selectedCategory: PropTypes.string
};

export default RollingAreaChart;
