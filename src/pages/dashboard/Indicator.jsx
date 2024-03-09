import PropTypes from 'prop-types';
import TestRenderer from 'react-test-renderer';
import { BarChart, Bar, XAxis, YAxis, Cell } from 'recharts';
import { categoriesTheme, getSeverityFromScore, severities } from '~/config';

const Indicator = ({ data, onClickCategory }) => {
  data = data.map((datum) => ({
    ...datum,
    severity: getSeverityFromScore(datum.score).name
  }));

  const getIconPath = (icon) => {
    const iconComponent = TestRenderer.create(icon);
    const iconJson = iconComponent.toJSON();
    return iconJson.children[0].props.d;
  };

  const handleClick = (data) => {
    onClickCategory(data.category);
  };

  const renderCustomAxisTick = ({ x, y, payload }) => {
    return (
      <>
        <svg x={x - 90} y={y - 10} width={17} height={17} viewBox="0 0 24 24" fill={categoriesTheme[payload.value].color[500]}>
          <path d={getIconPath(categoriesTheme[payload.value].icon)} />
        </svg>
        <svg x={x - 65} y={y - 11} width={100} height={100} fill={categoriesTheme[payload.value].color[500]}>
          <text y="15" fontSize="13">
            {payload.value}
          </text>
        </svg>
      </>
    );
  };

  return (
    <BarChart width={250} height={100} data={data} layout="vertical" barSize={15} margin={{ top: 7, bottom: 6, right: 30, left: 5 }}>
      <defs>
        {severities.map((item) => (
          <linearGradient key={item.name} id={item.name} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={item.color[100]} stopOpacity={0} />
            <stop offset="100%" stopColor={item.color[700]} stopOpacity={1} />
          </linearGradient>
        ))}
      </defs>
      <Bar dataKey="score" fill="#8884d8" label={{ position: 'right' }} onClick={handleClick} cursor="pointer">
        {data.map((item) => (
          <Cell key={item.category} fill={`url(#${item.severity})`} />
        ))}
      </Bar>
      <XAxis type="number" domain={[0, 100]} hide />
      <YAxis type="category" dataKey="category" width={100} interval={0} axisLine={false} tickLine={0} tick={renderCustomAxisTick} />
    </BarChart>
  );
};

Indicator.propTypes = {
  data: PropTypes.array.isRequired,
  onClickCategory: PropTypes.func.isRequired
};

export default Indicator;
