import { PropTypes } from 'prop-types';
import { ToggleButtonGroup, ToggleButton, Tooltip } from '@mui/material';

const CategorySelector = ({ categories, selectedCategory, handleChange }) => (
  <ToggleButtonGroup exclusive size="small" value={selectedCategory} onChange={(event, value) => handleChange(value)}>
    {categories.map((category) => (
      <Tooltip title={category.name} key={category.name}>
        <ToggleButton label={category.name} value={category.name}>
          {category.icon}
        </ToggleButton>
      </Tooltip>
    ))}
  </ToggleButtonGroup>
);

CategorySelector.propTypes = {
  categories: PropTypes.array.isRequired,
  selectedCategory: PropTypes.string,
  handleChange: PropTypes.func.isRequired
};

export default CategorySelector;
