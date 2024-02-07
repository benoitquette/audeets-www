import PropTypes from 'prop-types';
import { Button } from '@mui/material';

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
