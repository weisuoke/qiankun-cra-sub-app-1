const { name } = require('./package.json')

module.exports = {
  webpack: config => {
    config.output.library = `${name}-[name]`;
    config.output.libraryTarget = 'umd';
    config.output.chunkLoadingGlobal = `webpackJsonp_${name}`;
    config.output.globalObject = 'window';

    return config;
  },
  devServer: (configFunction) => {
    return (proxy, allowedHost) => {
      const config = configFunction(proxy, allowedHost);
      config.historyApiFallback = true;
      config.open = false;
      config.hot = false;
      config.liveReload = false;
      config.headers = {
        'Access-Control-Allow-Origin': '*',
      };
      return config;
    }
  }
}