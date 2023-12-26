import React from "react";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import ProjectLastAuditsList from './ProjectLastAuditsList';
import Button from "@mui/material/Button";
import PropTypes from 'prop-types';
import Spinner from '@components/Spinner'

function ProjectLastAudits(props) {
  return (
    <Card
      sx={{
        // margin: 1,
        // flexGrow: 1,
        // flexShrink: 1,
        flex: 50
      }}
    >
      <CardHeader title="Last Audits"/>
      <CardContent
        // sx={{paddingTop: 0}}
      >
        <Spinner loading={!props.loaded}>
          <ProjectLastAuditsList
              audits={props.audits}
              navigateToAudit={props.navigateToAudit}
            />
        </Spinner>
      </CardContent>
      <CardActions>
        <Button onClick={props.navigateToLog}>
          View All
        </Button>
      </CardActions>
    </Card>
  )
}

ProjectLastAudits.propTypes = {
  loaded: PropTypes.bool.isRequired,
  audits: PropTypes.array.isRequired,
  navigateToAudit: PropTypes.func.isRequired,
  navigateToLog: PropTypes.func.isRequired,
};

export default ProjectLastAudits;
