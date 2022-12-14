// const svgrPlugin = require("vite-plugin-svgr");
module.exports = {
  "stories": ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  "addons": ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-interactions"],
  "framework": {
    name: "@storybook/react-vite",
    options: {}
  },
  "core": {},
  "features": {
    "storyStoreV7": true
  },
  async viteFinal(config, {
    configType
  }) {
    config.plugins = [...config.plugins], config.assetsInclude = ["**/*.svg"];
    return config;
  }
};