// material-ui
import { Button, Grid, Typography } from '@mui/material';

// project import
import ProjectsTable from './ProjectsTable';
import MainCard from 'components/MainCard';

// types
import { useGetProjectsQuery } from 'store/reducers/projectsApi';

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const SettingsProject = () => {
  const { data: projects } = useGetProjectsQuery();
  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid item xs={12}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Projects</Typography>
          </Grid>
          <Grid item sx={{ mr: 0.5 }}>
            <Button size="small" variant="contained" href="/settings/projects/create">
              Create project
            </Button>
          </Grid>
        </Grid>
        <Grid item>
          <MainCard sx={{ mt: 2 }} content={false}>
            <ProjectsTable data={projects} />
          </MainCard>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SettingsProject;
