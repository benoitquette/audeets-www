import PropTypes from 'prop-types';
import { Stack, Typography, Avatar, Icon, ListItemAvatar, ListItemButton, ListItemSecondaryAction, ListItemText } from '@mui/material';
import { capitalize } from '~/utils/string-helpers';
import IndicatorGauge from './IndicatorGauge';

const Indicator = ({ title, score, date, iconName, iconColor }) => (
  <ListItemButton divider>
    <ListItemAvatar>
      <Avatar sx={{ color: iconColor[500], bgcolor: iconColor[100] }}>
        <Icon>{iconName}</Icon>
      </Avatar>
    </ListItemAvatar>
    <ListItemText
      primary={<Typography variant="subtitle1">{capitalize(title)}</Typography>}
      secondary={new Date(date).toLocaleDateString('en-us', { month: 'long', day: 'numeric', year: 'numeric' })}
    />
    <ListItemSecondaryAction>
      <Stack alignItems="flex-end">
        <IndicatorGauge value={score}></IndicatorGauge>
        {/* <Typography variant="subtitle1" noWrap>
          {score}%
        </Typography>
        <Typography variant="h6" color="secondary" noWrap></Typography> */}
      </Stack>
    </ListItemSecondaryAction>
  </ListItemButton>
);

Indicator.propTypes = {
  title: PropTypes.string,
  score: PropTypes.number,
  date: PropTypes.string,
  iconName: PropTypes.string,
  iconColor: PropTypes.object
};

Indicator.defaultProps = {
  color: 'primary'
};

export default Indicator;
