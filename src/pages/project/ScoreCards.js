import PropTypes from 'prop-types';

// material-ui
import { Grid, CircularProgress } from '@mui/material';

// project import
import Indicator from 'components/cards/statistics/Indicator';
import theme from './theme';

// ==============================|| SCORE CARDS ||============================== //

const ScoreCards = ({ scores }) => {
  if (scores === undefined) {
    return <CircularProgress />;
  } else {
    return scores.map((score) => {
      const categoryTheme = theme[score.category];
      return (
        <Grid item xs={12} key={score.category}>
          <Indicator
            title={score.category}
            score={score.score}
            date={score.date}
            iconName={categoryTheme.icon}
            iconColor={categoryTheme.color}
          />
        </Grid>
      );
    });
  }
};

ScoreCards.propTypes = {
  scores: PropTypes.array
};

export default ScoreCards;
