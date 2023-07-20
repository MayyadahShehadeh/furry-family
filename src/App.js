import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import { theme } from "./themes/theme";
import Routes from "./routes";
import PetsDataProvider from "./components/context/datacontext";

function App() {
  return (
    <>

    <Provider store={store}>
    <PetsDataProvider>
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </MuiThemeProvider>
    </PetsDataProvider>
    </Provider>
    </>
  );
}

export default App;
