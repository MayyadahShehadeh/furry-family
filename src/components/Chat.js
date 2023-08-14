import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
// import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, CssBaseline } from '@material-ui/core';
import { SidebarContainer } from './Sidebar';
import { ActiveChat } from './ActiveChat';
import { 
  // logout, 
  fetchConversations } from '../store/utils/thunkCreators';
// import { clearOnLogout } from '../store/index';

const styles = {
  root: {
    height: '97vh',
  },
};

const Home = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
console.log('userrr' , user)
  // const handleLogout = () => {
  //   dispatch(logout(user.id));
  //   dispatch(clearOnLogout());
  // };

  useEffect(() => {
    dispatch(fetchConversations());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setIsLoggedIn(true);
  }, [user?.id]);
  console.log('isLoggedIn',isLoggedIn);

  const { classes } = props;
  console.log('classsssss',classes);
  // if (!user.id) {
  //   // If we were previously logged in, redirect to login instead of register
  // return <Redirect to='/' />;
  //   // return <Redirect to='/register' />;
  // }
  return (
    <>
    <div style={{backgroundColor:'white',border:"6px radius black"}}>

      {/* logout button will eventually be in a dropdown next to username */}
      {/* <Button className={classes.logout} onClick={handleLogout}>
        Logout
      </Button> */}
      <Grid container component='main' className={classes.root}>
        <CssBaseline />
        <SidebarContainer />
        <ActiveChat />
      </Grid>
      </div>
    </>
  );
};

export default withStyles(styles)(Home);
