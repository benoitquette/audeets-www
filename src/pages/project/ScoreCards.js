import PropTypes from 'prop-types';

// material-ui
import { Grid, CircularProgress } from '@mui/material';

// project import
import Indicator from 'components/cards/statistics/Indicator';

// ==============================|| SCORE CARDS ||============================== //

const ScoreCards = ({ scores }) => {
  if (scores === undefined) {
    return <CircularProgress />;
  } else {
    return scores.map((score) => {
      return (
        <Grid item xs={12} key={score.category}>
          <Indicator title={score.category} count={`${score.score}%`} percentage={59.3} />
        </Grid>
      );
    });
  }
};

ScoreCards.propTypes = {
  scores: PropTypes.array
};

export default ScoreCards;
