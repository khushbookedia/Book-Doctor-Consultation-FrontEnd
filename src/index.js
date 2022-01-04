import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from 'react-router-dom';
import Controller from "./screens/Controller";
import { MemoryRouter } from 'react-router'

 ReactDOM.render(<MemoryRouter><Controller /></MemoryRouter>, document.getElementById("root"));

// if("renders without crashing", () => {
  //   const div = document.createElement("root");
  //   ReactDOM.render(
  // <BrowserRouter>
  //   <Controller />
  // </BrowserRouter>,
  // div
  //   );
  //   ReactDOM.unmountComponentAtNode(div);
  // })

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
