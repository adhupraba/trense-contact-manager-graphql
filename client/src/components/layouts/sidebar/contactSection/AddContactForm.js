import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';

import SelectPhoneType from './SelectPhoneType';

const useStyles = makeStyles((theme) => ({
  form: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
      marginLeft: theme.spacing(1)
    },
  }
}));

const AddContactForm = ({submitHandler, changeHandler, name, number, phoneType, typeChange}) => {
  
  const classes = useStyles()
  
    return (
        <form className={classes.form} onSubmit={submitHandler} noValidate autoComplete="off">
          <TextField 
            size='small' label="Name" 
            variant="outlined" name='name' 
            value={name} onChange={changeHandler} 
          />
          <TextField 
            size='small' label="Phone Number" 
            variant="outlined" name='number' 
            value={number} onChange={changeHandler} 
          />
          <SelectPhoneType changeHandler={typeChange} type={phoneType} />
          <Button 
            type='submit' 
            size='small' 
            color='secondary' 
            variant='contained'
          >
            Submit
          </Button>
        </form>
    )
}

export default AddContactForm
