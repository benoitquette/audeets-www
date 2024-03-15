import { Grid } from '@mui/material';
import ScoreCard from './score/ScoreCard';
import HeaderCard from './header/HeaderCard';
import EvolutionCard from './evolution/EvolutionCard';
import AuditCard from './audit/AuditCard';
import useFetchProjectScores from '~/hooks/useFetchProjectScores';
import useFilters from '~/hooks/useFilters';
import useScore from '~/hooks/useScore';
import useFetchProject from '~/hooks/useFetchProject';

const ProjectPage = () => {
  const project = useFetchProject();
  const [filter, setFilter] = useFilters(project);
  const { scores, categories } = useFetchProjectScores(project?._id, filter, setFilter);
  const score = useScore(scores, filter);

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
        {project && (
          <EvolutionCard
            projectId={project._id}
            selectedCategory={filter.category}
            selectDate={(date) => {
              setFilter((state) => ({ ...state, date }));
            }}
          />
        )}
      </Grid>
      <Grid item xs={12}>
        {project && <AuditCard projectId={project._id} filter={filter} />}
      </Grid>
    </Grid>
  );
};

export default ProjectPage;
