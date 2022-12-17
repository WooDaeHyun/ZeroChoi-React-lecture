import React from "react";
import ReactDom from "react-dom/client";
import RSP from "./RSP";

// ReactDom.render(<NumberBaseball />, document.querySelector("#root"));
ReactDom.createRoot(document.querySelector("#root")).render(<RSP />);
