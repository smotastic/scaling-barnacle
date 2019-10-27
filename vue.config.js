var path = require('path');

module.exports = {
    devServer: {
        // port: 8080
    },
    configureWebpack: {
        resolve: {
            alias: {
                Facade: path.resolve(__dirname, `src/facade/impl/${process.env.VUE_APP_DATABASE}`),                
            }
        }
    }

}