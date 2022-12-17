import React from "react";
import ReactDom from "react-dom/client";
import ResponseCheck from "./ResponseCheck";

// ReactDom.render(<NumberBaseball />, document.querySelector("#root"));
ReactDom.createRoot(document.querySelector("#root")).render(<ResponseCheck />);
