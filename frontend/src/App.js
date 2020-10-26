import React from "react";
// import './App.css';
import { Helmet } from "react-helmet-async";
import { Route, Switch } from "react-router-dom";
import MainPage from "./pages/MainPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <div className="App">
      <Helmet>
        <title>100moon1ta</title>
      </Helmet>
      <Switch>
        <Route component={MainPage} path="/" exact />
        <Route component={NotFoundPage} path="*" />
      </Switch>
    </div>
  );
}

export default App;
