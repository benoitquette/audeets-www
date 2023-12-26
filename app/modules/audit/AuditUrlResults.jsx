import React from "react";
import _ from 'lodash';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Icon from '@mui/material/Icon';
import AuditUrlResultsDetails from './AuditUrlResultsDetails';
import {green, red} from "@mui/material/colors";
import PropTypes from 'prop-types';

function AuditUrlResults(props) {
  const rows = _.chain(props.results)
    .filter(result => {
      if (props.showFailsOnly) {
        return !result.check;
      }
      return true;
      // return !props.showFailsOnly || !result.check;
    })
    .map(result => {
      return (
        <TableRow
          key={result.rule}
        >
          <TableCell>
            {result.check ? (
              <Icon
                className="material-icons"
                sx={{
                  verticalAlign: 'middle',
                  color: green
                }}
              >
                check
              </Icon>) : (
              <Icon
                className="material-icons"
                sx={{
                  verticalAlign: 'middle',
                  color: red
                }}
              >
                error
              </Icon>)
            }
          </TableCell>
          <TableCell>
            {result.title}
          </TableCell>
          <TableCell>
            {result.details && (
              <AuditUrlResultsDetails details={result.details}/>
            )}
          </TableCell>
        </TableRow>
      );
    })
    .flatten()
    .value();
  return (
    <Table sx={{
      width: "auto",
      tableLayout: "auto"
    }}>
      <TableBody>
        {rows}
      </TableBody>
    </Table>
  )
}

AuditUrlResults.propTypes = {
  results: PropTypes.array.isRequired,
  showFailsOnly: PropTypes.bool.isRequired
};

export default AuditUrlResults;
