module.exports = {
  chainWebpack: config => {
    config.plugin("html").tap(args => {
      args[0].title = "SAV - Home";
      return args;
    });
  },
  configureWebpack: {
    externals: {
      jquery: "jQuery"
    }
  },
  pwa: {
    name: "Sellany Vehicle",
    themeColor: "#5f1fad",
    assetsVersion: "3",
    manifestOptions: {},
    workboxOptions: {
      skipWaiting: true
    }
  }
};
