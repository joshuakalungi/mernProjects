{/* BUNDLE AND HOT RELOADING DURING DEVELOPMENT 

we will setup a compile method that takes the Express app and configures it to use the Webpack middleware to compile, bundle and serve code*/}

import webpack from 'webpack'
import webpackMiddleware from 'webpack-dev-middleware'
import WebpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig from './../webpack.config.client.js'

const compile = (app) => {
    if (process.env.NODE_ENV == "development") {
        const compiler = webpack(webpackConfig)
        const middleware = webpackMiddleware(compiler, {
            publicPath: webpackConfig.output.publicPath
        })
        app.use(middleware)
        app.use(WebpackHotMiddleware(compiler))
    }
}

export default {
    compile
}

{/* Now we will import the compile method in server/server.js and call it before we setup the Express app to listen on the port. */}