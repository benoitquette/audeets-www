import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { fetchScores } from '~/store/reducers/audits';
import { categoriesTheme } from '~/config';

const useFetchProjectScores = (projectId, filter) => {
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

  return { scores, categories };
};

export default useFetchProjectScores;
