import PropTypes from 'prop-types';
import { BarChart, Bar, XAxis, YAxis } from 'recharts';
import { categoriesTheme } from '~/config.js';

const Indicator = ({ data, onClickCategory }) => {
  data = data.map((datum) => ({
    ...datum,
    fill: categoriesTheme[datum.category].color[300]
  }));

  const handleClick = (data) => {
    onClickCategory(data.category);
  };

  return (
    <BarChart width={300} height={100} data={data} layout="vertical" barSize={15} margin={{ top: 7, bottom: 6, right: 25 }}>
      <Bar dataKey="score" fill="#8884d8" label={{ position: 'right' }} onClick={handleClick} cursor="pointer" />
      <XAxis type="number" domain={['auto', 'auto']} hide />
      <YAxis type="category" dataKey="category" width={100} interval={0} axisLine={false} tickLine={0} />
    </BarChart>
  );
};

Indicator.propTypes = {
  data: PropTypes.array.isRequired,
  onClickCategory: PropTypes.func.isRequired
};

export default Indicator;
