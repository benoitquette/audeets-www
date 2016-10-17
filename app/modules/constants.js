module.exports = {
  shortDateFormat: 'YYYYMMDD',
  longDateFormat: 'dddd, MMMM Do YYYY, h:mm:ss a',
  rollingCharts: {
    week: {
      id: 1,
      label: "Last Week",
      subtitle: "Rolling Week",
      dateFormat: "DD/MM"
    },
    month: {
      id: 2,
      label: "Last Month",
      subtitle: "Rolling Month",
      dateFormat: "DD/MM"
    },
    year: {
      id: 3,
      label: "Last Year",
      subtitle: "Rolling Year",
      dateFormat: "MMM YY"
    }
  }
};
