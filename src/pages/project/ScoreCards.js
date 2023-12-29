import PropTypes from 'prop-types';

// material-ui
import { Grid } from '@mui/material';

// project import
import Indicator from 'components/cards/statistics/Indicator';

// ==============================|| SCORE CARDS ||============================== //

const ScoreCards = ({ scores }) => {
  return scores.map((score) => {
    return (
      <Grid item xs={12} sm={6} md={12 / scores.length} key={score.category}>
        <Indicator title={score.category} count={`${score.score}%`} percentage={59.3} />
      </Grid>
    );
  });
};

ScoreCards.propTypes = {
  scores: PropTypes.array.isRequired
};

export default ScoreCards;
