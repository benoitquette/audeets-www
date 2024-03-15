import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery, Stack } from '@mui/material';
import ButtonsListItem from './ButtonsListItem';

const ButtonsList = ({ returnUrl, strategies }) => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
  const queryString = `?returnTo=${returnUrl}`;

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
          url={`${strategy.url}${queryString}`}
          icon={strategy.icon}
          fullWidth={!matchDownSM}
        />
      ))}
    </Stack>
  );
};

ButtonsList.propTypes = {
  returnUrl: PropTypes.string.isRequired,
  strategies: PropTypes.array.isRequired
};

export default ButtonsList;
