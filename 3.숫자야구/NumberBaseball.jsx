import React from "react";
import Try from "./Try";
const { useState, useRef } = React;

function getNumbers() {
  const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];
  for (let i = 0; i < 4; i++) {
    const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }
  return array;
}

const NumberBaseball = () => {
  const [result, setResult] = useState("⚾️숫자야구");
  const [value, setValue] = useState("");
  const [answer, setAnswer] = useState(getNumbers); // lazy init 호출 연산자를 붙이지 않으면 한 번만 실행되고 다시 렌더링 되는건 무시됨(useState에서만 실행해야함)
  const [tries, setTries] = useState([]);
  //클래스 내부에서는 es6축약표현으로 메서드를 정의해야 하는데,
  //주의!!react에서는 개발자가 만든 메서드는 화살표함수로 정의해 주어야함!!
  const onSubmitForm = (e) => {
    e.preventDefault();
    if (value === answer.join("")) {
      setResult("홈런!");
      setTries([...tries, { try: value, result: "홈런" }]);
      setTimeout(() => {
        alert("게임을 다시 시작합니다!");
        setValue("");
        setAnswer(getNumbers());
        setTries([]);
        setResult("⚾️숫자야구");
      }, 1000);
    } else {
      const answerArray = value.split("").map((v) => parseInt(v));
      let strike = 0;
      let ball = 0;
      if (tries.length >= 9) {
        setResult(`10번 넘게 틀려서 실패! 답은 ${answer.join(",")} 입니다.`);
        setTimeout(() => {
          alert("게임을 다시 시작합니다!");
          setValue("");
          setAnswer(getNumbers());
          setTries([]);
          setResult("⚾️숫자야구");
        }, 1000);
      } else {
        for (let i = 0; i < 4; i++) {
          if (answerArray[i] === answer[i]) {
            strike++;
          } else if (answer.includes(answerArray[i])) {
            ball++;
          }
        }
        setTries([
          ...tries,
          {
            try: value,
            result: `${strike} 스트라이크, ${ball} 볼입니다.`,
          },
        ]);
        setResult(`${strike} 스트라이크, ${ball} 볼입니다.`);
      }
    }
  };

  const onChangeInput = (e) => {
    console.log(answer);
    if (isNaN(e.target.value)) {
      alert("숫자를 입력해 주세요!");
      return;
    }
    setValue(e.target.value);
  };

  //render는 리액트가 제공하는 메서드이므로 메서드 축약표현으로 가능하지만
  //내가 직접 만드는 메서드들은 화살표함수로 만들어야 한다.

  return (
    <>
      <h1>{result}</h1>
      <form onSubmit={onSubmitForm}>
        <input
          maxLength={4}
          //html에서는 maxlength 속성으로 작성 그치만 react에서는 maxLength로 작성한다
          //input에 입력될 수 있는 최대 길이임
          value={value}
          onChange={onChangeInput}
          //input은 value와 onChange를 세트를 묶어서 사용한다!!
          //만약 언컨트롤드인풋으로 작성하려면 value와 onChange 대신 defaultValue로 한다.
        />
      </form>
      <div>시도: {tries.length}</div>
      <ul>
        {tries.map((v, i) => {
          //여기서 v와 i가 Try에 컴포넌트에 전달이 되지 않음!
          //그래서 사용하는것이 props임! 부모가 자식에게 데이터를 넘겨줄때!! 사용함
          //html에서 어트리뷰트라고 부르는 속성을 react에서는 props라고 부른다!! 한 마디로 속성을 props라고 부름
          //보통 컴포넌트를 분리할 때 반복문을 기준으로 많이 분리한다고 함!
          //props는 부모-자식에게만 데이터 전달이 가능하다! (손자에게는 안돼) 주려면 주고 주고 주고 이런식으로 넘겨야함
          //A -> b -> c -> d -> e  이런경우에 A -> e로 바로 넘겨주기 위해서 등장한것이 context다.
          //context를 응용한것이 redux다.
          return <Try key={`${i + 1}차 시도 :`} value={v} />;
        })}
      </ul>
    </>
  );
};

// class로 만든 경우 ************************************************
// class NumberBaseball extends Component {
//   state = {
//     result: "숫자야구",
//     value: "",
//     answer: getNumbers(), // 게임을 위해 4자리 숫자를 만들어주는 함수
//     tries: [],
//   };
//   //클래스 내부에서는 es6축약표현으로 메서드를 정의해야 하는데,
//   //주의!!react에서는 개발자가 만든 메서드는 화살표함수로 정의해 주어야함!!
//   onSubmitForm = (e) => {
//     e.preventDefault();
//     if (this.state.value === this.state.answer.join("")) {
//       this.setState({
//         result: "홈런!",
//         tries: [...this.state.tries, { try: this.state.value, result: "홈런" }],
//       });
//       setTimeout(() => {
//         alert("게임을 다시 시작합니다!");
//         this.setState({
//           value: "",
//           answer: getNumbers(),
//           tries: [],
//         });
//       }, 1000);
//     } else {
//       const answerArray = this.state.value.split("").map((v) => parseInt(v));
//       let strike = 0;
//       let ball = 0;
//       if (this.state.tries.length >= 9) {
//         this.setState({
//           result: `10번 넘게 틀려서 실패! 답은 ${this.state.answer.join(
//             ","
//           )} 입니다.`,
//         });
//         alert("게임을 다시 시작합니다!");
//         this.setState({
//           value: "",
//           answer: getNumbers(),
//           tries: [],
//         });
//       } else {
//         for (let i = 0; i < 4; i++) {
//           if (answerArray[i] === this.state.answer[i]) {
//             strike++;
//           } else if (this.state.answer.includes(answerArray[i])) {
//             ball++;
//           }
//         }
//         this.setState({
//           tries: [
//             ...this.state.tries,
//             {
//               try: this.state.value,
//               result: `${strike} 스트라이크, ${ball} 볼입니다.`,
//             },
//           ],
//           value: "",
//         });
//       }
//     }
//   };

//   onChangeInput = (e) => {
//     console.log(this.state.answer);
//     this.setState({
//       value: e.target.value,
//     });
//   };

//   fruits = [
//     { fruit: "사과", taste: "맛있다" },
//     { fruit: "배", taste: "맛있다" },
//     { fruit: "포도", taste: "맛있다" },
//     { fruit: "귤", taste: "맛있다" },
//     { fruit: "감", taste: "맛있다" },
//   ];

//   render() {
//     //render는 리액트가 제공하는 메서드이므로 메서드 축약표현으로 가능하지만
//     //내가 직접 만드는 메서드들은 화살표함수로 만들어야 한다.
//     return (
//       <>
//         <h1>{this.state.result}</h1>
//         <form onSubmit={this.onSubmitForm}>
//           <input
//             maxLength={4}
//             //html에서는 maxlength 속성으로 작성 그치만 react에서는 maxLength로 작성한다
//             //input에 입력될 수 있는 최대 길이임
//             value={this.state.value}
//             onChange={this.onChangeInput}
//             //input은 value와 onChange를 세트를 묶어서 사용한다!!
//             //만약 언컨트롤드인풋으로 작성하려면 value와 onChange 대신 defaultValue로 한다.
//           />
//         </form>
//         <div>시도: {this.state.tries.length}</div>
//         <ul>
//           {this.state.tries.map((v, i) => {
//             //여기서 v와 i가 Try에 컴포넌트에 전달이 되지 않음!
//             //그래서 사용하는것이 props임! 부모가 자식에게 데이터를 넘겨줄때!! 사용함
//             //html에서 어트리뷰트라고 부르는 속성을 react에서는 props라고 부른다!! 한 마디로 속성을 props라고 부름
//             //보통 컴포넌트를 분리할 때 반복문을 기준으로 많이 분리한다고 함!
//             return <Try key={`${i + 1}차 시도 :`} value={v} />;
//           })}
//         </ul>
//       </>
//     );
//   }
// }
//리액트에서는 반복문을 map고차 함수를 사용해서 작성하면 된다!! 고차함수의 return문으로 반환받아서 사용하면 되는것임!!
//참고로 map의 고차함수는 첫 번째 인수로 value, 두 번째 인수로 index 를 받음! arr.map((value, index) => {}), value는
//반복되는 배열의 요소값을 가리킴!
//중요!!!!! 반복문을 돌릴때는 반복되는 태그에 key속성을 넣어서 반드시 고유값을 넣어주어야함!!(고유하기만 하면 어떤것이든 상관없음!!!!)
//키가 중복되는 경우에도 err가 발생한다!!
//라이브러리 react가 key를 보고 같은 컴포넌트인지 아닌지를 판단한다!!
//react에서 반복문을 작성할 때는 굉장히 자료구조에 따라 복잡해질 수 있는데, 반복문을 간소화시키는 방법이 바로 props이다!!
export default NumberBaseball;
