import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import ProjectDelete from './delete/ProjectDelete';
import { CardActions, CardHeader, Card, CardContent, Avatar, IconButton, Tooltip } from '@mui/material/index';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useGetGlobalScoresQuery } from '~/store/reducers/projects-api';
import IndicatorRadar from './IndicatorRadar';

function ProjectCard({ _id, title, domain }) {
  const { data: scores } = useGetGlobalScoresQuery(_id);
  const navigate = useNavigate();
  return (
    <Card>
      <CardHeader avatar={<Avatar src={`https://${domain}/favicon.ico`} />} title={title} subheader={domain} />
      <CardContent>{scores && <IndicatorRadar data={scores} />}</CardContent>
      <CardActions>
        <Tooltip title="View project statistics">
          <IconButton onClick={() => navigate(`/project/${_id}`)}>
            <EqualizerIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Edit project">
          <IconButton onClick={() => navigate(`${_id}/update`)}>
            <EditOutlinedIcon />
          </IconButton>
        </Tooltip>
        <ProjectDelete id={_id} />
      </CardActions>
    </Card>
  );
}
ProjectCard.propTypes = {
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  domain: PropTypes.string.isRequired
};

export default ProjectCard;
