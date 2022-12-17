import React, { Component, useState, useRef } from "react";

// 클래스 컴포넌트의 경우 라이프사이클
// constructor -> render -> ref -> componentDidMount
// -> (setState/props 바뀔때 -> shouldComponentUpdate(true인 경우) -> render -> componentDidUpdate)
// 부모가 나를 없앴을 때 -> componentWillUnmount -> 소멸

class RSP extends Component {
  state = {
    result: "",
    score: 0,
    imgCoord: 0,
  };

  componentDidMount() {
    // 컴포넌트가 첫 렌더링된 후 실행됨(즉, 돔에 붙은 직후!) 그러니까 1번만 실행됨
  }

  componentDidUpdate() {
    //리렌더링 후 실행됨(부모컴포넌트에 의해 제거될 때도 실행됨)
  }

  componentWillUnmount() {
    //컴포넌트가 제거되기 직전에 실행됨
  }

  render() {
    const { result, score, imgCoord } = this.state;
    return (
      <>
        <div
          id="computer"
          style={{
            background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`,
          }}
        ></div>
        <div>
          <button id="rock" className="btn" onClick={() => onClickBtn("바위")}>
            바위
          </button>
          <button
            id="scissor"
            className="btn"
            onClick={() => onClickBtn("가위")}
          >
            가위
          </button>
          <button id="paper" className="btn" onClick={() => onClickBtn("보")}>
            보
          </button>
        </div>
        <div>{result}</div>
        <div>현재 {score}점</div>
      </>
    );
  }
}

export default RSP;
