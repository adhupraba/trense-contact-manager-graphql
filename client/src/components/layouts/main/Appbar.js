import React, { useState } from 'react'
import MenuIcon from '@material-ui/icons/Menu';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography';
import InfoDialog from './InfoDialog';

const Appbar = ({separatorClass, appBarClass, iconButtonClick, iconButtonClass, infoButtonClass}) => {
  
  const [open, setOpen] = useState(false)
  
    return (
      <AppBar position="fixed" className={appBarClass}>
        <div className={separatorClass}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={iconButtonClick}
              className={iconButtonClass}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h5">
              tReNsE Contacts Manager
            </Typography>
          </Toolbar>
          <InfoDialog open={open} setOpen={setOpen} infoButtonClass={infoButtonClass} />
        </div>
      </AppBar>
    )
}

export default Appbar
