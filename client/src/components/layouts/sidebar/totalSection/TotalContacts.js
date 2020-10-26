import React from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const TotalContacts = ({contacts, contactsClass}) => {
    return (
        <List>
            <ListItem button>
                <ListItemText primary={contacts && `You have ${contacts.length} contacts`}  className={contactsClass} />
            </ListItem>
        </List>
    )
}

export default TotalContacts
