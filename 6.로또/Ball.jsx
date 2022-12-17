import React, { PureComponent } from "react";

const Ball = (props) => {
  const { number } = props;
  let background;
  if (number <= 10) {
    background = "red";
  } else if (number <= 20) {
    background = "orange";
  } else if (number <= 30) {
    background = "yellow";
  } else if (number <= 40) {
    background = "blue";
  } else {
    background = "green";
  }
  return (
    <div className="ball" style={{ background }}>
      {number}
    </div>
  );
};

//***********class 컴포넌트로 구현한 경우 */
// class Ball extends PureComponent {
//   state = {};

//   render() {
//     const { number } = this.props;
//     let background;
//     if (number <= 10) {
//       background = "red";
//     } else if (number <= 20) {
//       background = "orange";
//     } else if (number <= 30) {
//       background = "yellow";
//     } else if (number <= 40) {
//       background = "blue";
//     } else {
//       background = "green";
//     }

//     return (
//       <div className="ball" style={{ background }}>
//         {number}
//       </div>
//     );
//   }
// }

export default Ball;
