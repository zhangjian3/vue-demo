var path = require("path");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require("webpack");
var cleanwebpackplugin = require("clean-webpack-plugin");
module.exports = {
  entry: './src/main.js',
  output: {
    path: path.join(__dirname, "dist"),//bundle.js存放在dist目录下
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/, //第三方的不管
        loader: "babel-loader"
      },
      {
        test: /vue-preview.src.*?js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.vue$/, loader: 'vue-loader'
      },
      {
        test: /\.css$/, loader: 'style-loader!css-loader'
      },
      {
        test: /\.ttf$/, loader: 'url-loader?limt=4000&name=fonts/[name]-[hash:5].[ext]'
      },
      {
        /*limit：
                表示的是一个阀值,如果当前我们资源中的图片大小
                4kb就从bundle.js中剥离出来，如果小于4kb打包进bundle.js

                name:打包出来的图片，放在那个文件夹下，用什么文件名称命名
                [name]代表你原始的文件名称
                [hash:5] 让浏览器支持图片的缓存
                [ext] 图片本身的拓展名
            */
        test: /\.(png|svg|gif)$/, loader: 'url-loader?limt=4000&name=images/[name]-[hash:5].[ext]'
      }
    ]
  },
  plugins: [
    //打包前，先将上一次目录下的dist文件全部删除，建议放在插件最前
    new cleanwebpackplugin("dist"),
    //压缩html
    new HtmlWebpackPlugin({
      filename: 'index.html', //内存中生成的文件名称
      template: './template.html', //模板文件
      minify: {
        collapseInlineTagWhitespace: true, //空格
        minifyCSS: true,  //css
        minifyJS: true,   //js
        removeComments: true   //注释
      }
    }),
    //压缩bundle.js代码 
    new webpack.DefinePlugin({   //把项目设置成生产环境
      'process.env': {
        NODE_ENV: '"production"' //加载xxx.min.js
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false   //删除警告
      },
      comments: false //去掉版权信息等注释
    })
  ]
}