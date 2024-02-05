import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

// third-party
import ReactApexChart from 'react-apexcharts';

// project import
import { capitalize } from '~/utils/string-helpers';
import categoriesTheme from './categories-theme';

// chart options
const areaChartOptions = {
  chart: {
    height: 450,
    type: 'area',
    toolbar: {
      show: false
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth',
    width: 2
  },
  grid: {
    strokeDashArray: 0
  },
  legend: {
    show: true,
    showForSingleSeries: true,
    showForNullSeries: true,
    showForZeroSeries: true,
    horizontalAlign: 'center'
  },
  tooltip: {
    theme: 'light'
  }
};

// ==============================|| ROLLING AREA CHART ||============================== //

const buildCategories = (slot, data) => {
  const options = slot == 'week' ? { weekday: 'short' } : { month: 'short' };
  return data === undefined || data.length === 0
    ? []
    : data[0].data.map((datum) => new Date(datum.date).toLocaleDateString('en-us', options));
};

const RollingAreaChart = ({ slot, weekData, monthData }) => {
  const data = slot === 'week' ? weekData : monthData;
  const [options, setOptions] = useState(areaChartOptions);
  const [series, setSeries] = useState([]);

  useEffect(() => {
    if (data !== undefined && data.length > 0) {
      setSeries(
        Array.from(data, (category) => ({
          name: capitalize(category.category),
          data: Array.from(category.data, (item) => item.score)
        }))
      );
      setOptions((prevState) => ({
        ...prevState,
        colors: Array.from(data, (category) => categoriesTheme[category.category].color[500]),
        xaxis: {
          categories: buildCategories(slot, data),
          tickAmount: data === undefined ? 0 : data.length - 1
        }
      }));
    }
  }, [slot, data]);

  return <ReactApexChart options={options} series={series} type="area" height="287" />;
};

RollingAreaChart.propTypes = {
  slot: PropTypes.string,
  weekData: PropTypes.array,
  monthData: PropTypes.array
};

export default RollingAreaChart;
