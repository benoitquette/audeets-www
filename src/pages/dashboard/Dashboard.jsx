import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, Grid, Typography, Link, Tooltip } from '@mui/material';
import ProjectsTable from './ProjectsTable';
import MainCard from '~/components/MainCard';
import { useGetProjectsQuery } from '~/store/reducers/projects-api';
import { WarningOutlined } from '@ant-design/icons';

const Dashboard = () => {
  const { data: projects } = useGetProjectsQuery();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const limitReached = projects.length >= user.projectsMax;
  return (
    <Grid container rowSpacing={3} columnSpacing={2.75}>
      <Grid item xs={12}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Projects</Typography>
          </Grid>
          <Grid item sx={{ mr: 0.5 }}>
            {limitReached && (
              <Tooltip title="Max number of projects reached">
                <WarningOutlined style={{ color: 'red' }} />
              </Tooltip>
            )}
            <Button
              sx={{ ml: 1 }}
              disabled={limitReached}
              component={Link}
              size="small"
              variant="contained"
              onClick={() => navigate('create')}
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

export default Dashboard;
