import React, { Fragment } from "react";
import Home from "../screens/home/Home";
import { Route } from "react-router-dom";
import Header from "../common/header/Header";


export default function Controller() {
  const baseUrl = "/api/v1/";
  return (
    <Fragment>
      
      <div className="main-container">
        {/* <Header/> */}
        <Route exact path="/" render={(props) => <Home {...props} baseUrl={baseUrl} />}/>
      </div>
    </Fragment>
  );
};

//export default Controller;
