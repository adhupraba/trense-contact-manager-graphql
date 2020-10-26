import React, { useRef, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Typography } from '@material-ui/core';

const InfoDialog = ({open, setOpen, infoButtonClass}) => {

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = useRef(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <div className={infoButtonClass}>
      <Button variant='contained' color='secondary' onClick={handleClickOpen}>Info</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={'paper'}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Info On How To Use tReNsE Contacts</DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText variant='h5' color='textPrimary'>Creating a new contact</DialogContentText>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            You can only create contacts with unique 10 digit phone numbers. 
            For example, you can have only one 10 digit number like '9999999999'. You cannot create
            another number like this. Each phone number should be unique.
          </DialogContentText>
          
          <DialogContentText variant='h5'color='textPrimary'>Adding number to existing contact</DialogContentText>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
              In the drawer you can find the 'Add to existing contact' accordion. 
              Click on that and you will see a checkbox, two input fields and one selector.
              We have designed this component in such a way that when the checkbox is enabled,
              you will have to click on a contact's name and the name field will be automatically filled.
              Then you have to enter the phone number and the select the number type and submit it.
            </DialogContentText>
            
            <DialogContentText variant='h5' color='textPrimary' >Searching contacts</DialogContentText>
            <DialogContentText 
              id="scroll-dialog-description"
              ref={descriptionElementRef}
              tabIndex={-1}
            >
              You can only search contacts by name. You cannot search by number.
            </DialogContentText>
            
            <DialogContentText variant='h5' color='textPrimary'>Deleting a number from existing contact</DialogContentText>
            <DialogContentText
              id="scroll-dialog-description"
              ref={descriptionElementRef}
              tabIndex={-1}
            >
              You should be able to view the contacts in the display card. You have the power to delete a
              single number from a contact by just DOUBLE CLICKING on the respective number.
            </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default InfoDialog