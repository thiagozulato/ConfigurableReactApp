import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "./App";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import querystring from "query-string";
import { bootstrapLoader } from "./BootstrapContainer";

const GlobalStyles = createGlobalStyle`
  html, body, #root {
    height: 100%;
  }

  body {
    padding: 0;
    margin: 0;
    font-family: 'Questrial', sans-serif;
  }
`;

const LoaderApp = ({ config, theme, menu }) => {
  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <GlobalStyles />
        <BrowserRouter basename={config.basePath}>
          <Switch>
            <Route
              exact
              path="/"
              render={props => (
                <>
                  <h2>Initial App</h2>
                  <button onClick={() => props.history.push("/restrito")}>
                    Go to Restrict Area
                  </button>
                </>
              )}
            />
            <Route
              path="/restrito"
              render={props => <App {...props} menu={menu} />}
            />
            <Route
              exact
              path="/external"
              render={props => {
                var parametrosUrl = querystring.parse(props.location.search);
                return (
                  <>
                    <h3>External access</h3>
                    <strong>{parametrosUrl.code}</strong>
                  </>
                );
              }}
            />
          </Switch>
        </BrowserRouter>
      </React.Fragment>
    </ThemeProvider>
  );
};

export default bootstrapLoader(LoaderApp);
