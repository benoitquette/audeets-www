import PropTypes from 'prop-types';
import { Grid, Stack, Typography, Avatar } from '@mui/material';
import MainCard from '~/components/MainCard';

const ProjectCard = ({ project }) => {
  return (
    project && (
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
    )
  );
};

ProjectCard.propTypes = {
  project: PropTypes.object
};

export default ProjectCard;
