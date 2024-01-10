import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

// material-ui
import { Box, Button, Grid, Stack } from '@mui/material';

// project import
// import OrdersTable from './OrdersTable';
import RollingAreaChart from './RollingAreaChart';
import MainCard from 'components/MainCard';
import ScoreCards from './ScoreCards';
import ProjectCard from './ProjectCard';

// types
import { selectors as projectsSelectors } from 'store/reducers/projects';
import { fetchLatestScore, selectors as scoresSelectors } from 'store/reducers/scores';
import { fetchRollingWeek, selectors as chartsSelectors } from 'store/reducers/charts';

// ==============================|| PROJECT - DEFAULT ||============================== //

const ProjectDefault = () => {
  const dispatch = useDispatch();
  const projectId = useParams().projectId;
  const [slot, setSlot] = useState('week');
  const project = useSelector((state) => projectsSelectors.selectById(state, projectId));
  const scores = useSelector(scoresSelectors.selectAll);
  const weekChartData = useSelector(chartsSelectors.selectAll);

  // fetch scores
  useEffect(() => {
    dispatch(fetchLatestScore(projectId));
    dispatch(fetchRollingWeek(projectId));
  }, [dispatch, projectId]);

  return (
    <Grid container rowSpacing={4} columnSpacing={2.75}>
      <Grid item xs={12}>
        <ProjectCard project={project} />
      </Grid>
      <ScoreCards scores={scores} />
      <Grid item xs={12}>
        <Grid container justifyContent="flex-end">
          <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
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
        <MainCard content={false}>
          <Box sx={{ pt: 1, pr: 2 }}>
            <RollingAreaChart slot={slot} weekData={weekChartData} />
          </Box>
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default ProjectDefault;
