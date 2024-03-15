import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { fetchScores } from '~/store/reducers/audits';
import { categoriesTheme } from '~/config';

const useFetchProjectScores = (projectId, filter, setFilter) => {
  const dispatch = useDispatch();
  const { data: scores } = useSelector((state) => state.audits.scores);
  const categories = scores?.map((item) => ({
    name: item.category,
    ...categoriesTheme[item.category]
  }));

  useEffect(() => {
    if (filter?.url)
      dispatch(
        fetchScores({
          id: projectId,
          url: filter.url,
          date: filter.date && dayjs(filter.date).format('YYYYMMDD')
        })
      );
  }, [projectId, filter.url, filter.date, dispatch]);

  /**
   * When the scores change, we need to:
   *  - make sure that the selected category is present. If not, we force select the first one.
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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scores]);

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

  return { scores, categories };
};

export default useFetchProjectScores;
