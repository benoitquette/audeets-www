import { useGetRollingWeekQuery, useGetRollingMonthQuery, useGetRollingYearQuery } from '~/store/reducers/projects-api';

const useGetRollingData = (projectId, slot) => {
  const { data: weekChartData } = useGetRollingWeekQuery(projectId);
  const { data: monthChartData } = useGetRollingMonthQuery(projectId);
  const { data: yearChartData } = useGetRollingYearQuery(projectId);
  switch (slot) {
    case 'week':
      return weekChartData;
    case 'month':
      return monthChartData;
    case 'year':
      return yearChartData;
  }
};

export default useGetRollingData;
