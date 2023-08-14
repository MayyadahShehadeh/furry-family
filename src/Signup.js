import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { Form } from 'react-bootstrap';
import { Button,FormHelperText,} from "@material-ui/core";
import { register } from "./store/utils/thunkCreators";
import './components/css/signup.css'

const Login = (props) => {
  const history = useHistory();
  const { user, register } = props;
  const [formErrorMessage, setFormErrorMessage] = useState({});

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;
    const role = event.target.role.value;
    const phone = event.target.phone.value;
    const photoUrl = event.target.photoUrl.value;
    const address = event.target.address.value;

    if (password !== confirmPassword) {
      setFormErrorMessage({ confirmPassword: "Passwords must match" });
      return;
    }

    await register({ username, email,photoUrl, phone,address, password, role });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <div className="wrapperr">
      <br /><br /><br /><br /><br /><br />
      <form className="form-signup" onSubmit={handleRegister}>
        <h2 className="form-signup-heading" style={{ textAlign: 'center', paddingTop: '10px' }}>Signup</h2>
        <input type="text" className="form-control" name="username" placeholder="Username" required="" autofocus="" />
        <input type="text" className="form-control" name="email" placeholder="Email Address" required="" autofocus="" />

        <input type="text" className="form-control" name="photoUrl" placeholder="photoUrl" required="" autofocus="" />

        <input type="text" className="form-control" name="address" placeholder="address" required="" autofocus="" />


        <input type="text" className="form-control" name="phone" placeholder="phone" required="" autofocus="" />

        <Form.Group controlId="role">
          {/* <Form.Label for="role" name="role">Role :</Form.Label> */}
          <Form.Control as="select" name="role" placeholder="Choose" >
            <option disabled>Choose</option>
            <option value="petfinder" >pet finder</option>
            <option value="petowner">pet owner</option>

          </Form.Control>
        </Form.Group>

        {/* <FormControl error={!!formErrorMessage.confirmPassword}>
                <TextField
                aria-label="password"
                label="Password"
                  type="password"
                  inputProps={{ minLength: 6 }}
                  name="password"
                  required
                  />
                <FormHelperText>
                  {formErrorMessage.confirmPassword}
                </FormHelperText>
              </FormControl>
              
              
              <FormControl error={!!formErrorMessage.confirmPassword}>
                <TextField
                label="Confirm Password"
                aria-label="confirm password"
                type="password"
                inputProps={{ minLength: 6 }}
                name="confirmPassword"
                required
                />
                <FormHelperText>
                {formErrorMessage.confirmPassword}
                </FormHelperText>
                </FormControl> */}
        {/* <input type="text" className="form-control" name="username" placeholder="Email Address" required="" autofocus="" />
        <input type="text" className="form-control" name="username" placeholder="Email Address" required="" autofocus="" /> */}

        <input type="password" className="form-control" name="password" placeholder="Password" required=""
          error={!!formErrorMessage.confirmPassword} />
        <FormHelperText>
          {formErrorMessage.confirmPassword}
        </FormHelperText>


        <input type="password" className="form-control" name="confirmPassword" placeholder="confirmPassword" required=""
          error={!!formErrorMessage.confirmPassword} />
        <FormHelperText>
          {formErrorMessage.confirmPassword}
        </FormHelperText>
        <label className="checkbox">
          <input type="checkbox" value="remember-me" id="rememberMe" name="rememberMe" /> Remember me
        </label>
        <button className="btn btn-lg btn-primary btn-block" type="submit"
          style={{ backgroundColor: '#ed1e4d', boxShadow: '#ed1e4d', msScrollbarShadowColor: '#ed1e4d' }}>signup</button>
        <div style={{ display: 'inline' }}>
          <p>Already Have an Account ?

            <Button className="hover-underline-animation" onClick={() => history.push("/login")}>Login</Button>
          </p>
        </div>

      </form>

      <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />

      {/* ---------------------------------- */}
      {/* <Grid container justify="center">
      <Box>
      <Grid container item>
      <Typography>Need to log in?</Typography>
      <Button onClick={() => history.push("/login")}>Login</Button>
        </Grid> */}
      {/* <form onSubmit={handleRegister}> */}
      {/* <Grid>
            <Grid>
            <FormControl>
            <TextField
            aria-label="username"
            label="Username"
            name="username"
            type="text"
            required
            />
            </FormControl>
            </Grid>
          <Grid> */}
      {/* <FormControl>
                <TextField
                label="E-mail address"
                aria-label="e-mail address"
                type="email"
                name="email"
                required
                />
              </FormControl>
            </Grid>
            <Grid> */}
      {/* <Form.Group controlId="role">
              <Form.Label for="role" name="role">Role :</Form.Label>
            <Form.Control as="select" name="role" > */}
      {/* <option value="admin">Admin</option> */}
      {/* <option value="petfinder" >pet finder</option>
                <option value="petowner">pet owner</option> */}

      {/* </Form.Control> */}
      {/* </Form.Group> */}
      {/* </Grid>
            <Grid> */}
      {/* <FormControl error={!!formErrorMessage.confirmPassword}>
                <TextField
                aria-label="password"
                label="Password"
                  type="password"
                  inputProps={{ minLength: 6 }}
                  name="password"
                  required
                  />
                <FormHelperText>
                  {formErrorMessage.confirmPassword}
                </FormHelperText>
              </FormControl>
              </Grid>
              <Grid>
              <FormControl error={!!formErrorMessage.confirmPassword}>
                <TextField
                label="Confirm Password"
                aria-label="confirm password"
                type="password"
                inputProps={{ minLength: 6 }}
                name="confirmPassword"
                required
                />
                <FormHelperText>
                {formErrorMessage.confirmPassword}
                </FormHelperText>
                </FormControl>
                </Grid>
                <Button type="submit" variant="contained" size="large">
                Create
                </Button>
                </Grid>
                </form>
                </Box>
              </Grid> */}

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
    register: (credentials) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
