import React from "react";
import ReactDom from "react-dom/client";
import NumberBaseball from "./NumberBaseball";
import Test from "./RenderTest";

// ReactDom.render(<NumberBaseball />, document.querySelector("#root"));
ReactDom.createRoot(document.querySelector("#root")).render(<NumberBaseball />);
