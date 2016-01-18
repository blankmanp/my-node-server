module.exports = {
    entry: ['./app/entry.js', './app/test.js'],
    output: {
        path: './assets/',
        publicPath: '/assets/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            { test: /\.jsx?$/, loader: 'babel-loader', query: { compact: false } }
        ]
    }
};
