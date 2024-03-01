import PropTypes from 'prop-types';
import { Grid, Card, CardContent, CardHeader } from '@mui/material';
import IndicatorGauge from './IndicatorGauge';
import { getColorFromScore } from '~/config.js';

const ScoreCard = ({ score }) => (
  <Card>
    <CardHeader title="Score"></CardHeader>
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
  score: PropTypes.number.isRequired
};

export default ScoreCard;
