import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';

// material-ui
import { Link, TableCell, TableRow } from '@mui/material';

// third-party
import { NumericFormat } from 'react-number-format';

// project import
import ProjectsTableStatus from './ProjectsTableStatus';

// ==============================|| PROJECTS TABLE ROW ||============================== //

function ProjectsTableRow({ data, isSelected, labelId }) {
  return (
    <TableRow
      hover
      role="checkbox"
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      aria-checked={isSelected}
      tabIndex={-1}
      key={data.trackingNo}
      selected={isSelected}
    >
      <TableCell component="th" id={labelId} scope="row" align="left">
        <Link color="secondary" component={RouterLink} to="">
          {data.trackingNo}
        </Link>
      </TableCell>
      <TableCell align="left">{data.name}</TableCell>
      <TableCell align="right">{data.fat}</TableCell>
      <TableCell align="left">
        <ProjectsTableStatus status={data.carbs} />
      </TableCell>
      <TableCell align="right">
        <NumericFormat value={data.protein} displayType="text" thousandSeparator prefix="$" />
      </TableCell>
    </TableRow>
  );
}
ProjectsTableRow.propTypes = {
  data: PropTypes.object.isRequired,
  isSelected: PropTypes.bool.isRequired,
  labelId: PropTypes.string
};

export default ProjectsTableRow;
