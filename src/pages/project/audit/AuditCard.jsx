import { useState } from 'react';
import { Grid, Card, CardHeader, CardContent, Switch } from '@mui/material';
import PropTypes from 'prop-types';
import ResultsTable from './ResultsTable';
import useFetchAudit from '~/hooks/useFetchAudit';

const AuditCard = ({ projectId, filter }) => {
  const [showFailsOnly, setShowFailsOnly] = useState(false);
  const results = useFetchAudit(projectId, filter);

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
