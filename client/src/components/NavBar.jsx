import React, { useState } from 'react';
import {AppBar,Box,Button,Container,IconButton,Toolbar,Typography,} from '@mui/material';
import { Lock, Menu } from '@mui/icons-material';
//import photoURL from '../assets/profile.jpeg';
import UserIcons from './user/UserIcons';
import { useValue } from '../context/ContextProvider';
import Sidebar from './sidebar/Sidebar';
//const user = { name: 'test', photoURL };
//console.log('navbar user1=',user)
const NavBar = () => {
  const { state: { currentUser }, dispatch,} = useValue();
  const [isOpen, setIsOpen] = useState(false); //console.log('navbar user=',user,'currentUser=',currentUser)
  return (
    <>
    <AppBar>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Box sx={{ mr: 1 }}> 
              <IconButton size="large" color="inherit" onClick={() => setIsOpen(true)}>
              <Menu /></IconButton>
          </Box>
          <Typography variant="h6" component="h1" noWrap sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} > You Are Welcome </Typography>
          <Typography variant="h6" component="h1" noWrap sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>  YRW </Typography>
          {!currentUser ? ( <Button color="inherit" startIcon={<Lock />}
                                onClick={() =>// dispatch({ type: 'UPDATE_USER', payload: user })
                                dispatch({ type: 'OPEN_LOGIN' })
                                
                                }
                                >Login
                            </Button>
                        ) : (<UserIcons />)
            }
        </Toolbar>
      </Container>
    </AppBar>
    <Toolbar/>
    <Sidebar {...{ isOpen, setIsOpen }} />
    </>
  );
};

export default NavBar;