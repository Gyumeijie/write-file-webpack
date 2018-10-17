# Write to file plugin for webpack(v3)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

This is a simple webpack plugin for writing data to file. And there is a similar [plugin](https://github.com/Gyumeijie/write-to-file-webpack) for webpack v4.

# Features
1. support creating directory recursively
2. support data of function type, which allows processing data in complex situation
3. support native options of underlying writeFileSync
4. support protection of an exsited file

# Installation
`npm install --save-dev write-file-webpack`

# Usage
The data to be written can be either a simple javascript variable, or a function which returns some data. 

```javascript
const WriteToFilePlugin = require('write-file-webpack');

module.exports = {
  ...
  plugins: [
     new WriteToFilePlugin({ 
        filename: 'path/to/write/file', 
        data: 'console.log("write to file")'
      })
  ]
  ...
}
```

```javascript
const WriteToFilePlugin = require('write-file-webpack');

module.exports = {
   ...
   plugins: [
      new WriteToFilePlugin({ 
         filename: 'path/to/write/file', 
         data: function () {
            return "console.log('write to file')"
         }
     })
   ]
   ...
}
```

If the `data` is provided as a `function`, we can do more operations than just simply returning the data to be written. For example, if we wanna write to a file parts of an exsited file say `package.json`, and more specifically, removing the `dependencies` and `devDependencies` items, with `write-file-webpack` we can do this:

```javascript
const WriteToFilePlugin = require('write-file-webpack');
const config = require('./package.json');

module.exports = {
   ...
   plugins: [
      new WriteToFilePlugin({ 
         filename: 'path/to/write/package.json', 
         data: function () {
            return JSON.stringify({
               ...config,
               dependencies: undefined,
               devDependencies: undefined,
           });
         }
     })
   ]
   ...
}
```
Of course, if we want to copy the whole content of a existed file, there is webpack plugin called `copy-webpack-plugin`.

# Support
`node >= 6` and `webpack v3`

# Options
- filename (**required**)
- data (**required**)
- override          
`<boolean> Default: true`, if set to false, no data will be written to an exsited file 
- encoding     
`<string> | <null> Default: 'utf8'`
- mode       
`<integer> Default: 0o666`
- flag        
`<string> Default: 'w'`

For more information about `encoding`, `mode`, and `flag` please refer to [node writeFile](https://nodejs.org/docs/latest-v9.x/api/fs.html#fs_fs_writefilesync_file_data_options).
