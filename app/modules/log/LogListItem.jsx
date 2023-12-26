import React from "react";
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Icon from '@mui/material/Icon';
import ChipsList from '@components/ChipsList';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

function LogListItem(props) {
  const {item} = props;
  return (
    <TableRow
      component={Link}
      to={props.getOnClickUrl(item.shortDate)}
      style={{ textDecoration: 'none' }}
      key={item.shortDate}
      sx={{cursor: 'pointer'}}
    >
      <TableCell
        component="div"
        data-key={item.shortDate}
        sx={{width: '1px'}}
      >
        {item.multipleAuditsWarning && (
            <Icon className="material-icons">info</Icon>
          )}
      </TableCell>
      <TableCell
        component="div"
        data-key={item.shortDate}
        sx={{width: '1px'}}
      >
        {item.urlCount}
      </TableCell>
      <TableCell
        component="div"
        data-key={item.shortDate}
        sx={{width: '48%'}}
      >
        {item.longDate}
      </TableCell>
      <TableCell
        component="div"
        data-key={item.shortDate}
        sx={{width: '48%'}}
      >
        <ChipsList
          items={item.categories}
          dataKey={item.shortDate}
        />
      </TableCell>
    </TableRow>
  )
}

LogListItem.propTypes = {
  item: PropTypes.object.isRequired,
  getOnClickUrl: PropTypes.func.isRequired,
};

export default LogListItem;
