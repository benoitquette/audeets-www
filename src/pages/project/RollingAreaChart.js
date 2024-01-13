import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
import ReactApexChart from 'react-apexcharts';

// project import
import { capitalize } from 'utils/string-helpers';

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
  }
};

// ==============================|| ROLLING AREA CHART ||============================== //

const buildCategories = (slot, data) => {
  const options = slot == 'week' ? { weekday: 'short' } : { month: 'short' };
  return data === undefined ? [] : data[0].data.map((datum) => new Date(datum.date).toLocaleDateString('en-us', options));
};

const RollingAreaChart = ({ slot, weekData, monthData }) => {
  const data = slot === 'week' ? weekData : monthData;

  const theme = useTheme();
  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;

  const [options, setOptions] = useState(areaChartOptions);
  const [series, setSeries] = useState([]);

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [theme.palette.primary.main, theme.palette.primary[700]],
      xaxis: {
        categories: buildCategories(slot, data),
        labels: {
          style: {
            colors: [
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary
            ]
          }
        },
        axisBorder: {
          show: true,
          color: line
        },
        tickAmount: data === undefined ? 0 : data.length - 1
      },
      yaxis: {
        labels: {
          style: {
            colors: [secondary]
          }
        }
      },
      grid: {
        borderColor: line
      },
      tooltip: {
        theme: 'light'
      }
    }));
  }, [primary, secondary, line, theme, slot, data]);

  useEffect(() => {
    if (data !== undefined) {
      setSeries(
        Array.from(data, (category) => ({
          name: capitalize(category.category),
          data: Array.from(category.data, (item) => item.score)
        }))
      );
    }
  }, [slot, data]);

  return <ReactApexChart options={options} series={series} type="area" height="375" />;
};

RollingAreaChart.propTypes = {
  slot: PropTypes.string,
  weekData: PropTypes.array,
  monthData: PropTypes.array
};

export default RollingAreaChart;
