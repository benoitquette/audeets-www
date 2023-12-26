import React from "react";
import Toolbar from '@mui/material/Toolbar';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import PropTypes from 'prop-types';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';

function AuditToolbar(props) {
  return (
    <Toolbar>
      <FormControl
        sx={{flexGrow: 1, flexDirection: 'row'}}
      >
        <Select
          value={props.selectedUrl || ""} // TODO value={this.state.value}
          onChange={(event) => {
            props.urlFilterSelected(event.target.value);
          }}
        >
          {props.urls.map(function(url) {
            return (
              <MenuItem
                key={url}
                value={url}
              >
                {url}
              </MenuItem>
            )
          })}
        </Select>
        <FormControlLabel
          sx={{marginLeft: 0}}
          control={<Switch
            checked={props.showFailsOnly}
            onChange={(event) => {
              props.setShowFailsOnly(event.target.checked);
            }}
          />}
          label="Failed rules only"
        />
      </FormControl>
      <Button
        // variant="contained"
        onClick={props.navigateToProject}
      >
        Back
      </Button>
    </Toolbar>
  )
}

AuditToolbar.propTypes = {
  urls: PropTypes.array.isRequired,
  selectedUrl: PropTypes.string,
  urlFilterSelected: PropTypes.func.isRequired,
  setShowFailsOnly: PropTypes.func.isRequired,
  showFailsOnly: PropTypes.bool.isRequired,
  navigateToProject: PropTypes.func.isRequired
};

export default AuditToolbar;
