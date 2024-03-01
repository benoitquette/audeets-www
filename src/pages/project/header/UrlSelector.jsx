import PropTypes from 'prop-types';
import { Select, MenuItem } from '@mui/material';

const UrlSelector = ({ domain, urls, selectedUrl, handleUrlChange }) => (
  <Select size="small" value={selectedUrl} onChange={(event) => handleUrlChange(event.target.value)}>
    {urls.map((url, index) => (
      <MenuItem key={index} value={url}>
        {new URL(url, 'https://' + domain).href}
      </MenuItem>
    ))}
  </Select>
);

UrlSelector.propTypes = {
  domain: PropTypes.string.isRequired,
  urls: PropTypes.array.isRequired,
  selectedUrl: PropTypes.string.isRequired,
  handleUrlChange: PropTypes.func.isRequired
};

export default UrlSelector;
