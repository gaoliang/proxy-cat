const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = () => {
    return {
        webpack: {
            configure: (webpackConfig, { env }) => {
                if (env !== 'development') {
                    const htmlWebpackPluginInstance = webpackConfig.plugins.find(
                        webpackPlugin => webpackPlugin instanceof HtmlWebpackPlugin
                    );
                    if (htmlWebpackPluginInstance) {
                        htmlWebpackPluginInstance.userOptions.inject = 'body';
                        htmlWebpackPluginInstance.userOptions.scriptLoading = 'blocking';
                        htmlWebpackPluginInstance.userOptions.chunks = ['main'];
                    }
                }
                webpackConfig.entry = {
                    main: webpackConfig.entry,
                    background: './src/background.js'
                }
                webpackConfig.output = {
                    ...webpackConfig.output,
                    filename: 'static/js/[name].js',
                }
                console.log(webpackConfig)
                return webpackConfig;
            },
        },
    };
};