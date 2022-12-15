import React from "react";
import ReactDom from "react-dom/client";

import NumberBaseball from "./NumberBaseball";

// ReactDom.render(<NumberBaseball />, document.querySelector("#root"));
ReactDom.createRoot(document.querySelector("#root")).render(<NumberBaseball />);
