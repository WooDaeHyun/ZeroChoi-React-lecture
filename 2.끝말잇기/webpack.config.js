// webpack 설정
// webpack은 webpack.config.js로 모든게 돌아간다.
// 쪼개져 있는 jsx파일들을 하나로 묶어줌!
const path = require("path");
const RefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
//Node에서 경로를 쉽게 조작하도록 제공함!!

module.exports = {
  name: "wordrelay-setting", // webpack 설정의 이름! 무엇을 웹팩으로 설정하는지
  mode: "development", //지금은 개발용 실서비스에서는 production으로 바꾸면 됨
  devtool: "eval", // 빠르게 하는 용도 실제 실서비스에서는 hidden-source-map으로 만들어야함
  resolve: {
    extensions: [".js", ".jsx"],
  },

  entry: {
    app: ["./client"],
    //참고로 client.jsx에서 이미 WordRelay를 require해서 불러온 상태이므로,
    //따로 입력하지 않아도 알아서 webpack에서 알아서 client.jsx불러오면 WordRelay를 불러옴
    //확장자도 따로 작성하지 않아도 괜찮다. resolve옵션을 설정해 두면 알아서 파일을 찾는다.
  }, // 입력(웹팩 설정에서 가장 중요함)

  module: {
    rules: [
      {
        test: /\.jsx?/, //js파일과 jsx파일에 규칙을 적용하겠다.(정규표현식) 어떤룰? 바로 아래에 규칙이 들어감
        loader: "babel-loader",
        options: {
          //바벨의 옵션들
          presets: ["@babel/preset-env", "@babel/preset-react"],
          plugins: [
            "@babel/plugin-proposal-class-properties",
            "react-refresh/babel",
          ],
        },
      },
    ],
  },
  //rules는 여러개의 규칙을 정할 수 있기 때문에 배열이다.
  plugins: [new RefreshWebpackPlugin()],
  output: {
    path: path.join(__dirname, "dist"), // __dirname은 현재 폴더 경로를 의미함, 2번째 인수로 받은 "dist"는 현재 폴더내에 있는 dist를 의미함
    filename: "app.js", // 원하는 출력 결과
    publicPath: "/dist",
  }, // 출력(웹팩 설정에서 가장 중요함)
  //프론트 개발 편의를 위해 임시로 만든 서버
  devServer: {
    devMiddleware: { publicPath: "/dist" },
    static: { directory: path.resolve(__dirname) },
    //resolve의 __dirname은 현재 폴더를 기준으로 index.html을 찾음
    //만약 src폴더에 들어 있다면 두 번째 인자로 'src'를 적어주어야함
    //path.resolve(__dirname, 'src') 이렇게
    hot: true,
  },
};
//지금 해당 폴더와 파일들을 기준으로 설명해 보면 index.html에서는
//./dist/app.js를 src로 사용한다.
//그래서 client.jsx와 WordRelay.jsx를 묶어서 dist폴더 내에 있는 app.js로 만들어주어야 한다.
