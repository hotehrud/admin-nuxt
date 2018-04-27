const resolve = require("path").resolve;

const isVueRule = rule => {
  return rule.test.toString() === "/\\.vue$/";
};
const isSASSRule = rule => {
  return ["/\\.sass$/", "/\\.scss$/"].indexOf(rule.test.toString()) !== -1;
};
const sassResourcesLoader = {
  loader: "sass-resources-loader",
  options: {
    resources: [resolve(__dirname, "assets/scss/variables.scss")]
  }
};

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: "admin-nuxt",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "Nuxt.js project" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: "#3B8070" },
  /*
  ** Build configuration
  */
  css: [{ src: "~/assets/scss/main.scss", lang: "scss" }],
  build: {
    /*
    ** Run ESLint on save
    */
    vendor: ["axios"],
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        });
      }
      config.module.rules.forEach(rule => {
        if (isVueRule(rule)) {
          rule.options.loaders.sass.push(sassResourcesLoader);
          rule.options.loaders.scss.push(sassResourcesLoader);
        }
        if (isSASSRule(rule)) {
          rule.use.push(sassResourcesLoader);
        }
      });
    }
  }
};
