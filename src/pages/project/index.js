import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

// material-ui
import { Box, Button, Unstable_Grid2 as Grid, Stack, Typography } from '@mui/material';

// project import
import OrdersTable from './OrdersTable';
import IncomeAreaChart from './IncomeAreaChart';
import MainCard from 'components/MainCard';
import ScoresGrid from './ScoresGrid';
import ProjectCard from './ProjectCard';

// types
import { fetchLatestScore, selectors as scoresSelectors } from 'store/reducers/scores';
import { selectors as projectsSelectors } from 'store/reducers/projects';

// ==============================|| PROJECT - DEFAULT ||============================== //

const ProjectDefault = () => {
  const dispatch = useDispatch();
  const projectId = useParams().projectId;
  const [slot, setSlot] = useState('week');
  const project = useSelector((state) => projectsSelectors.selectById(state, projectId));
  const scores = useSelector(scoresSelectors.selectAll);

  // fetch scores
  useEffect(() => {
    dispatch(fetchLatestScore(projectId));
  }, [dispatch, projectId]);

  return (
    <Grid container rowSpacing={4} columnSpacing={2.75}>
      {/* row 1 */}
      <Grid xs={12}>
        <Stack container xs={12} sm={6}>
          <ProjectCard project={project} />
          <Grid container>
            <ScoresGrid scores={scores} />
            <ScoresGrid scores={scores} />
          </Grid>
        </Stack>
        <Grid container xs={12} md={6}>
          <MainCard content={false}>
            <Box sx={{ pt: 1, pr: 2 }}>
              <IncomeAreaChart slot={slot} />
            </Box>
          </MainCard>
          <Grid alignItems="right" justifyContent="flex-end">
            <Grid>
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
        </Grid>
      </Grid>
      {/* row 2 */}
      <Grid xs={12}>
        <Typography variant="h5">Recent Orders</Typography>
        <MainCard content={false}>
          <OrdersTable />
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default ProjectDefault;
