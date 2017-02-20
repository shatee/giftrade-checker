module.exports = {
  entry: {
    index: __dirname + '/source/js/index.js'
  },
  output: {
    path: __dirname + '/web/resource/js/app',
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: 'node_modules',
        loader: 'babel-loader',
        query:{
          presets: ['es2015', 'stage-1']
        }
      }
    ]
  }
};
