module.exports = {
    entry: ['./src/js/entry.js'],
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
