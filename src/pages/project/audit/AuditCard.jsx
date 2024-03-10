import { useState, useEffect } from 'react';
import { Grid, Card, CardHeader, CardContent, Switch } from '@mui/material';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import ResultsTable from './ResultsTable';
import { fetchAudit } from '~/store/reducers/audits';

const AuditCard = ({ projectId, filter }) => {
  const dispatch = useDispatch();
  const [showFailsOnly, setShowFailsOnly] = useState(false);
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

  return (
    <Card>
      <CardHeader
        title="Audit details"
        action={
          <Grid sx={{ mt: 0.5, mr: 2 }} container alignItems="flex-end">
            <Grid item>
              <Switch
                checked={showFailsOnly}
                size="small"
                onClick={() => {
                  setShowFailsOnly(!showFailsOnly);
                }}
              />
            </Grid>
            <Grid item>Filter failed rules</Grid>
          </Grid>
        }
      />
      <CardContent sx={{ mt: -2 }}>
        <ResultsTable results={results} showFailsOnly={showFailsOnly} />
      </CardContent>
    </Card>
  );
};

AuditCard.propTypes = {
  projectId: PropTypes.string.isRequired,
  filter: PropTypes.object.isRequired
};

export default AuditCard;
