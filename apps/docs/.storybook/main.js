import { dirname, join, resolve } from "path";

function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, "package.json")));
}

const config = {
  stories: [
    "../stories/Introduction.mdx",
    "../stories/Installation.mdx",
    "../stories/Usage.mdx",
    "../stories/Types.mdx",
    "../stories/ProgramSpec.mdx",
    "../stories/TypeSpec.mdx",
    "../stories/ProgramData.mdx",
    "../stories/**/*.stories.tsx",
    "../stories/**/*.stories.tsx"
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-docs",
    "@storybook/addon-themes",
  ],
  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
    options: {},
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
            find: "@people_and_robots/open-vp",
            replacement: resolve(__dirname, "../../../packages/open-vp/"),
          },
          {
            find: "@people_and_robots/open-blocks",
            replacement: resolve(__dirname, "../../../packages/open-blocks/"),
          },
          {
            find: "@people_and_robots/open-gui",
            replacement: resolve(__dirname, "../../../packages/open-gui/"),
          },
          {
            find: "@people_and_robots/open-core",
            replacement: resolve(__dirname, "../../../packages/open-core/"),
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
