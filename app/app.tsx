import React from "react";
import { render } from "react-dom";
import Rentals from "./rentals";

const App = () => {
  return (
    <div>
      <h1> Rentr </h1>
      <Rentals />
    </div>
  );
};

render(<App />, document.getElementById("root"));
