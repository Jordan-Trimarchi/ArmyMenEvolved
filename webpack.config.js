const path = require('path');
 
module.exports = {
 // set mode to dev to set process.env.NODE_ENV on DefinePlugin to value development
 mode: 'development',
 // entry point for this application will be in client dir w/in index.js
 entry: path.resolve(__dirname, 'client', 'index.js'),
 output: {
   // output will be stored in dist dir
   path: path.resolve(__dirname, 'dist'),
   // naming bundled file
   filename: 'bundle.js'
 },
 module: {
   rules: [
     {
       // match & resolve js & jsx files w/ their corresponding loader
       test: /\.(js|jsx)$/,
       // ignore transpiling node_modules
       exclude: /node_modules/,
       // use the babel loader for transpiling code
       use: {
         loader: 'babel-loader'
       }
     },
     {
       // pure CSS (i.e. w/o CSS modules)
       test: /\.css$/i,
       exclude: /\.module\.css$/i,
       use: ['style-loader', 'css-loader'],
     },
   ]
 },
};
