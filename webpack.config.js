const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'development', // 或 'production'，根据你的需求设置
  entry: './server/app.js', // 你的 Express 应用入口文件
  target: 'node',
  externals: [nodeExternals()], // 排除 Node.js 的核心模块和 node_modules
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js']
  },
  node: {
    __dirname: false,
    __filename: false
  }
};
