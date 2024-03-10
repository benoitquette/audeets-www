import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import { AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { categoriesTheme } from '~/config';

const RollingAreaChart = ({ data, selectedCategory, selectDate }) => {
  const theme = useTheme();
  const fontStyle = {
    fontSize: theme.typography.body2.fontSize,
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.body2.fontWeight,
    lineHeight: theme.typography.body2.lineHeight
  };

  const handleClick = (e) => {
    selectDate(e.activePayload[0].payload.date);
  };

  return (
    <ResponsiveContainer width="100%" height={95}>
      <AreaChart
        data={data}
        margin={{
          top: 0,
          right: 10,
          left: -25,
          bottom: -10
        }}
        onClick={handleClick}
      >
        <defs>
          {data &&
            data.length > 0 &&
            Object.entries(data[0]).map(([key]) => {
              if (key !== 'name' && key !== 'date')
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
        {data &&
          data.length > 0 &&
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
  selectedCategory: PropTypes.string,
  selectDate: PropTypes.func.isRequired
};

export default RollingAreaChart;
