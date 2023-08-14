import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";

import {Button} from "@material-ui/core";
import { login } from "./store/utils/thunkCreators";
import './components/css/login.css'


const Login = (props) => {
  const history = useHistory();
  const { user, login } = props;

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await login({ username, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (

    <div>
      <div className="wrapper">
<br/><br/><br/><br/><br/><br/>
    <form className="form-signin" onSubmit={handleLogin}>       
      <h2 className="form-signin-heading" style={{textAlign:'center', paddingTop:'10px'}}> Login</h2>
      <input type="text" className="form-control" name="username" placeholder="Username" required="" autofocus="" />
      <input type="password" className="form-control" name="password" placeholder="Password" required=""/>      
      <label className="checkbox">
        <input type="checkbox" value="remember-me" id="rememberMe" name="rememberMe"/> Remember me
      </label>
      <button className="btn btn-lg btn-primary btn-block" type="submit" 
      style={{backgroundColor:'#ed1e4d',boxShadow:'#ed1e4d',msScrollbarShadowColor:'#ed1e4d'}}>Login</button>  
      <div style={{display:'inline'}}>
        <p>Don't Have an Account ?
                  <Button className="hover-underline-animation" onClick={() => history.push("/register")}>Register</Button>
                  </p></div>
 
    </form>
<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
  </div> 
      {/* ------------------------------------- */}
      {/* <Grid container justify="center"> */}
        {/* <Box>
          <Grid container item>
            <Typography>Need to register?</Typography>
            <Button onClick={() => history.push("/register")}>Register</Button>
          </Grid> */}
          {/* <form onSubmit={handleLogin}> */}
            {/* <Grid>
              <Grid>
                <FormControl margin="normal" required>
                  <TextField
                    aria-label="username"
                    label="Username"
                    name="username"
                    type="text"
                  />
                </FormControl>
              </Grid>
              <FormControl margin="normal" required>
                <TextField
                  label="password"
                  aria-label="password"
                  type="password"
                  name="password"
                />
              </FormControl>
              <Grid>
                <Button type="submit" variant="contained" size="large">
                  Login
                </Button>
              </Grid>
            </Grid> */}
          {/* </form> */}
        {/* </Box>
      </Grid> */}
      {/* </div> */}
    </div>

  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
