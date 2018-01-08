const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: './src/index.js'
    },
    module: {
        rules: [{
                test: /\.vue$/,
                exclude: [/node_modules/],
                use: {
                    loader: 'vue-loader'
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.ico$/,
                exclude: [/node_modules/],
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]'
                    }
                }
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            }
        ]
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new webpack.DefinePlugin({
            GITHUB_API_URL: JSON.stringify('https://api.github.com/repos/laincloud/dockerfiles/git/trees/master?recursive=1'),
            DOCKERFILES_URL: JSON.stringify('https://raw.githubusercontent.com/laincloud/dockerfiles/master/'),
            REPOS_KEY: JSON.stringify('repositories'),
            LIBRARY_PREFIX: JSON.stringify('library'),
            REGISTRY_N: JSON.stringify(100),
            REGISTRY_SCHEME: JSON.stringify('http'),
            REGISTRY_HOST: JSON.stringify('registry.yxapp.xyz')
        }),
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            title: 'Registory Web'
        })
    ]
};
