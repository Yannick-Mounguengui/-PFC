const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const PRODUCTION = false;
const OUTPATH = PRODUCTION ? '../serveur/public' : '../serveur/public';
module.exports = {
  //entry: './src/scripts/pfc.js',
  entry: {
    'pfc' : path.resolve(__dirname, './src', 'scripts', 'pfc.js'),
    'pfcia' : path.resolve(__dirname, './src', 'scripts', 'pfcia.js')
  },
  mode : PRODUCTION ? 'production' : 'development',
  target: "node",
  externals: {
    bufferutil: "bufferutil",
    "utf-8-validate": "utf-8-validate",
  },
  output: {
    path: path.resolve(__dirname, OUTPATH),
    //filename: 'scripts/bundle.js'
    filename: 'scripts/[name]-bundle.js'
  },

  devServer: {
    static: {
       publicPath: path.resolve(__dirname, 'dist'),
       watch : true
    },
    host: 'localhost',
    port : 8080,
    open : true
} ,
module: {
    rules : [
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' }
        ]
      },
      {
        test: /\.(png|jpg|gif)/i,
      }
    ]
  },
  plugins: [  
    new HtmlWebpackPlugin({
	template: "./src/pfc.html",
	filename: "./pfc.html",
	chunks : ['pfc']
    }),
    new HtmlWebpackPlugin({
	template: "./src/pfcia.html",
	filename: "./pfcia.html",
	chunks : ['pfcia']
    }),
    new CopyPlugin({
        patterns: [
	    {
		from: 'src/*.html',
		to:   '[name][ext]',
		noErrorOnMissing: true,
		globOptions:{
		    ignore:['**/pfc*.html']
		}
	    },
	    {
		from: 'src/images/*',
		to:   'images/[name][ext]',
		noErrorOnMissing: true
	    },
	    {
		from: 'src/style/*',
		to:   'style/[name][ext]',
		noErrorOnMissing: true
	    },
        ]
    })
],
};
