import { useEffect } from 'react';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAudit } from '~/store/reducers/audits';

const useFetchAudit = (projectId, filter) => {
  const dispatch = useDispatch();

  const { data } = useSelector((state) => state.audits.audit);
  const results = data.filter((result) => result.category === filter.category);

  useEffect(() => {
    if (filter.url && filter.date)
      dispatch(
        fetchAudit({
          id: projectId,
          url: filter.url,
          date: dayjs(filter.date).format('YYYYMMDD')
        })
      );
  }, [dispatch, filter.date, filter.url, projectId]);

  return results;
};

export default useFetchAudit;
