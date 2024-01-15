import { useState } from 'react';
import { useParams } from 'react-router';

// material-ui
import { Box, Button, Grid, Stack, Typography } from '@mui/material';

// project import
import RollingAreaChart from './RollingAreaChart';
import MainCard from 'components/MainCard';
import ScoreCards from './ScoreCards';
import ProjectCard from './ProjectCard';

// types
import { useGetProjectQuery, useGetScoresQuery, useGetRollingWeekQuery, useGetRollingMonthQuery } from 'store/reducers/projectsApi';

// ==============================|| PROJECT - DEFAULT ||============================== //

const ProjectDefault = () => {
  const projectId = useParams().projectId;
  const { data: project } = useGetProjectQuery(projectId);
  const { data: scores } = useGetScoresQuery(projectId);
  const { data: weekChartData } = useGetRollingWeekQuery(projectId);
  const { data: monthChartData } = useGetRollingMonthQuery(projectId);
  const [slot, setSlot] = useState('week');

  return (
    <Grid container rowSpacing={4} columnSpacing={2.75}>
      <Grid item xs={12}>
        <ProjectCard project={project} />
      </Grid>
      <Grid item xs={12} sm={3} flexDirection="column">
        <Grid item sx={{ mb: 2 }}>
          <Typography variant="h5">Key Indicators</Typography>
        </Grid>
        <ScoreCards scores={scores} />
      </Grid>
      <Grid item xs={12} sm={9}>
        <Grid container sx={{ mb: 1 }} alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Rolling Chart</Typography>
          </Grid>
          <Grid item>
            <Stack direction="row" alignItems="center" spacing={0}>
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
        <MainCard content={false}>
          <Box sx={{ pt: 1, pr: 2 }}>
            <RollingAreaChart slot={slot} weekData={weekChartData} monthData={monthChartData} />
          </Box>
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default ProjectDefault;
