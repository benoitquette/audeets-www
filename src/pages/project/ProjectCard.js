import PropTypes from 'prop-types';

// material-ui
import { Grid, Stack, Typography, Avatar } from '@mui/material';

// project import
import MainCard from 'components/MainCard';

// ==============================|| PROJECT CARD ||============================== //

const ProjectCard = ({ project }) => {
  return (
    <MainCard sx={{ mt: 2 }}>
      <Stack spacing={3}>
        <Grid container justifyContent="flex-start" alignItems="center">
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
};

ProjectCard.propTypes = {
  project: PropTypes.object.isRequired
};

export default ProjectCard;
