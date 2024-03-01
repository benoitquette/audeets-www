import { PropTypes } from 'prop-types';
import { ToggleButtonGroup, ToggleButton, Icon, Tooltip } from '@mui/material';

const CategorySelector = ({ categories, selectedCategory, handleChange }) => (
  <ToggleButtonGroup exclusive size="small" value={selectedCategory} onChange={(event, value) => handleChange(value)}>
    {categories.map((category) => (
      <Tooltip title={category.name} key={category.name}>
        <ToggleButton label={category.name} value={category.name}>
          <Icon>{category.icon}</Icon>
        </ToggleButton>
      </Tooltip>
    ))}
  </ToggleButtonGroup>
);

CategorySelector.prototype = {
  categories: PropTypes.array.isRequired,
  selectedCategory: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired
};

export default CategorySelector;
