import PropTypes from 'prop-types';
import { CardActions, CardHeader, Card, CardContent, Avatar, IconButton, Tooltip } from '@mui/material';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ProjectDelete from './delete/ProjectDelete';
import Indicator from './Indicator';
import { useGetGlobalScoresQuery } from '~/store/reducers/projects-api';

function ProjectCard({ _id, title, domain, onViewCategory, onEditProject, onViewProject }) {
  const { data: scores } = useGetGlobalScoresQuery(_id);

  const handleCategoryClick = (category) => {
    onViewCategory(_id, category);
  };

  const handleViewProject = () => {
    onViewProject(_id);
  };

  const handleEditProject = () => {
    onEditProject(_id);
  };

  return (
    <Card>
      <CardHeader
        avatar={<Avatar src={`https://${domain}/favicon.ico`} />}
        title={title}
        subheader={domain}
        titleTypographyProps={{ variant: 'h5' }}
        subheaderTypographyProps={{ variant: 'h6' }}
      />
      <CardContent sx={{ mt: -1 }}>{scores && <Indicator data={scores} onClickCategory={handleCategoryClick} />}</CardContent>
      <CardActions>
        <Tooltip title="View project statistics">
          <IconButton onClick={handleViewProject}>
            <EqualizerIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Edit project">
          <IconButton onClick={handleEditProject}>
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
  domain: PropTypes.string.isRequired,
  onViewCategory: PropTypes.func.isRequired,
  onEditProject: PropTypes.func.isRequired,
  onViewProject: PropTypes.func.isRequired
};

export default ProjectCard;
