
var path = require('path');

module.exports = {
  
  entry: {
		bundle: './test/index.js',
	}, 

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'test')
  },

}