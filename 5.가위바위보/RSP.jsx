import React, { Component, useState, useRef, useEffect } from "react";

// 클래스 컴포넌트의 경우 라이프사이클
// constructor -> render -> ref -> componentDidMount
// -> (setState/props 바뀔때 -> shouldComponentUpdate(true인 경우) -> render -> componentDidUpdate)
// 부모가 나를 없앴을 때 -> componentWillUnmount -> 소멸
// 참고로 함수형 컴포넌트의 경우에는 라이프 사이클이 없다!!

const rspCoords = {
  바위: "0",
  가위: "-142px",
  보: "-284px",
};

const scores = {
  가위: 1,
  바위: 0,
  보: -1,
};

const computerChoice = (imgCoord) => {
  return Object.entries(rspCoords).find(function (v) {
    return v[1] === imgCoord;
  })[0];
};

const RSP = () => {
  const [result, setResult] = useState("");
  const [imgCoord, setImgCoord] = useState("0");
  const [score, setScore] = useState(0);
  const interval = useRef(null);

  useEffect(() => {
    // componentDidMount, componentDidUpdate 역할(1대1 대응은 아님)
    interval.current = setInterval(changeHand, 100);
    return () => {
      // componentWillUnmount 역할
      clearInterval(interval.current);
    };
  }, [imgCoord]);

  // class 형의 경우!
  // componentDidMount() {
  //   // 컴포넌트가 첫 렌더링된 후 실행됨(즉, 돔에 붙은 직후!) 그러니까 1번만 실행됨 -> 비동기 요청을 많이 한다!
  //   // 예를들어 setInterval을 실행 후, clearInterval을 해주지 않으면 해당 페이지가 종료될 때까지 계속 혼자 돌아감
  //   // 또 setInterval이 어떤 이유에서든 또 동작하면 기존의 setInterval에서 또 setInterval이 추가되서 돌아감
  //   interval.current = setInterval(this.changeHand, 100);
  //   //setInterval은 해당 시간 이후에 콜백함수 반복 실행!
  //   //setTimeout은 해당 시간 이후에 콜백함수 한 번 실행!
  // }

  // componentDidUpdate() {
  //   //리렌더링 직후 바로 실행됨
  // }

  // componentWillUnmount() {
  //   //컴포넌트가 제거되기 직전에 실행됨(부모 컴포넌트에 의해 제거될 때도 실행됨) -> 비동기 요청 정리를 많이 한다!
  //   //지금 여기서는 component가 제거되지 않기 때문에 체감할 수는 없지만, 꼭 해줘야 메모리 누수 문제를 겪지 않는다.
  //   clearInterval(interval.current);
  // }

  const changeHand = () => {
    if (imgCoord === rspCoords.바위) {
      setImgCoord(rspCoords.가위);
    } else if (imgCoord === rspCoords.가위) {
      setImgCoord(rspCoords.보);
    } else if (imgCoord === rspCoords.보) {
      setImgCoord(rspCoords.바위);
    }
  };

  const onClickBtn = (choice) => {
    clearInterval(interval.current);
    const myScore = scores[choice];
    const cpuScore = scores[computerChoice(imgCoord)];
    const diff = myScore - cpuScore;
    if (diff === 0) {
      setResult("비겼습니다.");
    } else if ([-1, 2].includes(diff)) {
      setResult("이겼습니다.");
      setScore((prevScore) => {
        return prevScore + 1;
      });
    } else {
      setResult("졌습니다.");
      setScore((prevScore) => {
        return prevScore - 1;
      });
    }
    setTimeout(() => {
      interval.current = setInterval(changeHand, 100);
    }, 2000);
  };

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
        <button id="scissor" className="btn" onClick={() => onClickBtn("가위")}>
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
};

//****************************class로 구현 */
// class RSP extends Component {
//   state = {
//     result: "",
//     imgCoord: "0",
//     score: 0,
//   };

//   interval;

//   componentDidMount() {
//     // 컴포넌트가 첫 렌더링된 후 실행됨(즉, 돔에 붙은 직후!) 그러니까 1번만 실행됨 -> 비동기 요청을 많이 한다!
//     // 예를들어 setInterval을 실행 후, clearInterval을 해주지 않으면 해당 페이지가 종료될 때까지 계속 혼자 돌아감
//     // 또 setInterval이 어떤 이유에서든 또 동작하면 기존의 setInterval에서 또 setInterval이 추가되서 돌아감
//     this.interval = setInterval(this.changeHand, 100);
//     //setInterval은 해당 시간 이후에 콜백함수 반복 실행!
//     //setTimeout은 해당 시간 이후에 콜백함수 한 번 실행!
//   }

//   componentDidUpdate() {
//     //리렌더링 직후 바로 실행됨
//   }

//   componentWillUnmount() {
//     //컴포넌트가 제거되기 직전에 실행됨(부모 컴포넌트에 의해 제거될 때도 실행됨) -> 비동기 요청 정리를 많이 한다!
//     //지금 여기서는 component가 제거되지 않기 때문에 체감할 수는 없지만, 꼭 해줘야 메모리 누수 문제를 겪지 않는다.
//     clearInterval(this.interval);
//   }

//   changeHand = () => {
//     const { imgCoord } = this.state;
//     if (imgCoord === rspCoords.바위) {
//       this.setState({
//         imgCoord: rspCoords.가위,
//       });
//     } else if (imgCoord === rspCoords.가위) {
//       this.setState({
//         imgCoord: rspCoords.보,
//       });
//     } else if (imgCoord === rspCoords.보) {
//       this.setState({
//         imgCoord: rspCoords.바위,
//       });
//     }
//   };

//   onClickBtn = (choice) => {
//     const { imgCoord } = this.state;
//     clearInterval(this.interval);
//     const myScore = scores[choice];
//     const cpuScore = scores[computerChoice(imgCoord)];
//     const diff = myScore - cpuScore;
//     if (diff === 0) {
//       this.setState({
//         result: "비겼습니다.",
//       });
//     } else if ([-1, 2].includes(diff)) {
//       this.setState((prevState) => {
//         return {
//           result: "이겼습니다.",
//           score: prevState.score + 1,
//         };
//       });
//     } else {
//       this.setState((prevState) => {
//         return {
//           result: "졌습니다.",
//           score: prevState.score - 1,
//         };
//       });
//     }
//     setTimeout(() => {
//       this.interval = setInterval(this.changeHand, 100);
//     }, 2000);
//   };

//   render() {
//     const { result, score, imgCoord } = this.state;
//     return (
//       <>
//         <div
//           id="computer"
//           style={{
//             background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`,
//           }}
//         ></div>
//         <div>
//           <button
//             id="rock"
//             className="btn"
//             onClick={() => this.onClickBtn("바위")}
//           >
//             바위
//           </button>
//           <button
//             id="scissor"
//             className="btn"
//             onClick={() => this.onClickBtn("가위")}
//           >
//             가위
//           </button>
//           <button
//             id="paper"
//             className="btn"
//             onClick={() => this.onClickBtn("보")}
//           >
//             보
//           </button>
//         </div>
//         <div>{result}</div>
//         <div>현재 {score}점</div>
//       </>
//     );
//   }
// }

export default RSP;
