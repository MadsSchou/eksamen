import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Flow from "./Flow";

ReactDOM.render(
  <Router>
    <Flow />
  </Router>,
  document.getElementById("root")
);
