//컴포넌트를 쪼개면 반드시 react를 다시 불러와야함
const React = require("react");
const { Component } = React;

class WordRelay extends Component {
  state = {};

  render() {}
}

module.exports = WordRelay;

// 노드의 모듈 시스템임
// 해당 컴포넌트를 해당 파일 밖에서도 사용할 수 있게 만들어줌
// 바닐라자바스크립트 컴포넌트로 만드는것과 거의 동일함!!
// JS에서는 export와 'import 사용할 컴포넌트 from 경로'였다면
// Node에서는 'module.exports = 컴포넌트'와 'require(경로)'로 모듈화한다.
