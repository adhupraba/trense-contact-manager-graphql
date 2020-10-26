import React from 'react'
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';

import { useMutation } from 'react-apollo';
import { DELETE_PHONE_NUMBER_MUTATION } from '../../../graphql/mutations';
import { GET_ALL_CONTACTS_QUERY } from '../../../graphql/queries';

const PhoneNumberList = ({num, contactId, cursorClass, setSnackbar, tooltipClass}) => {
    
    const [deletePhoneNumber] = useMutation(DELETE_PHONE_NUMBER_MUTATION, {
        update(proxy, result) {
            // console.log(result)
            const cachedData = proxy.readQuery({
                query: GET_ALL_CONTACTS_QUERY
            })
            // console.log('cachedData', cachedData)
            const contacts = cachedData.getContacts.map((contact) => {
                return {...contact, phoneNum: contact.phoneNum.filter((nums) => nums.id !== num.id)}
            })
            proxy.writeQuery({
                query: GET_ALL_CONTACTS_QUERY,
                data: {getContacts: contacts}
            })
            setSnackbar({
                isOpen: true,
                message: 'Number deleted successfully',
                result: 'success'
            })
        },
        variables: {contactId, phoneNumId: num.id},
        onError(err) {
            console.log(err)
            setSnackbar({
                isOpen: true,
                message: 'Failed to delete number',
                result: 'error'
            })
        }
    })
    
    return (
        <Tooltip TransitionComponent={Zoom} title='Double Click to Delete Number' classes={{tooltip: tooltipClass}}>
            <Typography 
                key={num.id} 
                color='textSecondary' 
                onDoubleClick={deletePhoneNumber}
                className={cursorClass}
            >
                {num.number} - {num.numType.charAt(0).toUpperCase()}
            </Typography>
        </Tooltip>
    )
}

export default PhoneNumberList
