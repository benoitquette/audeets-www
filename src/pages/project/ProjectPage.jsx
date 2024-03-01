import { useState } from 'react';
import { useParams } from 'react-router';
import { Grid } from '@mui/material';
import ScoreCard from './score/ScoreCard';
import {
  useGetProjectQuery,
  useGetScoresQuery,
  useGetRollingWeekQuery,
  useGetRollingMonthQuery,
  useGetRollingYearQuery,
  useGetAuditQuery
} from '~/store/reducers/projects-api';
import { categoriesTheme } from '~/config.js';
import dayjs from 'dayjs';
import HeaderCard from './header/HeaderCard';
import EvolutionCard from './evolution/EvolutionCard';
import AuditCard from './audit/AuditCard';

const ProjectPage = () => {
  const [slot, setSlot] = useState('week');
  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedUrl, setSelectedUrl] = useState();
  const [showFailsOnly, setshowFailsOnly] = useState(false);

  const projectId = useParams().projectId;
  const { data: weekChartData } = useGetRollingWeekQuery(projectId);
  const { data: monthChartData } = useGetRollingMonthQuery(projectId);
  const { data: yearChartData } = useGetRollingYearQuery(projectId);
  const { data: project } = useGetProjectQuery(projectId);
  if (!selectedUrl && project) setSelectedUrl(project.urls[0]);

  const absoluteSelectedUrl = project ? new URL(selectedUrl, `https://${project.domain}`).href : null;
  const { data: scores } = useGetScoresQuery({ id: projectId, url: absoluteSelectedUrl }, { skip: !absoluteSelectedUrl });

  const selectedDate = scores
    ? scores.reduce((date, score) => (selectedCategory && score.category === selectedCategory ? score.date : date), null)
    : null;
  const selectedScore = scores
    ? scores.reduce((scoreNumber, score) => (selectedCategory && score.category === selectedCategory ? score.score : scoreNumber), null)
    : 0;
  const { data: auditResults, isSuccess } = useGetAuditQuery(
    { id: projectId, date: dayjs(selectedDate).format('YYYYMMDD'), url: absoluteSelectedUrl },
    { skip: !scores || !absoluteSelectedUrl }
  );
  if (scores && !selectedCategory) setSelectedCategory(scores[0].category);
  const categories = scores
    ? scores.map((score) => ({
        name: score.category,
        ...categoriesTheme[score.category]
      }))
    : [];

  let rollingData = null;
  switch (slot) {
    case 'week':
      rollingData = weekChartData;
      break;
    case 'month':
      rollingData = monthChartData;
      break;
    case 'year':
      rollingData = yearChartData;
      break;
  }

  const filteredResults = auditResults ? auditResults.filter((result) => result.category === selectedCategory) : [];
  return (
    <Grid container rowSpacing={4} columnSpacing={2.75}>
      <Grid item xs={12}>
        {project && (
          <HeaderCard
            {...project}
            handleUrlChange={setSelectedUrl}
            selectedUrl={selectedUrl}
            categories={categories}
            selectedCategory={selectedCategory}
            handleCategoryChange={setSelectedCategory}
            selectedDate={selectedDate}
          />
        )}
      </Grid>
      <Grid item xs={12} sm={4} md={3} lg={2}>
        <ScoreCard score={selectedScore} />
      </Grid>
      <Grid item xs={12} sm={8} md={9} lg={10}>
        <EvolutionCard data={rollingData} selectedCategory={selectedCategory} slot={slot} onSelectSlot={setSlot} />
      </Grid>
      <Grid item xs={12}>
        <AuditCard results={filteredResults} showFailsOnly={showFailsOnly} onChangeFailsOnly={setshowFailsOnly} />
      </Grid>
    </Grid>
  );
};

export default ProjectPage;
