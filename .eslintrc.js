module.exports = {
    root: true,
    // This tells ESLint to load the config from the package `eslint-config-bigstair`
    extends: ['open-vp'],
    settings: {
      next: {
        rootDir: ['apps/*/'],
      },
    },
  };
  