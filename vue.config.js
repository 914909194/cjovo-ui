
const webpack = require("webpack");
const path = require("path");

const packageName = require("./package.json").name;
const isDebug = process.env.NODE_ENV !== "production";
const port = 8888;

const publicPath = isDebug ? `http://localhost:${port}` : "";
const assetsDir = `service-manage-app`; //静态资源存放逻辑，便于基架的微应用入口不是http链接，而是包名代理到微应用服务
function resolve(dir) {
  return path.join(__dirname, dir);
}

// const proxyUrl="http://localhost:8000"
const proxyUrl="http://192.168.80.161:30882"
// const proxyUrl="http://192.168.40.72:8080"



module.exports = {
  /*antd 主题定制*/
  css: {
    loaderOptions: {
      sass: {
        // 注意用lessOptions包裹，不然识别不了，被坑了一手
        sassOptions: {
          modifyVars: {
            /* less 变量覆盖，用于自定义 ant design 主题 */
            "primary-color": "#007FFF",
            "link-color": "#007FFF",
            // "primary-color": "#673AB7",
            // "link-color": "#673AB7",
            "border-radius-base": "4px",
          },
          javascriptEnabled: true,
        },
      },
    },
  },
  lintOnSave: process.env.NODE_ENV !== "production",
  publicPath:"./",
  assetsDir,
  outputDir: "dist",
  filenameHashing: true,
  productionSourceMap: false,
  runtimeCompiler: false,
  devServer: {
    port,
    disableHostCheck: false,
    hot: true,
    overlay: {
      warnings: false,
      errors: true,
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    proxy: {
      "/maintenance-manager": {
        target: proxyUrl,
      },
    },
  },
  chainWebpack: (config) => {
    const fontRule = config.module.rule("fonts");
    fontRule.uses.clear();
    fontRule
      .use("url-loader")
      .loader("url-loader")
      .options({
        limit: 4096, // 小于4kb将会被打包成 base64
        fallback: {
          loader: "file-loader",
          options: {
            name: `${assetsDir}/fonts/[name].[hash:8].[ext]`,
            publicPath,
            esModule: false,
          },
        },
      })
      .end();
    const svgRule = config.module.rule("svg");
    svgRule.uses.clear();
    svgRule
      .use("url-loader")
      .loader("url-loader")
      .options({
        limit: 4096, // 小于4kb将会被打包成 base64
        fallback: {
          loader: "file-loader",
          options: {
            name: `${assetsDir}/fonts/[name].[hash:8].[ext]`,
            publicPath,
            esModule: false,
          },
        },
      })
      .end();
    const imgRule = config.module.rule("images");
    imgRule.uses.clear();
    imgRule
      .use("url-loader")
      .loader("url-loader")
      .options({
        limit: 4096, // 小于4kb将会被打包成 base64
        fallback: {
          loader: "file-loader",
          options: {
            name: `${assetsDir}/images/[name].[hash:8].[ext]`,
            publicPath,
            esModule: false,
          },
        },
      })
      .end();
 
    // 除非在IDE中配置对应的配置文件，否则虽然路径有效，但在coding时IDE会识别不了，不方便文件间的跳转操作。
    // 所以用 '@/'的形式就已经很方便了，下面的可以不用
    config.resolve.alias
      .set("@", resolve("src"))
      .set("@utils", resolve("src/utils"))
      .set("@apis", resolve("src/api"))
      .set("@assets", resolve("src/assets"))
      .set("@comp", resolve("src/components"))
      .set("@views", resolve("src/views"))
      .set("@layouts", resolve("src/layouts"))
      .set("@services", resolve("src/services"));
  },

  configureWebpack: {
    devtool: isDebug ? 'eval-source-map' : false,
    name: packageName,
    // webpack plugins
    plugins: [
      // Ignore all locale files of moment.js
      // 去掉本地化文件减少moment打包体积
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new webpack.DefinePlugin({
        __WHAYER_package_name__: JSON.stringify(packageName),
      }),
    ],
    output: {
      // 微应用的包名，这里与主应用中注册的微应用名称一致
      library: `${packageName}-[name]`,
      // 将你的 library 暴露为所有的模块定义下都可运行的方式
      libraryTarget: "umd",
      // 按需加载相关，设置为 webpackJsonp_project 即可
      jsonpFunction: `webpackJsonp_${packageName}`,
    },
  },
};
