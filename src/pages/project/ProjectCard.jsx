import PropTypes from 'prop-types';
import { Grid, Tooltip, Avatar, Chip, IconButton } from '@mui/material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import CategorySelector from '../project/CategorySelector';
import UrlSelector from './UrlSelector';

const ProjectCard = ({
  title,
  domain,
  urls,
  selectedUrl,
  handleUrlChange,
  categories,
  selectedCategory,
  handleCategoryChange,
  selectedDate
}) => {
  return (
    <Grid container alignItems="center" justifyContent="space-between">
      <Grid item>
        <Grid container columnSpacing={2} alignItems="center">
          <Grid item>
            <Tooltip title={title}>
              <Avatar src={`https://${domain}/favicon.ico`} />
            </Tooltip>
          </Grid>
          <Grid item>
            <UrlSelector domain={domain} urls={urls} selectedUrl={selectedUrl} handleUrlChange={handleUrlChange} />
          </Grid>
          <Grid item>
            <CategorySelector categories={categories} selectedCategory={selectedCategory} handleChange={handleCategoryChange} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container columnSpacing={2} alignItems="center">
          <Grid item>
            <Chip label={new Date(selectedDate).toLocaleDateString('en-us', { month: 'long', day: 'numeric', year: 'numeric' })} />
          </Grid>
          <Grid>
            <Tooltip title="Reset to latest">
              <IconButton aria-label="delete">
                <RestartAltIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

ProjectCard.propTypes = {
  title: PropTypes.string.isRequired,
  domain: PropTypes.string.isRequired,
  urls: PropTypes.array.isRequired,
  selectedUrl: PropTypes.string.isRequired,
  handleUrlChange: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  selectedCategory: PropTypes.string.isRequired,
  handleCategoryChange: PropTypes.func.isRequired,
  selectedDate: PropTypes.string.isRequired
};

export default ProjectCard;
