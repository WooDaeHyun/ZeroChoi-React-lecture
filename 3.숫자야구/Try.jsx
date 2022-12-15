import React, { Component } from "react";

class Try extends Component {
  render() {
    return (
      //여기서 v랑 i는 참조가 안되니까 에러가 발생함! v와 i에 대한 정보를 NumberBaseball에서 가져와야함
      //이때 사용하는것이 props임!! 부모가 자식에게 정보를 전달할 때 사용!!
      <li>
        <div>{this.props.value.try}</div>
        <div>{this.props.value.result}</div>
      </li>
    );
  }
}
//서로 유산을 물려주다가 고조가 손자에게 물려주고나 손자가 고조에 데이터를 물려주거나 했을때 props가 너무 복잡해 지므로
//리덕스, 컨텍스트 이런것들이 사용된다! 은행역할을 한다고 보면 된다.
export default Try;
