import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, Grid, Typography, Link, Tooltip } from '@mui/material';
import { useGetProjectsQuery } from '~/store/reducers/projects-api';
import { WarningOutlined } from '@ant-design/icons';
import ProjectCard from './ProjectCard';

const Dashboard = () => {
  const { data: projects } = useGetProjectsQuery();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const limitReached = projects.length >= user.projectsMax;

  const handleClickCategory = (projectId, category) => {
    navigate(`/project/${projectId}?category=${category}`);
  };

  const handleEditProject = (projectId) => {
    navigate(`${projectId}/update`);
  };

  const handleViewProject = (projectId) => {
    navigate(`/project/${projectId}`);
  };

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
      </Grid>
      {projects.map((project, index) => (
        <Grid key={index} item>
          <ProjectCard
            {...project}
            onViewCategory={handleClickCategory}
            onEditProject={handleEditProject}
            onViewProject={handleViewProject}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default Dashboard;
