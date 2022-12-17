## ZeroChoi-React-lecture

## 강의를 통해 구현한 기본 기능 외에 각 게임에 필요할 만한 기능을 개별적으로 추가함

1. 끝말잇기게임 - 입력된 단어가 중복된 단어인지 체크하는 기능을 추가
2. 끝말잇기게임 - 입력된 단어 순서에 맞게 history를 보여주는 기능을 추가
3. 숫자야구 - 정답을 맞춘 경우 홈런과 재시작의 순서가 문제가 있어 다시 수정(홈런인 경우, 홈런 문구보다 재시작이 먼저되는 현상 발생)setTimeout 함수를 통해 비동기처리로 변경하여 렌더링 순서를 원하는대로 정답을 맞춘 경우, 홈런 메세지가 나오고 그 다음 게임이 새롭게 시작되도록 변경
4. 숫자야구 - 정답을 맞추거나 맞춘 횟수가 10회를 넘어가는 경우 새롭게 게임은 시작되지만 '⚾️숫자야구'로 타이틀이 변경되지 않아, 처음 게임 이후 다음 게임으로 넘어가는 경우 타이틀을 '⚾️숫자야구'로 변경되도록 수정
5. 숫자야구 - input창에 숫자만 입력할 수 있도록 변경
6. 반응속도체크 - 강의에서는 반응속도체크를 여러번하면 시도한 반응속도체크의 평균속도만 나오도록 구현해 놓았는데 시도 할 때마다 각각의 시도별로 반응속도를 볼 수 있도록 기능 추가

## 강의 내용 중 필요한 내용 정리

'핵심은 상태가 변화하면 새롭게 그린다!!'가 가장 중요함!!

1. React에서는 반드시 JS를 {}로 감싸주어야 함! ex { { a: 1 } }
2. return 문에는 반드시 태그가 하나만 들어갈 수 있다. 형제 태그로 return 안되므로 반드시 <div></div>이런걸로 감싸주어야 함! 3.싱글태그는 반드시 닫는 태그를 넣어주어야함 ex) <iuput /> <<<반드시 이렇게 닫아줘야함!>>>
3. react는 데이터를 중심으로 생각해야 한다.(데이터가 변화하는것은 state다)
4. react는 컴포넌트의 return문에 화면에 그려야하는 것들을 적는다. 6.객체를 함부로 바꾸지 마라!!, 복사해라!!(불변성) 7.함수 컴포넌트도 결국 return 문으로 반환되는것이 화면에 그려지는 것임

<head>
<script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
<script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
</head>
<body> // 제일 하단에
<script type="text/babel">ReactDOM.render(<LikeButton />, document.querySelector('#root'))</script>; // React 17 버전
<script type="text/babel">ReactDOM.createRoot(document.querySelector('#root')).render(<LikeButton />)</script>; // React 18 버전
</body>

6. Fragment와 기타 팁들
   6.1 React.Fragment // render()의 return문에 여러 태그들을 묶어 반환해야 하는데 필요없는 <div>로 감싸주는것을 방지하기 위해
   사용한다.

7. focus 만들기
   ref활용하기 >>> ref={(c) => {this.input = c} 일단은 그냥 외우면 됨!

8. webpack을 사용하는 이유는??
   실무에서는 하나의 컴포넌트로 만드는 경우가 없음!!
   만약 컴포넌트별로 스크립트로 만든다고 생각해보자!! 그럼 HTML내의 줄이 엄청나게 길어짐
   심지어 페이스북은 컴포넌트가 2만개임!!  
   그래서 만들어진것이 webpack임
   여러개의 자바스크립트 파일을 하나로 합쳐 하나의 자바스크립트 파일로 만들어주는 기술임!!
   대신 webpack을 사용하려면 node를 알아야함!
   노드는 한 마디로 자바스크립트 실행기 그 이상도 이하도 아니다!

## 중요!!!

9. 리액트, webpack 기본 설정 방법
   9.1 터미널에 적용해야할 폴더로 이동해서 npm init 명령어 입력
   9.2 author나 license에 MIT/ISC 입력하고 yes 입력하고 enter
   그러면 package.json이 생성됨(여기에 리액트 개발에 필요한 모든 패키지를 넣어주면 된다.)
   9.3 제일 먼저 필요한것은 react와 reactDom이 필요함
   9.4 npm i react react-dom 명령어를 터미널에 입력(리액트랑 리액트 돔을 설치하겠다는 의미이다.)
   9.5 이제 웹팩과 웹팩cli를 설치해 준다
   9.5 npm i -D webpack webpack-cli
   9.6 그리고 지금 npm init을 시작한 폴더에 webpack.config.js파일을 추가해 준다.
   9.6.1 그리고 내용으로 module.export = {} 를 입력한다.
   9.7 그리고 client.jsx 파일을 또 추가해 준다.
   9.7.1 그리고 내용으로 const React = require("react");
   const ReactDom = require("react-dom"); 를 입력해 준다. 리액트와 리액트 돔을 불러오는 것이다.
   9.8 그리고 마지막으로 index.html의 body 하단의 <script>에 <script src="./dist/app.js"></script>로 소스를 설정해 준다.

   cf) CreateReactApp은 위의 내용들을 자동화 해주는 것임!! 그치만 위의 내용을 알고 있어야 CreateReactApp을 사용하더라도 이해할 수 있음!!

10. webpack 실행 방법
    webpack.config.js를 다 작성한 후에 터미널에 webpack 명령어를 입력하면 webpack이 만들어진다. 다만 webpack은 등록되지 않은 명력어 이기 때문에 등록을 해주어야 하는데 크게 3가지 방법이 있다.
    10.1.1 package.json의 scripts에 아래의 예처럼 넣어준다.
    <!-- "scripts": {
                "dev": "webpack"
             }, -->
    10.1.2 그리고 터미널 명령어에 npm run dev를 입력한다.
    10.2 npx webpack (마법의 단어)

개념정의
webpack은 번들러다.
번들러란? '번들러는 의존성이 있는 모듈 코드를 하나(또는 여러 개)의 파일로 만들어주는 도구이다.'

11. webpack에서도 jsx는 자바스크립트 문법이 아니기 때문에 babel을 가져와 script type = text/babel을 추가로 세팅해줘야함
    중요한것은 babel한다고 jsx를 바로 사용할 수 있는것이 아니라 바벨 안에서도 jsx 설정을 또 해주어야 함!!
    우선 바벨을 설치해 보자!!

11.1 바벨 설치하기
명령어: npm i -D @babel/core @babel/preset-env @babel/preset-react babel-loader @babel/plugin-proposal-class-properties
따로 따로 작성해도 상관없음
명령어: npm i -D @babel/core 는 바벨에 대한 기본적인 내용들이 들어있다.
명령어: npm i @babel/preset-env 유저의 브라우저에 맞게 알아서 최신 문법을 옛날 문법을 지원하는것으로 바꿔줌
명령어: npm i @babel/preset-react 이게 있어야 jsx를 지원할 수 있다.
명령어: npm i babel-loader 은 바벨이랑 웹팩을 연결해 준다.
명령어: npm i @babel/plugin-proposal-class-properties

12. 웹팩 데브 서버와 핫 리로딩
    명령어 : npm i react-refresh @pmmmwh/react-refresh-webpack-plugin -D
    개발용 서버만들기
    명령어 : npm i -D webpack-dev-server
    12.1 package.json에서 scripts를 "dev": "webpack serve --env development"로 변경해 준다.
    12.2 webpack.config.js에서 const RefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin")로 require해주고
    12.3 module키 아래에 plugins키를 만들어 다음 값을 입력한다. plugins: [new RefreshWebpackPlugin()] << 앞으로 빌드 할 때마다 이 부분이 실행된다.
    12.4 webpack.config.js에서 module의 options에서 plugins배열에 "react-refresh/babel" 를 추가해준다.
    12.5 devServer 설정하기
    12.6 webpack.config.js에서 devServer설정을 위해 output키 아래에
    devServer: {
    devMiddleware: { publicPath: "/dist" },
    static: { directory: path.resolve(\_\_dirname) },
    hot: true,
    },
    를 설정해준다.

13. 컨트롤드 인풋 vs 언컨트롤드 인풋
    input에 id를 넣고, 이벤트 발생시키면 e.target.children.id값.value에 input에 입력된 데이터를 가지고 있음!
