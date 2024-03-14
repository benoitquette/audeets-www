import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGlobalScores, selectors } from '~/store/reducers/global-scores';

const useFetchProjectGlobalScores = (projectId) => {
  const dispatch = useDispatch();
  const scores = useSelector((state) => selectors.selectById(state, projectId));

  useEffect(() => {
    dispatch(fetchGlobalScores(projectId));
  });

  return scores;
};

export default useFetchProjectGlobalScores;
