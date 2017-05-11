const BabiliPlugin = require('babili-webpack-plugin');

module.exports = {
   entry: './js/main.js',
   devtool: 'inline-source-map',
   output: {
      filename: './build/js/bundle.min.js'
   },
   plugins: [
       new BabiliPlugin()
   ],
   module: {
       rules: [{
           test: /\.scss$/,
           use: [
                {loader: 'style-loader'},
                {loader: 'css-loader'},
                {loader: 'sass-loader'}
                ]
            },
            {
            test: /\.(eot|svg|ttf|woff|woff2)$/,
            use: [
                { 
                loader: 'file-loader',
                options: {
                    name: './fonts/[name].[ext]'
                }
            }
            ]
            }
       ]
    }
};
