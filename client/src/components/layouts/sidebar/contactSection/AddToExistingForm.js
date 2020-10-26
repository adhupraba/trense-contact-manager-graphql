import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button, Typography } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { useMutation } from 'react-apollo';

import SelectPhoneType from './SelectPhoneType';
import { useForm } from '../../../../hooks/useForm';
import { ADD_NUMBER_TO_EXISTING_CONTACT } from '../../../../graphql/mutations';

const useStyles = makeStyles((theme) => ({
  form: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
      marginLeft: theme.spacing(1)
    },
  },
  checkbox: {
      padding: 0,
      margin: 0
  }
}));

const AddToExistingForm = ({idActivation, setIdActivation, contactID, setContactID, setSnackbar}) => {
  
  const classes = useStyles()
  const initialState = {
    number: ''
  }
  
  const [numType, setNumType] = useState('Home')
  const typeChangeHandler = (e) => {
    setNumType(e.target.value)
  }
  
  const { changeHandler, submitHandler, values } = useForm(existingContact, initialState)
  const { number } = values
  
  const [addExistingContact] = useMutation(ADD_NUMBER_TO_EXISTING_CONTACT, {
    update(proxy, result) {
      console.log(result)
      setContactID({
        id: '',
        name: ''
      })
      setSnackbar({
        isOpen: true, 
        message: 'Successfully added number to existing contact', 
        result: 'success'
      })
    },
    variables: {
      contactId: contactID.id,
      number: number === '' ? 0 : parseInt(number),
      numType
    },
    onError(err) {
      console.log(err)
      setSnackbar({
        isOpen: true,
        message: 'Failed to add number to existing contact',
        result: 'error'
    })
    }
  })
  
  function existingContact() {
    addExistingContact()
  }
  
    return (
        <form className={classes.form} onSubmit={submitHandler} noValidate autoComplete="off">
          <FormControlLabel
            className={classes.checkbox}
              control={
                <Checkbox
                  checked={idActivation}
                  onChange={() => setIdActivation(!idActivation)}
                  color="primary"
                />
              }
            label='Click contact name'
          />
          <Typography paragraph color='textSecondary'>See Info to learn more</Typography>
          <TextField 
            size='small' label="Name" 
            variant="outlined" 
            type='text'
            disabled={true}
            value={contactID.name}
          />
          <TextField 
            size='small' label="Phone Number" 
            variant="outlined" name='number'
            type='number' 
            // ! because we initially set idActivation to false
            disabled={!idActivation}
            value={number} onChange={changeHandler} 
          />
          <SelectPhoneType changeHandler={typeChangeHandler} type={numType} idActivation={idActivation} />
          <Button 
            type='submit' 
            size='small' 
            color='secondary' 
            variant='contained'
            // ! because we initially set idActivation to false
            disabled={!idActivation}
          >
            Submit
          </Button>
        </form>
    )
}

export default AddToExistingForm