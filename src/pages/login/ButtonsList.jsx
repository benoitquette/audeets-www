import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { useMediaQuery, Stack } from '@mui/material';

// project imports
import strategies from './strategies';
import ButtonsListItem from './ButtonsListItem';

// ==============================|| LOGIN - BUTTONS ||============================== //

const ButtonsList = ({ returnUrl }) => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Stack
      direction="row"
      spacing={matchDownSM ? 1 : 2}
      justifyContent={matchDownSM ? 'space-around' : 'space-between'}
      sx={{ '& .MuiButton-startIcon': { mr: matchDownSM ? 0 : 1, ml: matchDownSM ? 0 : -0.5 } }}
    >
      {strategies.map((strategy) => (
        <ButtonsListItem
          key={strategy.name}
          name={strategy.name}
          url={`${strategy.url}?returnTo=${returnUrl}`}
          icon={strategy.icon}
          fullWidth={!matchDownSM}
        />
      ))}
    </Stack>
  );
};

ButtonsList.propTypes = {
  returnUrl: PropTypes.string.isRequired
};

export default ButtonsList;
