import PropTypes from 'prop-types';

// material-ui
import { Grid } from '@mui/material';

// project import
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';

// ==============================|| SCORES GRID ||============================== //

const ScoresGrid = ({ scores }) => {
  return (
    <Grid>
      {scores.map((score) => {
        return <AnalyticEcommerce title={score.category} key={score.category} count={`${score.score}%`} percentage={59.3} />;
      })}
    </Grid>
  );
};

ScoresGrid.propTypes = {
  scores: PropTypes.array.isRequired
};

export default ScoresGrid;
