const { defineConfig } = require("@vue/cli-service");
// import { defineConfig } from "@vue/cli-service";
module.exports = defineConfig({
  // transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    proxy: {
      ["/api"]: {
        target: "http://8.130.18.26:4000", //代理的接口地址
        changeOrigin: true, //允许跨域
        secure: false,
        // 将代理前缀名称替换为后端的真实前缀名称
        pathRewrite: {
          ["^/api"]: ``,
        },
      },
    },
  },
});
