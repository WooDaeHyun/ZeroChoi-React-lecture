import React from "react";
const { useState, useRef, Component } = React;

class ResponseCheck extends Component {
  state = {
    state: "waiting",
    message: "클릭해서 시작하세요",
    result: [],
  };
  //state가 변경되면 리렌더링이 되지만 그 외 변수들이 변경되도 리렌더링 되지 않음
  timeout;
  startTime;
  endTime;

  onClickScreen = () => {
    const { state, message, result } = this.state;
    if (state === "waiting") {
      this.setState({
        state: "ready",
        message: "초록색이 되면 클릭하세요",
      });
      this.timeout = setTimeout(() => {
        this.setState({
          state: "now",
          message: "지금 클릭",
        });
        //초록색으로 바뀐 뒤부터 클릭시까지의 시간을 계산
        this.startTime = new Date();
      }, Math.floor(Math.random() * 1000) + 2000);
    } else if (state === "ready") {
      clearTimeout(this.timeout);
      this.setState({
        state: "waiting",
        message: "너무 성급하시군요! 초록색이 된 후에 클릭하세요",
      });
    } else if (state === "now") {
      this.endTime = new Date();
      this.setState((prevState) => {
        return {
          state: "waiting",
          result: [...prevState.result, this.endTime - this.startTime],
          message: "클릭해서 시작하세요",
        };
      });
    }
  };

  render() {
    //render 안에서는 for문이나 if문을 사용할 수 없다.
    return (
      <>
        <div
          id="screen"
          className={this.state.state}
          onClick={this.onClickScreen}
        >
          {this.state.message}
        </div>
        {this.state.result.length === 0 ? null : (
          <>
            <ul>
              {this.state.result.map((v) => {
                return <li>{v}ms</li>;
              })}
            </ul>
            <div>
              평균 시간 :
              {this.state.result.reduce((a, c) => a + c) /
                this.state.result.length}
              ms
            </div>
          </>
        )}
      </>
    );
  }
}
//false, undefined, null은 jsx에서 태그없음을 의미합니다!
//리액트에서 조건문은 보통 삼항 연산자로 많이 사용함!
//또는 단축 평가로 사용함
//리액트는 자바스크립트 역할만 담당하기 때문에 css는 동일하게 적용하면 된다!

export default ResponseCheck;
