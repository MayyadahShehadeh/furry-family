import React, { useEffect, useState } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { fetchUser } from "./store/utils/thunkCreators";
import Signup from "./Signup.js";
import Login from "./Login.js";
import { SnackbarError } from "./components";
import Home from "./components/Home.js";
import Sign from "./Sign";
import Chat from "./components/Chat";
import ProfilesRender from "./components/ProfilesRender";
import Header from './components/Header';
import Footer from './components/Footer'
import DogsRenders from "./components/petsPages/DogsRenders";
import CatsRender from "./components/petsPages/CatsRender";

const Routes = (props) => {
  const { user, fetchUser } = props;
  const [errorMessage, setErrorMessage] = useState("");
  const [snackBarOpen, setSnackBarOpen] = useState(false);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    if (user.error) {
      // check to make sure error is what we expect, in case we get an unexpected server error object
      if (typeof user.error === "string") {
        setErrorMessage(user.error);
      } else {
        setErrorMessage("Internal Server Error. Please try again");
      }
      setSnackBarOpen(true);
    }
  }, [user.error]);

  if (props.user.isFetchingUser) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {snackBarOpen && (
        <SnackbarError
          setSnackBarOpen={setSnackBarOpen}
          errorMessage={errorMessage}
          snackBarOpen={snackBarOpen}
        />
      )}
      <Header/>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Signup} />
        <Route path="/sign" component={Sign} />
        {/* <Route path="/chat" component={Chat} /> */}
        <Route path="/profile" component={ProfilesRender} />
        <Route path="/dogs" component={DogsRenders} />
        <Route path="/cats" component={CatsRender} />


        {/* <Route
          path="/chat"
          element={<Chat/>}
        > </Route> */}
        <Route path="/" component={Home} />
      </Switch>
      <Footer/>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser() {
      dispatch(fetchUser());
    },
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Routes));
