module.exports = {
  entry: {
    index: __dirname + '/source/js/index.js'
  },
  output: {
    path: __dirname + '/web/js/app',
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: 'node_modules',
        loader: 'babel-loader',
        query:{
          presets: ['es2015']
        }
      }
    ]
  }
};
