import React, { memo } from "react";

const Try = memo((props) => {
  //메모로 래핑을 한경우에는 부모컴포넌트가 리렌더링 되었을때 자식컴포넌트까지 리렌더링되는 것만 막아준다.
  //memo HOC 고차 컴포넌트이다.
  //메모로 래핑 될 때, React는 컴포넌트를 렌더링하고 결과를 메모이징한다. 그리고 다음 렌더링이 일어날 때 props가 같다면,
  //React는 메모이징된 내용을 재사용한다.
  //state나 props가 바뀐경우에는 여전히 리렌더링 잘 된다.
  return (
    <li>
      <div>{props.value.try}</div>
      <div>{props.value.result}</div>
    </li>
  );
});
Try.displayName = "Try";
//단, memo를하게 되면 컴포넌트의 이름이 변경되기 때문에 컴포넌트의 이름을 제대로 변경시켜주어야 한다.
export default Try;

//***********************class형태 */
// class Try extends Component {
//   render() {
//     return (
//       //여기서 v랑 i는 참조가 안되니까 에러가 발생함! v와 i에 대한 정보를 NumberBaseball에서 가져와야함
//       //이때 사용하는것이 props임!! 부모가 자식에게 정보를 전달할 때 사용!!
//       <li>
//         <div>{this.props.value.try}</div>
//         <div>{this.props.value.result}</div>
//       </li>
//     );
//   }
// }
// //서로 유산을 물려주다가 고조가 손자에게 물려주고나 손자가 고조에 데이터를 물려주거나 했을때 props가 너무 복잡해 지므로
// //리덕스, 컨텍스트 이런것들이 사용된다! 은행역할을 한다고 보면 된다.
// export default Try;

//주의******주의******주의******주의******주의******주의******주의******주의******
//props 데이터는 자식이 받아서 데이터를 변경하면 안된다!! 반듯이 부모가 바꿔주어야 한다! (부모에게도 영향을 미치기 때문에)
//만약 바꾸려고 한다면 자식 useState로 변경이 필요한 데이터를 새롭게 state로 만들고 ex [result, setResult]
//그 이벤트를 적용해서 setResult로 state를 변경해야 한다!
//그래야 부모에게 영향을 미치지 않는다.
