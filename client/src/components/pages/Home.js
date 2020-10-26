import React, { useState, useContext } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { deepPurple } from '@material-ui/core/colors'
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress'

import ContactGrid from '../layouts/main/ContactGrid';
import { useQuery } from 'react-apollo';
import { GET_ALL_CONTACTS_QUERY } from './../../graphql/queries';
import Appbar from '../layouts/main/Appbar';
import SideBar from '../layouts/sidebar/SideBar';
import SnackbarMessage from '../layouts/main/SnackbarMessage';
import AuthContext from './../../context/authContext/AuthContext';

const drawerWidth = 280;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  separator: {
    justifyContent: 'space-between',
    display: 'flex',
    alignItems: 'center',
  },
  infoButton: {
    marginRight: '1.5rem',
    fontWeight: '700',
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  contactsLength: {
    marginLeft: theme.spacing(7)
  },
  noContacts: {
    marginLeft: theme.spacing(5)
  },
  spinner: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));

const Home = () => {
 
  const [search, setSearch] = useState('')
  const [idActivation, setIdActivation] = useState(false)
  const [contactID, setContactID] = useState({
    id: '',
    name: ''
  })
  const [snackbar, setSnackbar] = useState({
    isOpen: false,
    message: '',
    result: ''
  })
  const { isOpen, message, result } = snackbar
  
  const { tokenExpiredMsg } = useContext(AuthContext)
  if (tokenExpiredMsg) {
    setSnackbar({
      isOpen: true,
      message: tokenExpiredMsg,
      result: 'error'
    })
  }
  
  const { client, data } = useQuery(GET_ALL_CONTACTS_QUERY)
  
  var contacts
  if (data) {
    contacts = data.getContacts
  }
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      
      <Appbar 
        separatorClass={classes.separator}
        infoButtonClass={classes.infoButton}
        appBarClass={classes.appBar} 
        iconButtonClick={handleDrawerToggle} 
        iconButtonClass={classes.menuButton} 
      />
      
      <SideBar 
        purpleClass={classes.purple} toolBarClass={classes.toolbar}
        search={search} setSearch={setSearch}
        idActivation={idActivation} setIdActivation={setIdActivation}
        contactID={contactID} setContactID={setContactID}
        contacts={contacts} client={client}
        setSnackbar={setSnackbar}
        drawerClass={classes.drawer} 
        contactsClass={classes.contactsLength}
        drawerPaperClass={classes.drawerPaper}
        mobileOpen={mobileOpen} drawerToggle={handleDrawerToggle}
      />
      
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {
          contacts
          ? <ContactGrid 
              contacts={contacts} search={search} setSnackbar={setSnackbar}
              idActivation={idActivation} setContactID={setContactID} 
            />
          : <CircularProgress />
        }
      { isOpen && <SnackbarMessage open={isOpen} message={message} result={result} setSnackbar={setSnackbar} /> }
      </main>
    </div>
  );
}

export default Home;

