import React, { Component } from "react";

class Try extends Component {
  render() {
    return (
      //여기서 v랑 i는 참조가 안되니까 에러가 발생함! v와 i에 대한 정보를 NumberBaseball에서 가져와야함
      //이때 사용하는것이 props임!! 부모가 자식에게 정보를 전달할 때 사용!!
      <li key={this.props.value.fruit}>
        <b>{this.props.value.fruit}</b> - {this.props.index}
        <div>컨텐츠</div>
        <div>컨텐츠</div>
        <div>컨텐츠</div>
        <div>컨텐츠</div>
      </li>
    );
  }
}

export default Try;
