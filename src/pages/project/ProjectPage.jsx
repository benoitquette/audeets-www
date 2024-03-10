import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from '@mui/material';
import dayjs from 'dayjs';
import ScoreCard from './score/ScoreCard';
import HeaderCard from './header/HeaderCard';
import EvolutionCard from './evolution/EvolutionCard';
import AuditCard from './audit/AuditCard';
import useSetFilters from './useSetFilters';
import { categoriesTheme } from '~/config';
import { useGetProjectQuery } from '~/store/reducers/projects-api';
import { fetchScores } from '~/store/reducers/audits';

const ProjectPage = () => {
  const dispatch = useDispatch();
  const [score, setScore] = useState(0);
  const [filter, setFilter] = useState({ url: null, date: null, category: null });

  const projectId = useParams().projectId;
  const { data: project } = useGetProjectQuery(projectId);
  const { data: scores } = useSelector((state) => state.audits.scores);
  useSetFilters(project, scores, filter, setFilter, setScore);

  useEffect(() => {
    if (filter.url)
      dispatch(
        fetchScores({
          id: projectId,
          url: filter.url,
          date: filter.date && dayjs(filter.date).format('YYYYMMDD')
        })
      );
  }, [projectId, filter.url, filter.date, dispatch]);

  const categories = scores.map((item) => ({
    name: item.category,
    ...categoriesTheme[item.category]
  }));

  return (
    <Grid container rowSpacing={3} columnSpacing={2.75}>
      <Grid item xs={12}>
        {project && filter.url && (
          <HeaderCard
            {...project}
            handleUrlChange={(url) => {
              const newUrl = new URL(url, `https://${project.domain}`).href;
              setFilter((state) => ({ ...state, url: newUrl }));
            }}
            selectedUrl={new URL(filter.url).pathname}
            categories={categories}
            selectedCategory={filter.category}
            handleCategoryChange={(category) => {
              setFilter((state) => ({ ...state, category }));
            }}
            selectedDate={filter.date}
            handleDateChange={() => {
              setFilter((state) => ({ ...state, date: null }));
            }}
          />
        )}
      </Grid>
      <Grid item xs={12} sm={4} md={3} lg={2}>
        <ScoreCard category={filter.category} score={score} />
      </Grid>
      <Grid item xs={12} sm={8} md={9} lg={10}>
        <EvolutionCard
          projectId={projectId}
          selectedCategory={filter.category}
          selectDate={(date) => {
            setFilter((state) => ({ ...state, date }));
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <AuditCard projectId={projectId} filter={filter} />
      </Grid>
    </Grid>
  );
};

export default ProjectPage;
