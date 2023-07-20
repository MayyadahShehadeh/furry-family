import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';

export default function Sign() {

    const user = useSelector((state) => state.user);
    const [isLoggedIn, setIsLoggedIn] = useState(false);



    useEffect(() => {
        setIsLoggedIn(true);
      }, [user?.id]);

    
        
        // If we were previously logged in, redirect to login instead of register
        if (isLoggedIn) return <Redirect to='/register' />;
         return <Redirect to='/login' />;
      
 
}
