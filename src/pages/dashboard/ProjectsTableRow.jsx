import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Avatar, TableCell, TableRow, IconButton } from '@mui/material';
import ProjectsTableStatus from './ProjectsTableStatus';
import { EditOutlined, AreaChartOutlined } from '@ant-design/icons';
import ProjectDelete from './delete';

function ProjectsTableRow({ data }) {
  const navigate = useNavigate();
  return (
    <TableRow hover role="checkbox" tabIndex={-1} key={data.title}>
      <TableCell size="small" align="left" sx={{ width: 25 }}>
        <Avatar src={data.url + '/favicon.ico'} sx={{ width: 20, height: 20 }} />
      </TableCell>
      <TableCell scope="row" align="left">
        {data.title}
      </TableCell>
      <TableCell align="left">{data.url}</TableCell>
      <TableCell align="left">
        <ProjectsTableStatus status={data.carbs} />
      </TableCell>
      <TableCell size="small" align="right" sx={{ width: 50 }}>
        <IconButton onClick={() => navigate(`/project/${data._id}`)}>
          <AreaChartOutlined />
        </IconButton>
        <IconButton onClick={() => navigate(`${data._id}/update`)}>
          <EditOutlined />
        </IconButton>
        <ProjectDelete id={data._id} />
      </TableCell>
    </TableRow>
  );
}
ProjectsTableRow.propTypes = {
  data: PropTypes.object.isRequired
};

export default ProjectsTableRow;