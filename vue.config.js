const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  //暂时关闭代码检测
  lintOnSave: false,
  publicPath: "/music/",
  outputDir: "dist",
  assetsDir: "static",
  // devServer: {
  //   proxy: {
  //     // 将/api开头的请求转发到目标服务器
  //     "/api": {
  //       target: "http://8.130.18.26:4000",
  //       changeOrigin: true,
  //       pathRewrite: {
  //         "^/api": "aaa", // 去除请求路径中的/api前缀
  //       },
  //     },
  //   },
  // },
});
