import PropTypes from 'prop-types';

// material-ui
import { Avatar, TableCell, TableRow, IconButton } from '@mui/material';

// project import
import ProjectsTableStatus from './ProjectsTableStatus';

// assets
import { EditOutlined } from '@ant-design/icons';
import ProjectDelete from './delete/ProjectDelete';

// ==============================|| PROJECTS TABLE ROW ||============================== //

function ProjectsTableRow({ data, labelId }) {
  return (
    <TableRow hover role="checkbox" tabIndex={-1} key={data.title}>
      <TableCell size="small" align="left" sx={{ width: 25 }}>
        <Avatar src={data.url + '/favicon.ico'} sx={{ width: 20, height: 20 }} />
      </TableCell>
      <TableCell id={labelId} scope="row" align="left">
        {data.title}
      </TableCell>
      <TableCell align="left">{data.url}</TableCell>
      <TableCell align="left">
        <ProjectsTableStatus status={data.carbs} />
      </TableCell>
      <TableCell size="small" align="right" sx={{ width: 50 }}>
        <IconButton>
          <EditOutlined />
        </IconButton>
        <ProjectDelete id={data._id} />
      </TableCell>
    </TableRow>
  );
}
ProjectsTableRow.propTypes = {
  data: PropTypes.object.isRequired,
  labelId: PropTypes.string
};

export default ProjectsTableRow;
