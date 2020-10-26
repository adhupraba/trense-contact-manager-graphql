import React from 'react'
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

import { useMutation } from 'react-apollo';
import { DELETE_CONTACT_MUTATION } from './../../../graphql/mutations';
import { GET_ALL_CONTACTS_QUERY } from './../../../graphql/queries';

const DeleteButton = ({contactId, tooltipClass, setSnackbar}) => {
    
    const [deleteContact] = useMutation(DELETE_CONTACT_MUTATION, {
        update(proxy, result) {
            const cachedData = proxy.readQuery({
              query: GET_ALL_CONTACTS_QUERY
            })
            const contacts = cachedData.getContacts.filter((contact) => contact.id !== contactId)
            proxy.writeQuery({
              query: GET_ALL_CONTACTS_QUERY,
              data: {getContacts: contacts}
            })
            setSnackbar({
              isOpen: true, 
              message: 'Deleted successfully', 
              result: 'success'
            })
        },
        variables: {contactId},
        onError(err) {
          console.log(err)
        }
    })
    
    return (
        <Tooltip TransitionComponent={Zoom} title='Delete contact' classes={{tooltip: tooltipClass}}>
            <IconButton aria-label="delete" onClick={deleteContact}>
                <DeleteIcon />
            </IconButton>
        </Tooltip>
    )
}

export default DeleteButton
