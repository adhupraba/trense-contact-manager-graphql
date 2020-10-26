import React from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'

const LogoutButton = ({logoutHandler}) => {
    return (
        <List>
            <ListItem button onClick={logoutHandler}>
            <ListItemIcon>
                <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary='Logout' />
          </ListItem>
        </List>
    )
}

export default LogoutButton
