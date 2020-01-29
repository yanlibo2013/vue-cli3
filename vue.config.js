const path = require("path");
// console.log(" process.env.npm_config_host", process.env.npm_config_host);
const HOST = process.env.npm_config_host;
const PORT = process.env.npm_config_port && Number(process.env.npm_config_port);

function resolve(dir) {
  // 路径可能与你的项目不同
  return path.join(__dirname, dir)
}
module.exports = {
  // Other options...

  pluginOptions: {
    dll: {
      // 单入口
      // entry: ["vue", "vue-route"],

      // // 多入口
      entry: {
        vendorvue: ["vue"],
        vendorvueroute: ["vue-route"],
        vendorelement: ["element-ui"],
        vendorlodash: ["lodash"]
      },
      // 输出目录
      output: path.join(__dirname, "./public/dll"),

      // 是否开启 DllReferencePlugin,
      // 默认情况下，插件没有检测到 vendor (执行 `npm run dll` 指令生成的 chunk 包)，会自动关闭。
      // 在有需要的情况下可以手动关闭插件，例如：
      // 1. 为了在开发环境使用vue代码中的提示，可配置只在生产环境开启分包模式，`open : process.env.NODE_ENV === 'production'`。
      // 2. 在构建目标(`target`)为 `node`，需要手动关闭 dll 插件。
      // open: true,
      open: process.env.NODE_ENV === "production",

      // 自动注入到 index.html
      // 在执行 `dev` , `build` 等其他指令时，程序会自动将 `dll` 指令生成的 `*.dll.js` 等文件自动注入到 index.html 中。
      inject: true,
      // !! Recommended configuration
      cacheFilePath: path.resolve(__dirname, "./public")
    }
  },

  devServer: {
    proxy: {
      "/mock/": {
        target: `http://${HOST ? HOST : "localhost"}:${PORT ? PORT : "7000"}`,
        changeOrigin: false,
        pathRewrite: {
          "^/mock": ""
        }
      },
      "/api/": {
        target: `http://${HOST ? HOST : "localhost"}:${PORT ? PORT : "7000"}`,
        changeOrigin: false,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  },
  runtimeCompiler: true,



  chainWebpack: config => {
    //config.module.rules.delete("svg"); //重点:删除默认配置中处理svg,
    //const svgRule = config.module.rule('svg')
    //svgRule.uses.clear()

    // 使用 alias 简化路径
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@lib', resolve('src/lib'))
      .set('@components', resolve('src/components'))
      .set('@img', resolve('src/images'))
      .set('@api', resolve('src/api'))
    // 图片下的 url-loader 值，将其 limit 限制改为 5M
    // config.module
    //   .rule('images')
    //   .use('url-loader')
    //   .tap(options =>
    //     merge(options, {
    //       limit: 5120
    //     })
    //   )
  }
};
