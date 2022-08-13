import { Google } from '@mui/icons-material';
import { Button } from '@mui/material';
import React, { useState } from 'react';
import { useValue } from '../../context/ContextProvider';

const GoogleOneTapLogin = () => {
  const { dispatch } = useValue();
  const [disabled, setDisabled] = useState(false);

  const handleResponse = (response) => {
    console.log('googleonetap.js-response',response)
  };
  const handleGoogleLogin = () => {
    setDisabled(true);
    try {
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_REACT_APP_GOOGLE_CLIENT_ID,
        //client_id: "643201037744-1ufm2s2qq53neoim2fghc98lp3spdgcn.apps.googleusercontent.com",
        //client_id: "258259968913-6fkvegh351hdjlcmp6b2vsgv6qp7l2r1.apps.googleusercontent.com",
        callback: handleResponse,
        //callback: handleCallbackResponse,
       // state_cookie_domain: 'http://localhost:5173',
      });
     
      //console.log('hehe-client_id',client_id)
      window.google.accounts.id.prompt((notification) => 
      { console.log('notification',notification)
        if (notification.isNotDisplayed()) { throw new Error('clear the cookies or try later!'); }
        if (notification.isSkippedMoment() || notification.isDismissedMoment()) 
        {   setDisabled(false); }
      });
    } catch (error) {
      dispatch({
        type: 'UPDATE_ALERT',
        payload: { open: true, severity: 'error', message: error.message },
      });
      console.log('googleonetap-error=',error);
    }
  };
  return (
    <Button variant="outlined" startIcon={<Google />}  disabled={disabled} onClick={handleGoogleLogin}>
      Login with Google
    </Button>
  );
};

export default GoogleOneTapLogin;