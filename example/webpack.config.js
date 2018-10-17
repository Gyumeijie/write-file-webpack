const path = require('path');
const WriteToFilePlugin = require('../index');

module.exports = {
   entry: path.resolve(__dirname, 'dummyInput.js'),
   output: {
      filename: 'dummyOutput.js',
      path: path.resolve(__dirname)
   },
   plugins: [
      new WriteToFilePlugin({ 
         filename: path.resolve(__dirname, 'dist/subdir/test.js'), 
         data: function () {
            return "console.log('hello webpack')"
         }
      })
      // new WriteToFilePlugin({ 
      //    filename: './dist/build/test.js', 
      //    data: "console.log('hello webpack')"
      // })
   ]
}