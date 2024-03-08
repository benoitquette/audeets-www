import PropTypes from 'prop-types';
import { List, ListItem, ListItemText, IconButton, TextField, InputAdornment, Button, Grid, Divider, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import BorderedSection from '~/components/BorderedSection/BorderedSection';
import { isUrlValid } from '~/utils/string-helpers';

const UrlList = ({ domain, urls, handleUrlsChange }) => {
  const [newUrl, setNewUrl] = useState({ url: '', error: true });

  const baseUrl = `https://${domain}/`;

  const handleNewUrlChange = (e) => {
    const value = e.target.value;
    const url = baseUrl + value;
    const isValid = isUrlValid(url) && !urls.includes(url);
    setNewUrl({ url: value, error: !isValid });
  };

  const handleAddUrl = () => {
    const url = new URL(newUrl.url, baseUrl);
    const newUrlValue = url.pathname + url.search;
    handleUrlsChange(urls.concat([newUrlValue]));
    setNewUrl((state) => ({ ...state, error: true }));
  };

  const handleRemoveUrl = (url) => {
    handleUrlsChange(urls.filter((item) => item !== url));
  };

  return (
    <BorderedSection title="List of URLs *">
      <List
        dense
        sx={{
          position: 'relative',
          overflow: 'auto',
          maxHeight: 200,
          minHeight: 200,
          mt: -2,
          ml: 0,
          border: 1,
          borderColor: '#e7e7e7'
        }}
      >
        {urls.map((url) => (
          <Box key={`item-${url}`}>
            <ListItem
              sx={{ m: 0 }}
              key={`item-${url}`}
              secondaryAction={
                <IconButton edge="end" onClick={() => handleRemoveUrl(url)}>
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemText primary={url} />
            </ListItem>
            <Divider />
          </Box>
        ))}
      </List>
      <Grid container sx={{ mt: 1 }} columnSpacing={1} flexDirection="row">
        <Grid item xs={9}>
          <TextField
            fullWidth
            variant="standard"
            InputProps={{
              startAdornment: <InputAdornment position="start">{baseUrl}</InputAdornment>
            }}
            onChange={handleNewUrlChange}
          />
        </Grid>
        <Grid item>
          <Button color="primary" variant="contained" size="small" disabled={newUrl.error} onClick={handleAddUrl}>
            Add URL
          </Button>
        </Grid>
      </Grid>
    </BorderedSection>
  );
};

UrlList.propTypes = {
  domain: PropTypes.string.isRequired,
  urls: PropTypes.array.isRequired,
  handleUrlsChange: PropTypes.func.isRequired
};

export default UrlList;
