import React from "react";
const { useState, useRef, Component } = React;

//*****************함수형 컴포넌트로 구현한 경우
const ResponseCheck = () => {
  const [state, setState] = useState("waiting");
  const [message, setMessage] = useState("클릭해서 시작하세요");
  const [result, setResult] = useState([]);
  //Ref는 렌더링은 원하지 않지만 값이 변화하는 데이터들을 기록하는 용으로도 Ref를 사용할 수 있다.
  //Ref를 만들면 반드시 current로 접근해야 한다.
  const timeOut = useRef(null);
  const startTime = useRef(null);
  const endTime = useRef(null);

  const onClickScreen = () => {
    if (state === "waiting") {
      setState("ready");
      setMessage("초록색이 되면 클릭하세요");

      timeOut.current = setTimeout(() => {
        setState("now");
        setMessage("지금 클릭");
        //초록색으로 바뀐 뒤부터 클릭시까지의 시간을 계산
        startTime.current = new Date();
        console.log(startTime);
      }, Math.floor(Math.random() * 1000) + 2000);
    } else if (state === "ready") {
      clearTimeout(timeOut.current);
      setState("waiting");
      setMessage("너무 성급하시군요! 초록색이 된 후에 클릭하세요");
    } else if (state === "now") {
      endTime.current = new Date();
      setState("waiting");
      setResult((prevResult) => {
        return [...prevResult, endTime.current - startTime.current];
      });
      setMessage("클릭해서 시작하세요");
    }
  };

  const onReset = () => {
    setResult([]);
  };

  //render 안에서는 for문이나 if문을 사용할 수 없다.
  return (
    <>
      <div id="screen" className={state} onClick={onClickScreen}>
        {message}
      </div>
      {result.length === 0 ? null : (
        <>
          <ul>
            {/* map은 새로운 배열을 생성해서 반환하지만, jsx에서는 배열안에 jsx담아서 리턴하는것도 가능하다!(풀어서 태그들이 인식됨) 그래서 map을 작성해도 되는것임  */}
            {result.map((v) => {
              return <li key={new Date()}>{v}ms</li>;
            })}
          </ul>
          <div>
            평균 시간 :{result.reduce((a, c) => a + c) / result.length}
            ms
          </div>
          <div>
            {/* return문 내에서 for문이나 if문을 사용하고 싶다면, 화살표 함수 내부에서 사용하고, 즉시실행 함수로 만들어 주어야함 */}
            {(() => {
              if (true) {
                return;
              }
              for (let i = 0; i < 2; i++) {
                return;
              }
            })()}
          </div>
          <button onClick={onReset}>리셋</button>
        </>
      )}
    </>
  );
};

//******************class로 구현한 경우 */
// class ResponseCheck extends Component {
//   state = {
//     state: "waiting",
//     message: "클릭해서 시작하세요",
//     result: [],
//   };
//   //state가 변경되면 리렌더링이 되지만 그 외 변수들이 변경되도 리렌더링 되지 않음
//   timeout;
//   startTime;
//   endTime;

//   onClickScreen = () => {
//     const { state, message, result } = this.state;
//     if (state === "waiting") {
//       this.setState({
//         state: "ready",
//         message: "초록색이 되면 클릭하세요",
//       });
//       this.timeout = setTimeout(() => {
//         this.setState({
//           state: "now",
//           message: "지금 클릭",
//         });
//         //초록색으로 바뀐 뒤부터 클릭시까지의 시간을 계산
//         this.startTime = new Date();
//       }, Math.floor(Math.random() * 1000) + 2000);
//     } else if (state === "ready") {
//       clearTimeout(this.timeout);
//       this.setState({
//         state: "waiting",
//         message: "너무 성급하시군요! 초록색이 된 후에 클릭하세요",
//       });
//     } else if (state === "now") {
//       this.endTime = new Date();
//       this.setState((prevState) => {
//         return {
//           state: "waiting",
//           result: [...prevState.result, this.endTime - this.startTime],
//           message: "클릭해서 시작하세요",
//         };
//       });
//     }
//   };

//   onReset = () => {
//     this.setState({
//       result: [],
//     });
//   };

//   render() {
//     //render 안에서는 for문이나 if문을 사용할 수 없다.
//     return (
//       <>
//         <div
//           id="screen"
//           className={this.state.state}
//           onClick={this.onClickScreen}
//         >
//           {this.state.message}
//         </div>
//         {this.state.result.length === 0 ? null : (
//           <>
//             <ul>
//               {this.state.result.map((v) => {
//                 return <li>{v}ms</li>;
//               })}
//             </ul>
//             <div>
//               평균 시간 :
//               {this.state.result.reduce((a, c) => a + c) /
//                 this.state.result.length}
//               ms
//             </div>
//             <button onClick={this.onReset}>리셋</button>
//           </>
//         )}
//       </>
//     );
//   }
// }
//false, undefined, null은 jsx에서 태그없음을 의미합니다!
//리액트에서 조건문은 보통 삼항 연산자로 많이 사용함!
//또는 단축 평가로 사용함
//리액트는 자바스크립트 역할만 담당하기 때문에 css는 동일하게 적용하면 된다!

export default ResponseCheck;
