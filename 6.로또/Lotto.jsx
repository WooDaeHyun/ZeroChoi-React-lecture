import React, { useState, useRef, Component, useEffect, useMemo } from "react";
import Ball from "./Ball";

function getWinNumbers() {
  console.log("getWinNumbers");
  const candidate = Array(45)
    .fill()
    .map((v, i) => i + 1);
  const shuffle = [];
  while (candidate.length > 0) {
    shuffle.push(
      candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]
    );
  }
  const bonusNumber = shuffle[shuffle.length - 1];
  const winNumbers = shuffle.slice(0, 6).sort((a, b) => a - b);
  return [...winNumbers, bonusNumber];
}

//참고!!!!
//useMemo : 복잡한 함수 결과값을 기억
//useRef : 일반 값을 기억
const Lotto = () => {
  const lottoNumbers = useMemo(() => getWinNumbers(), []);
  //두 번째 인자인 배열의 요소의 변경이 있기 전까지 다시 실행되지 않음!
  //훅스가 getWinNumbers()의 리턴값을 기억하고 있을것임!
  const [winNumbers, setWinNumbers] = useState(lottoNumbers);
  const [winBalls, setWinBalls] = useState([]);
  const [bonus, setBonus] = useState(null);
  const [redo, setRedo] = useState(false);
  const timeouts = useRef([]);

  useEffect(() => {
    runTimeouts();
    return () => {
      timeouts.current.forEach((v) => {
        clearTimeout(v);
      });
    };
  }, [timeouts.current]);
  // 만약 빈 배열이면 componentDidMount와 동일하다.
  // 배열에 요소나 조건이 있으면 componentDidMount랑 componentDidUpdate 둘 다 수행
  // 배열에 조건을 넣을 수도 있음!

  const runTimeouts = () => {
    for (let i = 0; i < winNumbers.length - 1; i++) {
      //주의!!!!!!timeouts.current[i]는 timeouts.current의 상태변화가 일어난게 아니다!!!!
      //단순히 요소를 넣어줬을 뿐이다.
      timeouts.current[i] = setTimeout(() => {
        // setTimeout은 비동기 처리되어 태스큐에 쌓여있음 그래서 파바박 다 돌고 callstack으로 하나씩 이동해서 실행되는것임
        setWinBalls((prevWinBalls) => {
          return [...prevWinBalls, winNumbers[i]];
        });
      }, (i + 1) * 1000);
    }
    timeouts.current[6] = setTimeout(() => {
      setBonus(winNumbers[6]);
      setRedo(true);
    }, 7000);
  };

  // componentDidMount() {
  //   runTimeouts();
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   if (winBalls.length === 0) {
  //     runTimeouts();
  //   }
  // }

  // componentWillUnmount() {
  //   timeouts.current.forEach((v) => {
  //     clearTimeout(v);
  //   });
  // }

  const onClickRedo = () => {
    setWinNumbers(getWinNumbers());
    setWinBalls([]);
    setBonus(null);
    setRedo(false);
    timeouts.current = [];
    //timeouts.current가 직접적으로 재할당 되므로 상태가 변경된것임!
  };

  return (
    <>
      <div>당첨 숫자</div>
      <div id="경과창">
        {winBalls.map((v) => (
          <Ball key={v} number={v} />
          //계속 추가된다고 생각하는데 그게 아니라 그냥 새롭게 다시 그리는것임!
          //한 줄 그렸다가 다시 두 줄 새로 그렸다가, 다시 세 줄 새로 그렸다가, 다시 네 줄... 이런식임!!
        ))}
      </div>
      <div>보너스!</div>
      {bonus && <Ball number={bonus} />}
      {/* 위에 당첨 번호 6개도 새로 그리고 거기에 추가로 보너스 번호까지 새로 그리고! 이것임 */}
      {redo && <button onClick={onClickRedo}>한 번 더!</button>}
    </>
  );
};

//***********************class로 구현한 로또추첨기 */
// class Lotto extends Component {
//   state = {
//     winNumbers: getWinNumbers(), // 당첨 숫자들
//     winBalls: [], // 당첨 번호들
//     bonus: null, // 보너스 공
//     redo: false,
//   };

//   timeouts = [];

//   runTimeouts = () => {
//     const { winNumbers } = this.state;
//     for (let i = 0; i < this.state.winNumbers.length - 1; i++) {
//       this.timeouts[i] = setTimeout(() => {
//         // setTimeout은 비동기 처리되어 태스큐에 쌓여있음 그래서 파바박 다 돌고 callstack으로 하나씩 이동해서 실행되는것임
//         this.setState((prevState) => {
//           return {
//             winBalls: [...prevState.winBalls, winNumbers[i]],
//           };
//         });
//       }, (i + 1) * 1000);
//     }
//     this.timeouts[6] = setTimeout(() => {
//       this.setState({
//         bonus: winNumbers[6],
//         redo: true,
//       });
//     }, 7000);
//   };

//   componentDidMount() {
//     this.runTimeouts();
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (this.state.winBalls.length === 0) {
//       this.runTimeouts();
//     }
//   }

//   componentWillUnmount() {
//     this.timeouts.forEach((v) => {
//       clearTimeout(v);
//     });
//   }

//   onClickRedo = () => {
//     this.setState({
//       winNumbers: getWinNumbers(), // 당첨 숫자들
//       winBalls: [], // 당첨 번호들
//       bonus: null, // 보너스 공
//       redo: false,
//     });
//     this.timeouts = [];
//   };

//   render() {
//     const { winBalls, bonus, redo } = this.state;
//     return (
//       <>
//         <div>당첨 숫자</div>
//         <div id="경과창">
//           {winBalls.map((v) => (
//             <Ball key={v} number={v} />
//             //계속 추가된다고 생각하는데 그게 아니라 그냥 새롭게 다시 그리는것임!
//             //한 줄 그렸다가 다시 두 줄 새로 그렸다가, 다시 세 줄 새로 그렸다가, 다시 네 줄... 이런식임!!
//           ))}
//         </div>
//         <div>보너스!</div>
//         {bonus && <Ball number={bonus} />}
//         {/* 위에 당첨 번호 6개도 새로 그리고 거기에 추가로 보너스 번호까지 새로 그리고! 이것임 */}
//         {redo && <button onClick={this.onClickRedo}>한 번 더!</button>}
//       </>
//     );
//   }
// }

export default Lotto;
