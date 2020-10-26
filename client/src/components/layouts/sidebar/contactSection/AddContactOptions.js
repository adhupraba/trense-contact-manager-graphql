import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import AddNewContactForm from './AddNewContactForm';
import AddToExistingForm from './AddToExistingForm';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginBottom: theme.spacing(1.5),
    marginTop: theme.spacing(1.5)
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  form: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
      marginLeft: theme.spacing(1)
    },
  },
}));

const AddContactOptions = ({idActivation, setIdActivation, contactID, setContactID, setSnackbar}) => {
  const classes = useStyles()
  
  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Add New Contact</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <AddNewContactForm setSnackbar={setSnackbar} />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>Add to Existing Contact</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <AddToExistingForm 
            idActivation={idActivation} setIdActivation={setIdActivation} 
            contactID={contactID} setContactID={setContactID} 
            setSnackbar={setSnackbar}
          />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default AddContactOptions