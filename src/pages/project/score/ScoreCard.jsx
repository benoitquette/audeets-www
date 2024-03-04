import PropTypes from 'prop-types';
import { Grid, Card, CardContent, CardHeader } from '@mui/material';
import IndicatorGauge from './IndicatorGauge';
import { getColorFromScore } from '~/config.js';

const ScoreCard = ({ category, score }) => (
  <Card>
    <CardHeader title={`${category} score`}></CardHeader>
    <CardContent sx={{ mt: -1 }}>
      <Grid container justifyContent="center">
        <Grid item>
          <IndicatorGauge score={score} color={getColorFromScore(score)} size={90} />
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);

ScoreCard.propTypes = {
  category: PropTypes.string,
  score: PropTypes.number
};

export default ScoreCard;
