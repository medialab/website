const path = require('path'),
      config = require('config'),
      webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    publicPath: './build/',
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  },
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      API_URL: JSON.stringify(config.get('apiUrl')),
      STATIC_URL: JSON.stringify(config.get('staticUrl'))
    })
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: 'file-loader'
      },
      {
        test: /\.png$/,
        use: 'url-loader'
      }
    ]
  },
  devServer: {
    port: 7000,
    publicPath: '/build/'
  }
};
