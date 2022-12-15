//컴포넌트를 쪼개면 반드시 react를 다시 불러와야함
const React = require("react");
const { useState, useRef } = React;

//React Hooks로 만들어본 Word Relay
const WordRelay = () => {
  const [word, setWord] = useState("우대현");
  const [value, setValue] = useState("");
  const [result, setResult] = useState("끝말잇기 시작!!");
  const inputRef = useRef(null);
  const [wordPath] = useState([]);

  const onSubmitForm = (e) => {
    e.preventDefault();
    if (
      wordPath.includes(`${value} -> `) &&
      word[word.length - 1] === value[0]
    ) {
      alert("중복된 단어 입니다!");
      return;
    }

    if (word[word.length - 1] === value[0]) {
      setResult("통과");
      setWord(value);
      setValue("");
      wordPath.push(`${value} -> `);
      inputRef.current.focus();
      //hooks에서는 ref에 current를 항상 붙여줘야함
    } else {
      setResult("패배");
      setValue("");
      inputRef.current.focus();
    }
  };

  const onChangeInput = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      <div>{word}</div>
      <form onSubmit={onSubmitForm}>
        <label htmlFor="inputWord">단어 입력 </label>
        <input ref={inputRef} value={value} onChange={onChangeInput} />
        <button>입력</button>
      </form>
      <div>{result}</div>
      <div>{wordPath}</div>
    </>
  );
};

module.exports = WordRelay;

// ********************************Class로 만들어 본 WordRealy
// const { Component } = React;

// class WordRelay extends Component {
//   state = {
//     word: "우대현",
//     value: "",
//     result: "끝말잇기 시작!!!!!!!!!!!!",
//     wordPath: [],
//   };
//   //클래스의 내가 만드는 메서드는 반드시 화살표 함수로 해주어야한다!!
//   //render처럼 직접 있는것은 빼고
//   onSubmitForm = (e) => {
//     e.preventDefault();
//     if (
//       this.state.wordPath.includes(`${this.state.value} -> `) &&
//       this.state.word[this.state.word.length - 1] === this.state.value[0]
//     ) {
//       alert("중복된 단어 입니다!");
//       return;
//     }

//     if (this.state.word[this.state.word.length - 1] === this.state.value[0]) {
//       this.setState({
//         result: "통과",
//         word: this.state.value,
//         value: "",
//       });
//       this.state.wordPath.push(`${this.state.value} -> `);
//       console.log(this.state);
//       this.input.focus();
//     } else {
//       this.setState({
//         result: "패배",
//         value: "",
//       });
//       //this.setState에 업데이트에 필요한 데이터만 넣어도 기존에 있던 state가 새롭게 할당되는게 아니라 기본 js 객체 문법과 동일함
//       console.log(this.state);
//       this.input.focus();
//     }
//   };

//   onChangeInput = (e) => {
//     this.setState({ value: e.target.value });
//   };

//   input;

//   onRefInput = (c) => {
//     this.input = c;
//   };

//   //지금은 class형태 이므로 state의 데이터를 활용할때 this.state.으로 데이터를 불러와야함!!
//   render() {
//     return (
//       <>
//         <div>{this.state.word}</div>
//         <form onSubmit={this.onSubmitForm}>
//           <input
//             ref={this.onRefInput}
//             value={this.state.value}
//             onChange={this.onChangeInput}
//           />
//           <button>입력</button>
//         </form>
//         <div>{this.state.result}</div>
//         <div>{this.state.wordPath}</div>
//       </>
//     );
//   }
// }

// module.exports = WordRelay;

// 노드의 모듈 시스템임
// 해당 컴포넌트를 해당 파일 밖에서도 사용할 수 있게 만들어줌
// 바닐라자바스크립트 컴포넌트로 만드는것과 거의 동일함!!
// JS에서는 export와 'import 사용할 컴포넌트 from 경로'였다면
// Node에서는 'module.exports = 컴포넌트'와 'require(경로)'로 모듈화한다.
