module.exports = {
	mode: 'development',
  entry: {
    index: __dirname + '/source/js/index.js'
  },
  output: {
    path: __dirname + '/web/resource/js/app',
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
				use: [
				  {
            loader: 'babel-loader',
            options: {
              presets: ['es2015']
            }
				  }
				]
      }
    ]
  }
};
