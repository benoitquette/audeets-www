import PropTypes from 'prop-types';

// material-ui
import { TableCell, TableHead, TableRow } from '@mui/material';

// project imports
import header from './header';

// ==============================|| PROJECT TABLE - HEADER ||============================== //

function ProjectsTableHead({ order, orderBy }) {
  return (
    <TableHead>
      <TableRow>
        {header.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

ProjectsTableHead.propTypes = {
  order: PropTypes.string,
  orderBy: PropTypes.string
};

export default ProjectsTableHead;
