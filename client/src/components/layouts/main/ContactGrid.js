import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Button } from '@material-ui/core';
import Grow from '@material-ui/core/Grow';
import { Typography } from '@material-ui/core';

import DeleteButton from './DeleteButton';
import PhoneNumberList from './PhoneNumberList';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  cardWidth: {
    minWidth: 100,
  },
  title: {
    fontSize: 14,
    padding: 0,
  },
  tooltip: {
    fontSize: 12
  },
  cursor: {
    cursor: 'pointer'
  }
}));

const ContactGrid = ({contacts, search, idActivation, setContactID, setSnackbar}) => {
  
  const classes = useStyles()
  
  const show = true
  
  const regex = new RegExp(`${search}`, 'ig')
  const contactList = (
    search 
    ? contacts.filter((contact) => contact.name.match(regex))
    : contacts
  )
  
  const idHandler = (contact) => {
    setContactID({
      id: contact.id,
      name: contact.name
    })
  }
  
  var contactGrid
  if (contacts.length>0) {
    contactGrid =  (
      <div className={classes.root}>
        <Grid container spacing={2} >
          {
            contactList.map((contact) => (
              <Grow in={show} timeout={1000} key={contact.id}>
                <Grid item>
                  <Card className={classes.cardWidth} variant="outlined">
                    <CardContent>
                          <Button 
                            className={classes.title} 
                            onClick={() => {
                              // ! because we initially set idActivation to false
                              if(idActivation)
                                idHandler(contact)}
                            }
                          >
                            {contact.name.toUpperCase()}
                          </Button>
                          <DeleteButton 
                            contactId={contact.id} 
                            tooltipClass={classes.tooltip} 
                            setSnackbar={setSnackbar} 
                          />
                      {
                        contact.phoneNum.map((num) => (
                          <PhoneNumberList 
                            key={num.id} 
                            num={num} 
                            contactId={contact.id} 
                            cursorClass={classes.cursor} 
                            setSnackbar={setSnackbar}
                            tooltipClass={classes.tooltip}
                          />
                        ))
                      }
                    </CardContent>
                  </Card>
                </Grid>
              </Grow>
            ))
          }
        </Grid>
      </div>
    )
  }
  else {
    contactGrid = (
      <Typography className={classes.noContacts} variant='h2' color='textSecondary'>
        You have no contacts
      </Typography>)
  }
  
  return (
    <div className={classes.root}>
        {contactGrid}
    </div>
  );
}

export default ContactGrid