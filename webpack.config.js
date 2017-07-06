const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const {resolve}=require('path');
const path= require('path');
const srcDir = resolve(__dirname,'src');
const distDir = resolve(__dirname,'dist')


module.exports={
    entry:{app:`${srcDir}/js/app.js`,
            contact:`${srcDir}/js/contact.js`,
            },
    output:{
        path: `${distDir}`,
        filename:'js/[name].bundle.js'
    },
    module:{
       rules: [
           {
        test: /\.css$/,
        use: [ 'style-loader','css-loader', 'sass-loader']
    },
       
    
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({fallback: 'style-loader', use: ['css-loader','postcss-loader', 'sass-loader']})
       
    },{ test: /\.pug$/,use:['html-loader','pug-html-loader']},
    { test: /\.html$/,use:['html-loader']},
    { test: /\.(jpeg|jpg|gif|png|svg)/,use:[
        'file-loader?name=images/[name].[ext]&Publicpath=./dist/',
        'image-webpack-loader'
    ]},

    {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
    { test: /\.js$/,exclude:/node_modules/,use:'babel-loader'},
    ]},
    plugins:[
       new HtmlWebpackPlugin({
            title: 'project demo',
            chunks:['app'],
            template: `${srcDir}/index.pug` 
  }),new HtmlWebpackPlugin({
            title: 'contact page',
            filename:'contact.html',
            chunks:['contact'],
            template: `${srcDir}/contact.pug` 
  }), new ExtractTextPlugin('[name].css'),
  
    ],devServer:{
        stats:"errors-only"
    }
}