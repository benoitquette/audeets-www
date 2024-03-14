import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const useSetFilters = (project, scores, filter, setFilter, setScore) => {
  const navigate = useNavigate();
  const location = useLocation();

  if (!filter.url && project) {
    const url = new URL(project.urls[0], `https://${project.domain}`).href;
    setFilter((state) => ({ ...state, url }));
  }

  /**
   * When a new project is loaded, we update the filter with the first URL of this project
   */
  useEffect(() => {
    if (project) {
      const url = new URL(project.urls[0], `https://${project.domain}`).href;
      setFilter((state) => ({ ...state, url }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project]);

  /**
   * When mounting the component we check if there is a category in the URL
   * and potentially set the filter with it
   */
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.has('category')) {
      console.log('and we have a param');
      setFilter((state) => ({ ...state, category: params.get('category') }));
      navigate(location.pathname);
    }
  }, [location]);

  /**
   * When the scores change, we need to:
   *  - make sure that the selected category is present. If not, we force select the first one. TO FIX?
   *  - we need to "recalculate" the score.
   *  - we need to ensure the selected date has data.
   */
  useEffect(() => {
    if (scores.length > 0) {
      setFilter((state) => {
        const newCategory = state.category || scores[0].category;
        return {
          ...state,
          category: newCategory,
          date: scores.reduce(
            (date, score) => (score.category === newCategory ? score.date : date),
            null
          )
        };
      });
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

  /**
   * When the category filter change, we need to ensure the selected date has data.
   */
  useEffect(() => {
    setFilter((state) => ({
      ...state,
      date: scores.reduce(
        (date, score) => (score.category === filter.category ? score.date : date),
        null
      )
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter.category]);
};

export default useSetFilters;
