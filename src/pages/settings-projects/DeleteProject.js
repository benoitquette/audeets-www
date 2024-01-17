import { useState } from 'react';

// material-ui
import { IconButton, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

// assets
import { DeleteOutlined } from '@ant-design/icons';

// ==============================|| DELETE PROJECT DIALOG ||============================== //

function DeleteProject() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton onClick={handleClickOpen}>
        <DeleteOutlined />
      </IconButton>
      <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Delete project</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">Are you sure you want to delete this project?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Delete</Button>
          <Button onClick={handleClose} autoFocus variant="contained">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default DeleteProject;
