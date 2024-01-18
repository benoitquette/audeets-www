// material-ui
import { Grid, Typography } from '@mui/material';

// project import
import ProjectCreateStepper from './ProjectCreateStepper';
import MainCard from 'components/MainCard';

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const ProjectCreate = () => {
  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid item xs={12}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Create project</Typography>
          </Grid>
        </Grid>
        <Grid item>
          <MainCard sx={{ mt: 2, p: 2 }} content={false}>
            <ProjectCreateStepper />
          </MainCard>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProjectCreate;
