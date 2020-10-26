import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
}));

const BootstrapInput = withStyles((theme) => ({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #ced4da',
      fontSize: 16,
      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
  }))(InputBase);

const SelectPhoneType = ({changeHandler, type}) => {
  
  const classes = useStyles();
  
  return (
    <FormControl className={classes.margin}>
    <InputLabel id="demo-customized-select-label">Phone Type</InputLabel>
    <Select
      labelId="demo-customized-select-label"
      id="demo-customized-select"
      value={type}
      onChange={changeHandler}
      input={<BootstrapInput />}
    >
      <MenuItem name='numType' value='Home'>Home</MenuItem>
      <MenuItem name='numType' value='Mobile'>Mobile</MenuItem>
      <MenuItem name='numType' value='Work'>Work</MenuItem>
    </Select>
  </FormControl>
  );
}

export default SelectPhoneType