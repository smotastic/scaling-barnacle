var path = require('path');

module.exports = {
    devServer: {
        // port: 8080
    },
    configureWebpack: {
        resolve: {
            alias: {
                Service: path.resolve(__dirname, `src/service/${process.env.VUE_APP_DATABASE}`),                
            }
        }
    }

}