const path = require("path");
const webpack = require("webpack");

module.exports = {
  mode: "development", // 배포시 production
  devtool: "eval", // 배포시 hidden-source-map
  resolve: {
    extensions: [".js", ".jsx"],
  },

  entry: {
    app: "./client",
  },
  module: {
    //entry에 들어있는 파일에 적용하는것이 모듈임!! 우리는 바벨을 설치하고 client.jsx에 적용하는것임!
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        options: {
          presets: [
            [
              "@babel/preset-env",
              {
                targets: {
                  browsers: ["> 5% in KR", "last 2 chrome versions"],
                },
                debug: true,
              },
            ],
            "@babel/preset-react",
          ],
          //plugin들의 모음이 preset이다.
          //presets도 개별적으로 설정이 가능하다!! 프리셋을 배열로만들고, 배열의 두번째에 객체로 설정가능
          //위의 예시처럼 브라우저 지원을 지난 2개의 크롬 버전으로 제한하는 설정도 할 수 있음!
          plugins: [],
        },
      },
    ],
  },
  plugins: [new webpack.LoaderOptionsPlugin({ debug: true })],
  //module > rules > options > plugins과는 다르게 추가적으로 확장하는것임!
  output: {
    filename: "app.js",
    path: path.join(__dirname, "dist"),
  },
};
// webpack.config.js는 위의 순서대로 작성하는게 제일 깔끔하니 익숙해질때까지는 위의 순서대로 작성하는게 좋음!!
