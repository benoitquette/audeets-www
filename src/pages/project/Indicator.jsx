import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Typography, Avatar, Icon, ListItemAvatar, ListItemButton, ListItemSecondaryAction, ListItemText } from '@mui/material';
import { capitalize } from '~/utils/string-helpers';
import IndicatorGauge from './IndicatorGauge';
import { getColorFromScore } from '~/config.js';
import dayjs from 'dayjs';

const Indicator = ({ title, score, date, iconName, iconColor }) => {
  const navigate = useNavigate();

  return (
    <ListItemButton onClick={() => navigate(`${title}/${dayjs(date).format('YYYYMMDD')}`)}>
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: iconColor[200] }}>
          <Icon>{iconName}</Icon>
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={<Typography variant="subtitle1">{capitalize(title)}</Typography>}
        secondary={new Date(date).toLocaleDateString('en-us', { month: 'long', day: 'numeric', year: 'numeric' })}
      />
      <ListItemSecondaryAction>
        <IndicatorGauge score={score} color={getColorFromScore(score)}></IndicatorGauge>
      </ListItemSecondaryAction>
    </ListItemButton>
  );
};

Indicator.propTypes = {
  title: PropTypes.string,
  score: PropTypes.number,
  date: PropTypes.string,
  iconName: PropTypes.string,
  iconColor: PropTypes.object
};

export default Indicator;
