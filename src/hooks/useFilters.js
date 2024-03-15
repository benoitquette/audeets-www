import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const useFilters = (project) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [filter, setFilter] = useState({ url: null, date: null, category: null });

  /**
   * Initialize the URL filter once the project is loaded
   */
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
      setFilter((state) => ({ ...state, category: params.get('category') }));
      navigate(location.pathname);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return [filter, setFilter];
};

export default useFilters;
