import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
import ReactApexChart from 'react-apexcharts';

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

const RollingAreaChart = ({ slot, weekData, monthData }) => {
  const theme = useTheme();

  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;

  const [options, setOptions] = useState(areaChartOptions);

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [theme.palette.primary.main, theme.palette.primary[700]],
      xaxis: {
        categories:
          slot === 'month'
            ? ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
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
        tickAmount: slot === 'month' ? 11 : 7
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
  }, [primary, secondary, line, theme, slot]);

  const [series, setSeries] = useState([
    {
      name: 'Page Views',
      data: [0, 86, 28, 115, 48, 210, 136]
    },
    {
      name: 'Sessions',
      data: [0, 43, 14, 56, 24, 105, 68]
    }
  ]);

  useEffect(() => {
    let data = monthData;
    if (slot === 'week') {
      data = weekData;
    }
    if (data !== undefined) {
      setSeries(
        Array.from(data, (category) => ({
          name: category.category,
          data: Array.from(category.data, (item) => item.score)
        }))
      );
    }
  }, [slot, weekData, monthData]);

  return <ReactApexChart options={options} series={series} type="area" height="375" />;
};

RollingAreaChart.propTypes = {
  slot: PropTypes.string,
  weekData: PropTypes.array,
  monthData: PropTypes.array
};

export default RollingAreaChart;
