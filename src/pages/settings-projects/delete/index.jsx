import { useState } from 'react';
import PropTypes from 'prop-types';

// material-ui
import { IconButton, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

// assets
import { DeleteOutlined } from '@ant-design/icons';

// types
import { useDeleteProjectMutation } from '~/store/reducers/projectsApi';

// ==============================|| DELETE PROJECT DIALOG ||============================== //

function ProjectDelete({ id }) {
  const [open, setOpen] = useState(false);
  const [deleteProject] = useDeleteProjectMutation();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    deleteProject(id);
    setOpen(false);
  };

  return (
    <>
      <IconButton onClick={handleClickOpen}>
        <DeleteOutlined />
      </IconButton>
      <Dialog open={open} onClose={handleCancel} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Delete project</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">Are you sure you want to delete this project?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete} size="small">
            Delete
          </Button>
          <Button onClick={handleCancel} size="small" autoFocus variant="contained">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

ProjectDelete.propTypes = {
  id: PropTypes.string.isRequired
};

export default ProjectDelete;
