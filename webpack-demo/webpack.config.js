const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const {ErrorOverlayPlugin} = require('./src/errorOverlayPlugin.js')
const {EndWebpackPlugin} = require('./src/endWebpackPlugin.js')

module.exports = {
  mode: 'development',
  entry: {
    app: './src/index.js'
  },
  output: {
    publicPath: __dirname + '/dist/', // js 引用的路径或者 CDN 地址
    path: path.resolve(__dirname, 'dist'), // 打包文件的输出目录
    filename: '123-[chunkhash].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          'plugins': [
            'dynamic-import-webpack',
          ]
        }
      }
    ]
  },
  plugins: [
    new ErrorOverlayPlugin(),
    new CleanWebpackPlugin(),
    new EndWebpackPlugin((stats) => {
      console.log('结束啦', stats)
    }, stats => {
      console.log('结束啦,不过失败了', stats)
    }),
  ]
}