import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const useSetFilters = (project, scores, filter, setFilter, setScore) => {
  if (!filter.url && project) {
    const url = new URL(project.urls[0], `https://${project.domain}`).href;
    setFilter((state) => ({ ...state, url }));
  }

  useEffect(() => {
    if (project) {
      const url = new URL(project.urls[0], `https://${project.domain}`).href;
      setFilter((state) => ({ ...state, url }));
    }
  }, [project]);

  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.has('category')) {
      setFilter((state) => ({ ...state, category: params.get('category') }));
      navigate(location.pathname);
    }
  });

  useEffect(() => {
    if (scores.length > 0) {
      setFilter((state) => ({
        ...state,
        category: filter.category || scores[0].category
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scores]);

  useEffect(() => {
    setScore(scores.reduce((scoreNumber, score) => (filter.category && score.category === filter.category ? score.score : scoreNumber), 0));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scores, filter.category, filter.date]);

  useEffect(() => {
    setFilter((state) => ({
      ...state,
      date: scores.reduce((date, score) => (score.category === filter.category ? score.date : date), null)
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scores, filter.category]);
};

export default useSetFilters;
