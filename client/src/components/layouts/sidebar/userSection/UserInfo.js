import React, { useContext } from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import PhoneIcon from '@material-ui/icons/Phone'
import { ListItemAvatar } from '@material-ui/core'

import AuthContext from './../../../../context/authContext/AuthContext';

const UserInfo = ({toolbarClass, purpleClass}) => {
    
    const { user: {username, phoneNum} } = useContext(AuthContext)
    
    return (
        <div className={toolbarClass}>
            <List>
                <ListItem button>
                    <ListItemAvatar>
                        <Avatar className={purpleClass}>
                            {username.charAt(0).toUpperCase()}
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={username} autoCapitalize='true' />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <PhoneIcon />
                    </ListItemIcon>
                    <ListItemText primary={phoneNum} />
                </ListItem>
            </List>
        </div>
    )
}

export default UserInfo