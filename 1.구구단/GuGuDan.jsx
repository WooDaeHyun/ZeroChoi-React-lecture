const React = require("react");
const { useState, useRef } = React;
//React에서 필요한 useState(state초기값 설정 및 state를 갱신할 수 있는 setState를 useState가 가지고 있음)와 useRef만 빼옴

const GuGuDan = () => {
  //this.state = {first:0,second:1,value:1,result:''} 이걸 하나씩 나 따로 빼서 state를 만들어야함!! 그리고
  //[first, setFirst]에서 first의 값은 React.useState(first값) << 이 값이 first의 값이 되고
  //setFirst는 first의 전용 setState라고 생각하면 된다.
  //그리고 이와 같은 데이터들은 무조건 컴포넌트 안에 들어가 있어야 한다!!
  //Vue에서 content에 데이터를 넣을때는 {{}} 이중 중괄호/
  //React에서 자바스크립트 데이터를 넣을때는 {} 중괄호
  const [first, setFirst] = useState(Math.ceil(Math.random() * 9));
  const [second, setSecond] = useState(Math.ceil(Math.random() * 9));
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");
  const inputRef = useRef(null);

  //-----위의 내용이 바로 React hook임--------//
  //hook을 사용할때는 데이터를 하나 하나 다 쪼개야함!! 위의 예시처럼!!
  //참고로 react 태그 내의 class를 className으로 사용해야함(ECMA6 class랑 헷갈리기 때문)
  //label에 for 속성을 많이 사용하는데 react에서는 htmlFor로 사용해야함(for반복문이랑 헷갈리기 때문)
  const onChangeInput = (e) => {
    setValue(e.target.value);
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    if (parseInt(value) === first * second) {
      setResult("정답입니다 " + value);
      // setResult((prevResult) => {
      //   return '정답' + value
      // });
      //콜백 함수를 통해서 return 문으로 반환할 수 있음!!
      setFirst(Math.ceil(Math.random() * 9));
      setSecond(Math.ceil(Math.random() * 9));
      setValue("");
      inputRef.current.focus();
    } else {
      setResult("땡");
      setValue("");
      inputRef.current.focus();
    }
  };

  return (
    // React.Fragment의 축약표현 <> </>
    <>
      <div>
        {first} 곱하기 {second}는?
      </div>
      <form onSubmit={onSubmitForm}>
        <input ref={inputRef} onChange={onChangeInput} value={value} />
        <button>입력!</button>
      </form>
      <div id="result">{result}</div>
    </>
  );
};

module.exports = GuGuDan;
