const path = require('path')
const glob = require('glob'); // for more html pages
const autoprefixer = require('autoprefixer');
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')

module.exports = {
  entry: {
    main: path.resolve(__dirname, 'webpack')
  },
  output: {
    filename: 'js/[name].[hash].js',
    path: path.resolve(__dirname, 'dist')
  },

  resolve: {
    alias: {
      'img': path.resolve(__dirname, 'images'),
      'fonts': path.resolve(__dirname, 'fonts'),
    }
  },

  optimization: {
    minimizer: [new OptimizeCssAssetsPlugin(), new TerserWebpackPlugin()]
  },
  plugins: [
    ...glob.sync('./pages/*.pug').map(htmlFile => {
      return new HtmlWebpackPlugin({
        inject: true,
        interpolate: true,
        filename: path.basename(htmlFile).replace(/\.pug/, '.html'),
        template: htmlFile,
      });
    }),
    ...glob.sync('./pages/*.html').map(htmlFile => {
      return new HtmlWebpackPlugin({
        inject: true,
        interpolate: true,
        filename: path.basename(htmlFile),
        template: htmlFile,
      });
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash].css',
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      { from: path.resolve(__dirname, 'images'), to: 'images' },
      { from: path.resolve(__dirname, 'static'), to: 'static' }
    ])
  ],

  module: {
    rules: [
      { 
        test: /\.js$/, 
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }]
      }, 
      { 
        test: /\.pug$/, 
        loader: 'pug-loader?pretty=true'
      },
      { 
        test: /\.css$/, 
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: true,
              reloadall: true
            }
          }, 'css-loader', 
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                autoprefixer()
              ],
            }
          } 
        ]
      },
      { 
        test: /\.s[ca]ss$/, 
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: true,
              reloadall: true
            }
          }, 'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                autoprefixer()
              ],
            }
          }, 'sass-loader' ]
      },
      { 
        test: /\.less$/, 
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: true,
              reloadall: true
            }
          }, 'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                autoprefixer()
              ],
            }
          }, 'less-loader' ]
      },
      { 
        test: /\.(woff(2)?|ttf|eot)$/,
        loader: 'file-loader', 
        options: {
          name: '[path][name].[ext]',
          publicPath: '../'
        }
      },
      { 
        test: /\.(png|jpg|jpeg|svg)$/, 
        loader: 'file-loader', 
        options: {
          name: '[path][name].[ext]',
          publicPath: '../',
        }
      }
    ]
  }
}
