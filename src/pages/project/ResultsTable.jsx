import React from 'react';
import Table from '@mui/material/Table';
import { TableRow, TableBody, TableCell, Icon, TableHead, Avatar, Chip } from '@mui/material';
import ResultsDetails from './ResultsDetails';
import PropTypes from 'prop-types';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';

const tableCellSx = { padding: 0.5 };

const ResultsTable = ({ results, showFailsOnly, selectedCategory }) => (
  <Table size="small">
    <TableHead>
      <TableRow>
        <TableCell align="center" sx={tableCellSx}>
          Source
        </TableCell>
        <TableCell align="center" sx={tableCellSx}>
          Pass
        </TableCell>
        <TableCell sx={tableCellSx}>Rule</TableCell>
        <TableCell sx={tableCellSx}>Details</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {results
        .filter((result) => (showFailsOnly ? !result.check : true))
        .map((result) => (
          <TableRow key={result.rule}>
            <TableCell align="center" sx={tableCellSx}>
              {result.source}
            </TableCell>
            <TableCell align="center" sx={tableCellSx}>
              {result.check ? (
                <CheckOutlinedIcon fontSize="small" color="success" />
              ) : (
                <WarningAmberOutlinedIcon fontSize="small" color="error" />
              )}
            </TableCell>
            <TableCell sx={tableCellSx}>{result.title}</TableCell>
            <TableCell sx={tableCellSx}>{/* <ResultsDetails details={result.details} /> */}</TableCell>
          </TableRow>
        ))}
    </TableBody>
  </Table>
);

ResultsTable.propTypes = {
  results: PropTypes.array.isRequired,
  showFailsOnly: PropTypes.bool.isRequired,
  selectedCategory: PropTypes.string.isRequired
};

export default ResultsTable;
