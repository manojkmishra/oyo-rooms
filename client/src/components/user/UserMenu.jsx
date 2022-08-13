import { Logout, Settings } from '@mui/icons-material';
import { ListItemIcon, Menu, MenuItem } from '@mui/material';
import React from 'react';
import { useValue } from '../../context/ContextProvider';
import useCheckToken from '../../hooks/useCheckToken';
import Profile from './Profile';

const UserMenu = ({ anchorUserMenu, setAnchorUserMenu }) => 
{ useCheckToken(); //check if token is not expired
  const { dispatch,state: { currentUser },} = useValue(); //take values from context
  const handleCloseUserMenu = () => {   console.log('usermenu.js-handleCloseUserMenu')
                                        setAnchorUserMenu(null);  
                                    };
/*  not needed, we used only to test google jwt token is correct or not
const testAuthorization = async () => 
  { const url = process.env.REACT_APP_SERVER_URL + '/room';
      try { const response = await fetch(url, {method: 'POST', 
    headers: {'Content-Type': 'application/json',authorization: `Bearer ${currentUser.token}t`,}, });
              const data = await response.json();
              console.log('usermenu.js--testAuthorization=res=',data);
              if (!data.success) 
              { if (response.status === 401) dispatch({ type: 'UPDATE_USER', payload: null });
                throw new Error(data.message);
              }
          } catch (error) 
          { dispatch({  type: 'UPDATE_ALERT', payload: { open: true, severity: 'error', message: error.message },});
            console.log(error);
          }
  }; */
  console.log('UserMenu.js-anchorUserMenu=',anchorUserMenu)
  return (
    <>
      <Menu  anchorEl={anchorUserMenu} open={Boolean(anchorUserMenu)}
              onClose={handleCloseUserMenu} onClick={handleCloseUserMenu}>
        <MenuItem onClick={() => dispatch({type: 'UPDATE_PROFILE',
                  payload: {open: true,file: null,photoURL: currentUser?.photoURL,},})
              }>
            <ListItemIcon><Settings fontSize="small"/></ListItemIcon>Profile 
        </MenuItem>
        <MenuItem onClick={() => dispatch({ type: 'UPDATE_USER', payload: null })}>
          <ListItemIcon><Logout fontSize="small" /></ListItemIcon>Logout</MenuItem>
      </Menu>
      <Profile />
    </>
  );
};

export default UserMenu;