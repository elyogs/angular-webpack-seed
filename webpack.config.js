'use strict';

// Modules
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

/**
 * Env
 * Get npm lifecycle event to identify the environment
 */
var ENV = process.env.npm_lifecycle_event;
var isTest = ENV === 'test' || ENV === 'test-watch';
var isProd = ENV === 'build'

module.exports = function makeWebpackConfig() {
    /**
     * Config
     * Reference: http://webpack.github.io/docs/configuration.html
     * This is the object where all configuration gets set
     */
    var config = {};
    config.mode = isProd ? 'production' : (isTest ? 'none' : 'development');

    config.optimization = {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    chunks: "all"
                }
            }
        }
    }

    /**
     * Entry
     * Reference: http://webpack.github.io/docs/configuration.html#entry
     * Should be an empty object if it's generating a test build
     * Karma will set this when it's a test build
     */
    config.entry = isTest ? void 0 : {
        app: './src/app/root.module.js'
    };

    /**
   * Output
   * Reference: http://webpack.github.io/docs/configuration.html#output
   * Should be an empty object if it's generating a test build
   * Karma will handle setting it up for you when it's a test build
   */
    config.output = isTest ? {} : {
        // Absolute output directory
        path: __dirname + '/dist',

        // Output path from the view of the page
        // Uses webpack-dev-server in development
        publicPath: isProd ? '' : 'http://localhost:5000/',

        // Filename for entry points
        // Only adds hash in build mode
        filename: isProd ? '[name].[hash].js' : '[name].bundle.js',

        // Filename for non-entry points
        // Only adds hash in build mode
        chunkFilename: isProd ? '[name].[hash].js' : '[name].bundle.js'
    }

    /**
     * Devtool
     * Reference: http://webpack.github.io/docs/configuration.html#devtool
     * Type of sourcemap to use per build type
     */
    if (isTest) {
        config.devtool = 'inline-source-map';
    } else if (isProd) {
        config.devtool = 'source-map';
    } else {
        config.devtool = 'eval-source-map';
    }

    // Loaders
    const scripts = {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
            { loader: 'ng-annotate-loader' },
            { loader: 'babel-loader' }
        ]
    }

    const styles = {
        test: /\.css$/,
        use: [
            { loader: 'style-loader' },
            { loader: 'css-loader' }
        ]
    }
    
    const markup = {
        test: /\.html$/,
        use: [
            { loader: 'ngtemplate-loader' },
            { loader: 'html-loader' }
        ]
    }

    const fonts = {
        test: /\.(eot|ttf|woff|woff2)$/,
        use: [
            {
                loader: 'file-loader',
                options: {
                    outputPath:  isProd ? 'assets':'',
                    useRelativePath: isProd,
                }
            }
        ],
      };

      const images = {
        test: /\.(png|jp(e*)g|svg)$/,
        use: [{
            loader: 'url-loader',
            options: { 
                limit: 8000, // Convert images < 8kb to base64 strings
                name: 'assets/[hash]-[name].[ext]'
            } 
        }]
      };

    config.module = {
        rules: [scripts, styles, markup, fonts, images]
    }

    /**
   * Plugins
   * Reference: http://webpack.github.io/docs/configuration.html#plugins
   * List: http://webpack.github.io/docs/list-of-plugins.html
   */
    config.plugins = [
        new CopyWebpackPlugin([
            { from: './src/public/js/vendor/*', to: 'js/vendor/', flatten: true }
          ])
    ];

    // Skip rendering index.html in test mode
    if (!isTest) {
        // Reference: https://github.com/ampedandwired/html-webpack-plugin
        // Render index.ejs
        config.plugins.push(
            new HtmlWebpackPlugin({
                template: './src/index.ejs',
                inject: 'head'
            })
        );
    }

    /**
    * Dev server configuration
    * Reference: http://webpack.github.io/docs/configuration.html#devserver
    * Reference: http://webpack.github.io/docs/webpack-dev-server.html
    */
    config.devServer = {
        contentBase: './src/public',
        stats: 'minimal',
        host: 'localhost',
        port: 5000
    };

    return config;
}();