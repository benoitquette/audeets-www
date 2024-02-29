import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import MainCard from '~/components/MainCard';
import IndicatorGauge from './IndicatorGauge';
import { getColorFromScore } from '~/config.js';

const ScoreCard = ({ score, date }) => (
  <MainCard contentSX={{ mt: 0 }}>
    <Grid container justifyContent="center">
      <Grid item>
        <IndicatorGauge score={score} color={getColorFromScore(score)} size={100} />
      </Grid>
    </Grid>
  </MainCard>
);

ScoreCard.propTypes = {
  score: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired
};

export default ScoreCard;
