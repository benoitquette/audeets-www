import { useState } from 'react';
import { useParams } from 'react-router';
import { Grid } from '@mui/material';
import ScoreCard from './score/ScoreCard';
import HeaderCard from './header/HeaderCard';
import EvolutionCard from './evolution/EvolutionCard';
import AuditCard from './audit/AuditCard';
import useSetFilters from '~/hooks/useSetFilters';
import { useGetProjectQuery } from '~/store/reducers/projects-api';
import useFetchProjectScores from '~/hooks/useFetchProjectScores';

const ProjectPage = () => {
  const projectId = useParams().projectId;
  const [score, setScore] = useState(0);
  const [filter, setFilter] = useState({ url: null, date: null, category: null });

  const { data: project } = useGetProjectQuery(projectId);
  const { scores, categories } = useFetchProjectScores(projectId, filter);
  useSetFilters(project, scores, filter, setFilter, setScore);
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
