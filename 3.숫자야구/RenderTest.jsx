import React, { PureComponent } from "react";

class Test extends PureComponent {
  state = {
    counter: 0,
    array: [],
  };

  // shouldComponentUpdate(nextProps, nextState, nextContext) {
  //   if (this.state.counter !== nextState.counter) {
  //     return true;
  //   }
  //   return false;
  // }

  // onClick = () => {
  //   console.log(this.state);
  //   this.setState({});
  // };

  onClick = () => {
    const array2 = this.state.array;
    array2.push(1);
    console.log(this.state);
    this.setState({
      // array: array2,
      array: [...this.state.array, array2],
    });
  };

  render() {
    return (
      <div>
        <button onClick={this.onClick}>클릭</button>
      </div>
    );
  }
}

export default Test;
