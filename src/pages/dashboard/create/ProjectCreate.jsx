import { Card, Grid, Typography } from '@mui/material';
import ProjectCreateStepper from './ProjectCreateStepper';

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
          <Card sx={{ mt: 2, p: 2 }}>
            <ProjectCreateStepper />
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProjectCreate;
