module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/GitHub Data/" : "/",
  devServer: {
    port: 8080,
    proxy: {
      "/api": {
        target: "https://api.github.com",
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  }
};
