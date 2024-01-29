import PropTypes from 'prop-types';

// material-ui
import { Grid, Stack, Typography, Avatar, CircularProgress } from '@mui/material';

// project import
import MainCard from '~/components/MainCard';

// ==============================|| PROJECT CARD ||============================== //

const ProjectCard = ({ project }) => {
  if (project === undefined) {
    return <CircularProgress />;
  } else {
    return (
      <MainCard sx={{ mt: 2 }}>
        <Stack spacing={3}>
          <Grid container justifyContent="flex-start" alignItems="flex-start">
            <Grid item sx={{ mr: 2 }}>
              <Avatar src={project.url + '/favicon.ico'} />
            </Grid>
            <Grid item>
              <Stack>
                <Typography variant="h5" noWrap>
                  {project.title}
                </Typography>
                <Typography variant="caption" color="secondary" noWrap>
                  {project.url}
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </MainCard>
    );
  }
};

ProjectCard.propTypes = {
  project: PropTypes.object
};

export default ProjectCard;
