import { dirname, join, resolve } from "path";

function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, "package.json")));
}

const config = {
  stories: ["../stories/**/*.stories.tsx"],//["../stories/**/*.stories.tsx", "../stories/*.mdx"],
  addons: [
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-essentials"),
    getAbsolutePath("@storybook/addon-docs"),
    getAbsolutePath("@storybook/addon-themes"),
  ],
  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
    options: {},
  },
  typescript: {
    check: true,
    checkOptions: {
      eslint: true,
    },
  },
  core: {},

  async viteFinal(config, { configType }) {
    // customize the Vite config here
    return {
      ...config,
      define: { "process.env": {} },
      resolve: {
        alias: [
          {
            find: "@people_and_robots/open-core",
            replacement: resolve(__dirname, "../../../packages/open-core/"),
          },
          {
            find: "@people_and_robots/open-gui",
            replacement: resolve(__dirname, "../../../packages/open-gui/"),
          },
          {
            find: "@people_and_robots/open-blocks",
            replacement: resolve(__dirname, "../../../packages/open-blocks/"),
          },
          {
            find: "@people_and_robots/open-vp",
            replacement: resolve(__dirname, "../../../packages/open-vp/"),
          },
        ],
      },
    };
  },

  docs: {
    autodocs: true,
  },
};

export default config;
