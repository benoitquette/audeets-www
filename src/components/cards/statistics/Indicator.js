import PropTypes from 'prop-types';

// material-ui
import { Grid, Stack, Typography, Avatar, Icon } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import { capitalize } from 'utils/string-helpers';

// ==============================|| INDICATOR CARD  ||============================== //

const Indicator = ({ title, score, date, iconName, iconColor }) => (
  <MainCard contentSX={{ pt: 2, mb: -1 }}>
    <Grid container justifyContent="space-between" alignItems="flex-start" flexWrap="wrap" border="1">
      <Grid item xs={1} sx={{ mr: 2 }}>
        {iconName && (
          <Avatar sx={{ bgcolor: iconColor }}>
            <Icon>{iconName}</Icon>
          </Avatar>
        )}
      </Grid>

      <Grid item xs={7}>
        <Stack>
          <Typography variant="h6">{capitalize(title)}</Typography>
          <Typography variant="caption" color="textSecondary">
            {new Date(date).toLocaleDateString('en-us', { month: 'long', day: 'numeric', year: 'numeric' })}
          </Typography>
        </Stack>
      </Grid>
      <Grid item xs={2}>
        <Typography variant="h2" color="inherit">
          {score}
        </Typography>
      </Grid>
    </Grid>
  </MainCard>
);

Indicator.propTypes = {
  title: PropTypes.string,
  score: PropTypes.number,
  date: PropTypes.date,
  iconName: PropTypes.string,
  iconColor: PropTypes.string
};

Indicator.defaultProps = {
  color: 'primary'
};

export default Indicator;
