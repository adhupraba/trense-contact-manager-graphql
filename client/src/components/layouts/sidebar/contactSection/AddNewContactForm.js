import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import SelectPhoneType from './SelectPhoneType';
import { useMutation } from 'react-apollo';

import { CREATE_CONTACT_MUTATION } from '../../../../graphql/mutations';
import { GET_ALL_CONTACTS_QUERY } from '../../../../graphql/queries';
import { useForm } from './../../../../hooks/useForm';

const useStyles = makeStyles((theme) => ({
  form: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
      marginLeft: theme.spacing(1)
    },
  }
}));

const AddNewContactForm = ({setSnackbar}) => {
  
  const classes = useStyles()
  const initialState = {
    name: '',
    number: ''
  }
  
  const [numType, setNumType] = useState('Home')
  const typeChangeHandler = (e) => {
    setNumType(e.target.value)
  }
  
  const { changeHandler, submitHandler, values } = useForm(newContact, initialState)
  const { name, number } = values
  
  const [createContact] = useMutation(CREATE_CONTACT_MUTATION, {
    update(proxy, result) {
      // console.log(result)
      const cachedData = proxy.readQuery({
        query: GET_ALL_CONTACTS_QUERY
      })
      // console.log(cachedData)
      const contacts = [...cachedData.getContacts, result.data.createContact]
      proxy.writeQuery({
        query: GET_ALL_CONTACTS_QUERY,
        data: {getContacts: contacts}
      })
      setSnackbar({
        isOpen: true, 
        message: 'Successfully added contact', 
        result: 'success'
      })
    },
    variables: {
      name,
      number: number === '' ? 0 : parseInt(number),
      numType
    },
    onError(err) {
      console.log(err)
      setSnackbar({
        isOpen: true,
        message: 'Failed to create number',
        result: 'error'
    })
    }
  })
  
  function newContact() {
    createContact()
  }
  
    return (
        <form className={classes.form} onSubmit={submitHandler} noValidate autoComplete="off">
          <TextField 
            size='small' label="Name" 
            variant="outlined" name='name' 
            type='text'
            value={name} onChange={changeHandler} 
          />
          <TextField 
            size='small' label="Phone Number" 
            variant="outlined" name='number'
            value={number} onChange={changeHandler} 
          />
          <SelectPhoneType changeHandler={typeChangeHandler} type={numType} />
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

export default AddNewContactForm
