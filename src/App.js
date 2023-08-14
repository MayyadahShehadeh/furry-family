import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import { theme } from "./themes/theme";
import AllRoutes from "./routes";
import PetsDataProvider from "./components/context/datacontext";
// import { ChakraProvider } from '@chakra-ui/react'

function App() {
  return (
    <>

      <Provider store={store}>
        <PetsDataProvider>
          {/* <ChakraProvider> */}
          <ThemeProvider theme={theme}>

            <BrowserRouter>
              <AllRoutes />
            </BrowserRouter>
          </ThemeProvider>
          {/* </ChakraProvider> */}

        </PetsDataProvider>
      </Provider>
    </>
  );
}

export default App;
