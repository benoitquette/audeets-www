import { useState } from 'react';
import { useParams } from 'react-router';
import { Button, Grid, Stack, Typography, Switch } from '@mui/material';
import RollingAreaChart from './RollingAreaChart';
import MainCard from '~/components/MainCard';
import ScoreCard from './ScoreCard';
import {
  useGetProjectQuery,
  useGetScoresQuery,
  useGetRollingWeekQuery,
  useGetRollingMonthQuery,
  useGetRollingYearQuery,
  useGetAuditQuery
} from '~/store/reducers/projects-api';
import { categoriesTheme } from '~/config.js';

import ResultsTable from './ResultsTable';
import dayjs from 'dayjs';
import ProjectCard from './ProjectCard';

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
        {project && selectedUrl && selectedCategory && selectedDate && (
          <ProjectCard
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
        <Typography variant="h5" sx={{ mb: 2 }}>
          Score
        </Typography>
        {scores && selectedCategory && <ScoreCard score={selectedScore} date={selectedDate} />}
      </Grid>
      <Grid item xs={12} sm={8} md={9} lg={10}>
        <Grid container sx={{ mb: 1 }} alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Rolling chart</Typography>
          </Grid>
          <Grid item>
            <Button
              size="small"
              onClick={() => setSlot('year')}
              color={slot === 'year' ? 'primary' : 'secondary'}
              variant={slot === 'year' ? 'outlined' : 'text'}
            >
              Year
            </Button>
            <Button
              size="small"
              onClick={() => setSlot('month')}
              color={slot === 'month' ? 'primary' : 'secondary'}
              variant={slot === 'month' ? 'outlined' : 'text'}
            >
              Month
            </Button>
            <Button
              size="small"
              onClick={() => setSlot('week')}
              color={slot === 'week' ? 'primary' : 'secondary'}
              variant={slot === 'week' ? 'outlined' : 'text'}
            >
              Week
            </Button>
          </Grid>
        </Grid>
        <MainCard sx={{ p: 0 }}>
          <RollingAreaChart data={rollingData} selectedCategory={selectedCategory} />
        </MainCard>
      </Grid>
      <Grid item xs={12}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Audit details
            </Typography>
          </Grid>
          <Grid item sx={{ pr: 1 }}>
            <Switch checked={showFailsOnly} size="small" onChange={(event) => setshowFailsOnly(event.target.checked)} />
            Filter failed rules
          </Grid>
        </Grid>
        {isSuccess && (
          <MainCard sx={{ mt: 0 }} contentSX={{ p: 0 }}>
            <ResultsTable results={filteredResults} showFailsOnly={showFailsOnly} selectedCategory={selectedCategory} />
          </MainCard>
        )}
      </Grid>
    </Grid>
  );
};

export default ProjectPage;
