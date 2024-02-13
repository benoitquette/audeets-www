import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

const chartOptions = {
  chart: {
    // type: 'radialBar',
    // offsetY: -10
  },
  grid: {
    padding: {
      left: -60,
      right: -60,
      top: -25,
      bottom: -10
    }
  },
  plotOptions: {
    radialBar: {
      startAngle: -135,
      endAngle: 135,
      dataLabels: {
        name: {
          show: false
        },
        value: {
          offsetY: 5,
          fontSize: '16px',
          color: undefined,
          formatter: function (val) {
            return val + '%';
          }
        }
      }
    }
  },
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'dark',
      shadeIntensity: 0.15,
      inverseColors: false,
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 50, 65, 91]
    }
  },
  stroke: {
    dashArray: 4
  }
};

const IndicatorGauge = ({ value }) => {
  const [options] = useState(chartOptions);
  const [series, setSeries] = useState([]);

  useEffect(() => {
    if (value) setSeries([value]);
  }, [value]);

  return <ReactApexChart options={options} series={series} type="radialBar" height={50} />;
};

IndicatorGauge.defaultProps = {
  value: PropTypes.number.isRequired
};

export default IndicatorGauge;
