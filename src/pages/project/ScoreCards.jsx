import PropTypes from 'prop-types';
import { List } from '@mui/material';
import Indicator from './Indicator';
import { categoriesTheme } from '~/config.js';
import MainCard from '~/components/MainCard';

const ScoreCards = ({ scores }) => (
  <MainCard contentSX={{ m: 0, p: 0, mb: -2 }}>
    <List>
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

ScoreCards.propTypes = {
  scores: PropTypes.array.isRequired
};

export default ScoreCards;
