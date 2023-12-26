import React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import PropTypes from 'prop-types';
import LogListItem from './LogListItem'

function LogList(props) {
  return (
    <Table component="div">
      <TableHead component="div">
        <TableRow component="div">
          <TableCell component="div"/>
          <TableCell component="div">
            URLs
          </TableCell>
          <TableCell component="div">
            Timestamp
          </TableCell>
          <TableCell component="div">
            Categories
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody component="div">
        {props.items.map(item => {
          return (
            <LogListItem
              key={item.shortDate}
              item={item}
              getOnClickUrl={props.getOnClickUrl}
            />
          );
        })}
      </TableBody>
    </Table>
  )
}

LogList.propTypes = {
  items: PropTypes.array.isRequired,
  getOnClickUrl: PropTypes.func.isRequired,
};

export default LogList;
