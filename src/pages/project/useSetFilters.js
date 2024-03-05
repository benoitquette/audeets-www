import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const useSetFilters = (project, scores, filter, setFilter, setScore) => {
  if (!filter.url && project) {
    const url = new URL(project.urls[0], `https://${project.domain}`).href;
    setFilter((state) => ({ ...state, url }));
  }

  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.has('category')) {
      setFilter((state) => ({ ...state, category: params.get('category') }));
      navigate(location.pathname);
    }
  }, []);

  useEffect(() => {
    if (scores.length > 0) {
      setFilter((state) => ({
        ...state,
        category: filter.category || scores[0].category
      }));
    }
  }, [scores]);

  useEffect(() => {
    setScore(scores.reduce((scoreNumber, score) => (filter.category && score.category === filter.category ? score.score : scoreNumber), 0));
    setFilter((state) => ({
      ...state,
      date: scores.reduce((date, score) => (score.category === filter.category ? score.date : date), null)
    }));
  }, [scores, filter.category]);
};

export default useSetFilters;
