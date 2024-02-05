import PropTypes from 'prop-types';

// material-ui
import { Button } from '@mui/material';

// ==============================|| CONNECT/LOGIN BUTTON ||============================== //

const ButtonsListItem = ({ name, icon, url, fullWidth }) => {
  return (
    <Button variant="outlined" color="secondary" fullWidth={fullWidth} startIcon={<img src={icon} alt={name} />} href={url}>
      {fullWidth && name}
    </Button>
  );
};

ButtonsListItem.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  fullWidth: PropTypes.bool.isRequired
};

export default ButtonsListItem;
