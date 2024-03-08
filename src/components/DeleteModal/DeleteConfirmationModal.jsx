import * as React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Slide from '@mui/material/Slide'; // Import Slide for transition animation
import PropTypes from 'prop-types';

// Define prop types for the DeleteConfirmationModal component
DeleteConfirmationModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  noteTitle: PropTypes.string.isRequired,
};


function DeleteConfirmationModal({ open, onClose, onDelete, noteTitle }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby='delete-confirmation-modal-title'
      aria-describedby='delete-confirmation-modal-description'
      TransitionComponent={Slide}
      TransitionProps={{ direction: 'up', timeout: 100 }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 3,
        }}
      >
        <h2 id='delete-confirmation-modal-title'>Delete note?</h2>
        <hr />
        <p id='delete-confirmation-modal-description'>
          This will delete <strong>{noteTitle}</strong>.
        </p>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button
            onClick={onClose}
            color='primary'
            variant='contained'
            sx={{ mr: 2 }}
          >
            Cancel
          </Button>
          <Button onClick={onDelete} color='error' variant='contained'>
            Delete
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default DeleteConfirmationModal;
