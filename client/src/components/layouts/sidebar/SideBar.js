import React, { useContext } from 'react'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import Divider from '@material-ui/core/Divider'
import { useTheme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'

import Search from './searchSection/Search'
import AddContactOptions from './contactSection/AddContactOptions'
import AuthContext from '../../../context/authContext/AuthContext'
import TotalContacts from './totalSection/TotalContacts'
import LogoutButton from './logoutSection/LogoutButton'
import UserInfo from './userSection/UserInfo'

const useStyles = makeStyles((theme) => ({
  root: {
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(1)
  },
}));

const SideBar = ({
  toolBarClass, purpleClass, 
  contacts, client, 
  search, setSearch,
  drawerClass, drawerPaperClass, 
  mobileOpen, drawerToggle, 
  idActivation, setIdActivation,
  contactID, setContactID,
  setSnackbar, contactsClass, 
  ...props
}) => {
    
    const { logout } = useContext(AuthContext)
    
    const { window } = props;
    const classes = useStyles();
    const theme = useTheme();
    
    const logoutHandler = () => {
      client.resetStore()
      logout()
    }
    
    const drawer = (
        <div className={classes.root}>
          <UserInfo purpleClass={purpleClass} toolbarClass={toolBarClass} />
          <Divider />
          <Search contacts={contacts} search={search} setSearch={setSearch} />
          <Divider />
          <AddContactOptions 
            idActivation={idActivation} setIdActivation={setIdActivation} 
            contactID={contactID} setContactID={setContactID} setSnackbar={setSnackbar}
          />
          <Divider />
          <TotalContacts contacts={contacts} contactsClass={contactsClass} />
          <Divider />
          <LogoutButton logoutHandler={logoutHandler} />
          <Divider />
        </div>
      );
    
    const container = window !== undefined ? () => window().document.body : undefined;
    
    return (
        <nav className={drawerClass}>
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={drawerToggle}
            classes={{
              paper: drawerPaperClass,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: drawerPaperClass,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    )
}

export default SideBar