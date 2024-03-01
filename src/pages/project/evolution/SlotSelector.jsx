import PropTypes from 'prop-types';
import { Button, Box } from '@mui/material';

const SlotSelector = ({ slot, onClick }) => (
  <Box sx={{ mt: 0.5, mr: 2 }}>
    <Button
      size="small"
      onClick={() => onClick('year')}
      color={slot === 'year' ? 'primary' : 'secondary'}
      variant={slot === 'year' ? 'outlined' : 'text'}
    >
      Year
    </Button>
    <Button
      size="small"
      onClick={() => onClick('month')}
      color={slot === 'month' ? 'primary' : 'secondary'}
      variant={slot === 'month' ? 'outlined' : 'text'}
    >
      Month
    </Button>
    <Button
      size="small"
      onClick={() => onClick('week')}
      color={slot === 'week' ? 'primary' : 'secondary'}
      variant={slot === 'week' ? 'outlined' : 'text'}
    >
      Week
    </Button>
  </Box>
);

SlotSelector.propTypes = {
  slot: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default SlotSelector;
