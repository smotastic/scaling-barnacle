var path = require('path');

module.exports = {
    devServer: {
        // port: 8080
    },
    configureWebpack: {
        resolve: {
            alias: {
                Facade: path.resolve(__dirname, `src/facade/${process.env.VUE_APP_DATABASE}`),                
            }
        }
    }

}