import React, { useCallback } from "react";
import { CLICK_CELL } from "./TicTacToe";

const Td = ({ rowIndex, cellIndex, dispatch, cellData }) => {
  const onClickTd = useCallback(() => {
    console.log(rowIndex, cellIndex);
    if (cellData) {
      return;
    }
    dispatch({
      type: CLICK_CELL,
      row: rowIndex,
      cell: cellIndex,
    });
    //참고로 useReducer는 state가 비동기적으로 바뀐다.
    //그래서 dispatch 코드 후에 dispatch를 통해 데이터 변화해도 바뀌기 전 데이터가 찍힘
    //리액트도 state가 비동기적으로 바뀐다!
    //반대로 redux는 state가 동기적으로 바뀐다.
    //비동기인 state에서 뭔가 처리를 하려면 우리는 항상 useEffect를 써야한다.
  }, [cellData]);

  return <td onClick={onClickTd}>{cellData}</td>;
};

export default Td;
