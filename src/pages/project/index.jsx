import { useState } from 'react';
import { useParams } from 'react-router';
import { Button, Grid, Stack, Typography } from '@mui/material';
import RollingAreaChart from './RollingAreaChart';
import MainCard from '~/components/MainCard';
import ScoreCards from './ScoreCards';
import { useGetScoresQuery, useGetRollingWeekQuery, useGetRollingMonthQuery, useGetRollingYearQuery } from '~/store/reducers/projectsApi';

const ProjectDefault = () => {
  const projectId = useParams().projectId;
  const { data: scores } = useGetScoresQuery(projectId);
  const { data: weekChartData } = useGetRollingWeekQuery(projectId);
  const { data: monthChartData } = useGetRollingMonthQuery(projectId);
  const { data: yearChartData } = useGetRollingYearQuery(projectId);
  const [slot, setSlot] = useState('week');

  let rollingData = null;
  switch (slot) {
    case 'week':
      rollingData = weekChartData;
      break;
    case 'month':
      rollingData = monthChartData;
      break;
    case 'year':
      rollingData = yearChartData;
      break;
  }

  return (
    <Grid container rowSpacing={4} columnSpacing={2.75}>
      <Grid item xs={12} />
      <Grid item xs={12} sm={5} md={4} lg={3} sx={{ mb: -2.25 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Latest scores
        </Typography>
        {scores && <ScoreCards scores={scores} />}
      </Grid>
      <Grid item xs={12} sm={7} md={8} lg={9}>
        <Grid container sx={{ mb: 1 }} alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Rolling chart</Typography>
          </Grid>
          <Grid item>
            <Stack direction="row" alignItems="center" spacing={0}>
              <Button
                size="small"
                onClick={() => setSlot('year')}
                color={slot === 'year' ? 'primary' : 'secondary'}
                variant={slot === 'year' ? 'outlined' : 'text'}
              >
                Year
              </Button>
              <Button
                size="small"
                onClick={() => setSlot('month')}
                color={slot === 'month' ? 'primary' : 'secondary'}
                variant={slot === 'month' ? 'outlined' : 'text'}
              >
                Month
              </Button>
              <Button
                size="small"
                onClick={() => setSlot('week')}
                color={slot === 'week' ? 'primary' : 'secondary'}
                variant={slot === 'week' ? 'outlined' : 'text'}
              >
                Week
              </Button>
            </Stack>
          </Grid>
        </Grid>
        <MainCard sx={{ p: 0 }}>
          <RollingAreaChart data={rollingData} />
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default ProjectDefault;
