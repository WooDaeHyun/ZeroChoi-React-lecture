# ZeroChoi-React-lecture

1.React에서는 반드시 JS를 {}로 감싸주어야 함! ex {{a: 1}}
2.return 문에는 반드시 태그가 하나만 들어갈 수 있다. 형제 태그로 return 안되므로 반드시 <div></div>이런걸로 감싸주어야 함! 3.싱글태그는 반드시 닫는 태그를 넣어주어야함 ex) <iuput /> <<<반드시 이렇게 닫아줘야함!>>>
4.react는 데이터를 중심으로 생각해야 한다.
5.react는 return문에 화면에 그려야하는 것들을 적는다. 6.객체를 함부로 바꾸지 마라!!, 복사해라!!(불변성) 7.함수 컴포넌트도 결국 return 문으로 반환되는것이 화면에 그려지는 것임

<head>
<script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
<script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
</head>
<body> // 제일 하단에
<script type="text/babel">ReactDOM.render(<LikeButton />, document.querySelector('#root'))</script>; // React 17 버전
<script type="text/babel">ReactDOM.createRoot(document.querySelector('#root')).render(<LikeButton />)</script>; // React 18 버전
</body>

1. Fragment와 기타 팁들
   1.1 React.Fragment // render()의 return문에 여러 태그들을 묶어 반환해야 하는데 필요없는 <div>로 감싸주는것을 방지하기 위해
   사용한다.

2.focus 만들기
ref활용하기 >>> ref={(c) => {this.input = c}} 일단은 그냥 외우면 됨!
