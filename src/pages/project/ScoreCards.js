import PropTypes from 'prop-types';

// material-ui
import { CircularProgress, List } from '@mui/material';

// project import
import Indicator from 'components/cards/statistics/Indicator';
import categoriesTheme from './categories-theme';
import MainCard from 'components/MainCard';

// avatar style
const avatarSX = {
  width: 36,
  height: 36,
  fontSize: '1rem'
};

// action style
const actionSX = {
  mt: 0.75,
  ml: 1,
  top: 'auto',
  right: 'auto',
  alignSelf: 'flex-start',
  transform: 'none'
};

// ==============================|| SCORE CARDS ||============================== //

const ScoreCards = ({ scores }) => {
  if (scores === undefined) {
    return <CircularProgress />;
  } else {
    return (
      <MainCard sx={{ mt: 2 }} content={false}>
        <List
          component="nav"
          sx={{
            px: 0,
            py: 0,
            '& .MuiListItemButton-root': {
              py: 1.5,
              '& .MuiAvatar-root': avatarSX,
              '& .MuiListItemSecondaryAction-root': { ...actionSX, position: 'relative' }
            }
          }}
        >
          {scores.map((score) => {
            const categoryTheme = categoriesTheme[score.category];
            return (
              <Indicator
                key={score.category}
                title={score.category}
                score={score.score}
                date={score.date}
                iconName={categoryTheme.icon}
                iconColor={categoryTheme.color}
              />
            );
          })}
        </List>
      </MainCard>
    );
  }
};

ScoreCards.propTypes = {
  scores: PropTypes.array
};

export default ScoreCards;
