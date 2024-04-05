const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle_kpi.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
     https: {
      key: './localhost+1-key.pem',
      cert: './localhost+1.pem',
    },
    index: 'index.html',
    hot: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Target JavaScript files
      exclude: /node_modules\/(?!(@react-spring)\/).*/, // Exclude most of node_modules, but INCLUDE @react-spring
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react']
        }
      }
      },
      {
        test: /\.css$/i,
        use: [
          'style-loader'
        ]
      }
    ]
  }
};

