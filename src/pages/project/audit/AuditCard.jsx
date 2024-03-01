import React from 'react';
import { Grid, Card, CardHeader, CardContent, Switch } from '@mui/material';
import PropTypes from 'prop-types';
import ResultsTable from './ResultsTable';

const tableCellSx = { padding: 0.5 };

const AuditCard = ({ results, showFailsOnly, onChangeFailsOnly }) => (
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
                onChangeFailsOnly(!showFailsOnly);
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

AuditCard.propTypes = {
  results: PropTypes.array.isRequired,
  showFailsOnly: PropTypes.bool.isRequired,
  onChangeFailsOnly: PropTypes.func.isRequired
};

export default AuditCard;
