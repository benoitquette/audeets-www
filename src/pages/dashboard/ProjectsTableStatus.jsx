import PropTypes from 'prop-types';

// material-ui
import { Stack, Typography } from '@mui/material';

// project import
import Dot from '~/components/@extended/Dot';

// ==============================|| PROJECTS TABLE - STATUS ||============================== //

const ProjectsTableStatus = ({ status }) => {
  let color;
  let title;

  switch (status) {
    case 0:
      color = 'warning';
      title = 'Pending';
      break;
    case 1:
      color = 'success';
      title = 'Approved';
      break;
    case 2:
      color = 'error';
      title = 'Rejected';
      break;
    default:
      color = 'primary';
      title = 'None';
  }

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Dot color={color} />
      <Typography>{title}</Typography>
    </Stack>
  );
};

ProjectsTableStatus.propTypes = {
  status: PropTypes.number
};

export default ProjectsTableStatus;
