import { useState, useRef, useEffect } from "react";
import PropTypes from 'prop-types';
import { 
    Dialog, 
    DialogTitle,
    RadioGroup, 
    DialogContent, 
    DialogActions, 
    FormControlLabel, 
    Button, 
    Radio
} from '@mui/material';

const options = [
    'None',
    'Atria',
    'Callisto',
    'Dione',
    'Ganymede',
    'Hangouts Call',
    'Luna',
    'Oberon',
    'Phobos',
    'Pyxis',
    'Sedna',
    'Titania',
    'Triton',
    'Umbriel',
  ];
  
export default function ConfirmDialog(props) {
    const { onClose, onOkay, open, title, content, ...other } = props;
    const radioGroupRef = useRef(null);
  
    const handleEntering = () => {
      if (radioGroupRef.current != null) {
        radioGroupRef.current.focus();
      }
    };
  
    const handleCancel = () => {
      onClose();
    };
  
    const handleOk = () => {
      onOkay();
    };

  
    return (
      <Dialog
        sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
        maxWidth="xs"
        TransitionProps={{ onEntering: handleEntering }}
        open={open}
        {...other}
      >
        <DialogTitle sx={{ color:'primary.main' }}>{title}</DialogTitle>
          <DialogContent dividers>
            {content}
          </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary" onClick={handleOk}>Yes</Button>
          <Button autoFocus onClick={handleCancel}>
            No
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
  
  ConfirmDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    onOkay: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  };