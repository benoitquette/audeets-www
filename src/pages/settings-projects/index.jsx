import { useNavigate } from 'react-router-dom';

// material-ui
import { Button, Grid, Typography, Link, Tooltip } from '@mui/material';

// project import
import ProjectsTable from './ProjectsTable';
import MainCard from '~/components/MainCard';

// types
import { useGetProjectsQuery } from '~/store/reducers/projectsApi';

// assets
import { WarningOutlined } from '@ant-design/icons';

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const SettingsProject = () => {
  const { data: projects } = useGetProjectsQuery();
  const navigate = useNavigate();
  const limitReached = projects.length >= 5;
  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid item xs={12}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Projects</Typography>
          </Grid>
          <Grid item sx={{ mr: 0.5 }}>
            {limitReached && (
              <Tooltip title="Max number of 5 projects reached">
                <WarningOutlined style={{ color: 'red' }} />
              </Tooltip>
            )}
            <Button
              sx={{ ml: 1 }}
              disabled={limitReached}
              component={Link}
              size="small"
              variant="contained"
              onClick={() => navigate('/settings/projects/create')}
            >
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
