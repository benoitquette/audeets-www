import { useEffect, useState } from 'react';

const useScore = (scores, filter) => {
  const [score, setScore] = useState(0);

  /**
   * When the scores change, we need to "recalculate" the score.
   */
  useEffect(() => {
    if (scores.length > 0) {
      setScore(
        scores.reduce(
          (scoreNumber, score) =>
            filter.category && score.category === filter.category ? score.score : scoreNumber,
          0
        )
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scores]);

  /**
   * When the category filter or the date filters change we need to "recalculate" the score.
   */
  useEffect(() => {
    setScore(
      scores.reduce(
        (scoreNumber, score) =>
          filter.category && score.category === filter.category ? score.score : scoreNumber,
        0
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter.category, filter.date]);

  return score;
};

export default useScore;
