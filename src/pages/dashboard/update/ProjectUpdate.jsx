import { Grid, Typography, Card } from '@mui/material';
import ProjectUpdateForm from './ProjectUpdateForm';

const ProjectUpdate = () => {
  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid item xs={12}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Update project</Typography>
          </Grid>
        </Grid>
        <Grid item>
          <Card sx={{ mt: 2, p: 2 }}>
            <ProjectUpdateForm />
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProjectUpdate;
