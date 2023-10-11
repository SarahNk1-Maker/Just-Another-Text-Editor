const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js',
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      // HtmlWebpackPlugin to generate HTML files
      new HtmlWebpackPlugin({
        template: './index.html',
        filename: 'index.html',
        chunks: ['main'],
      }),
      
      // WebpackPwaManifest for generating manifest.json
      new WebpackPwaManifest({
        name: 'text editor',
        short_name: 'JATE',
        description: 'Text Editor',
        background_color: '#ffffff',
        theme_color: '#007BFF',
        start_url: '/index.html',

        icons: [
          {
            src: path.resolve('src/images/icon.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('icons'),
          },
        ],
      }),

      // InjectManifest for generating service worker
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js', // Relative path within the output.path directory
      }),      
    ],

    module: {
      rules: [
        // Add your CSS loaders and Babel configuration here
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },
  };
};
