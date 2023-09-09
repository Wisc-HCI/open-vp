// this file is only actually used in development
// for prod/dist bundles we are bundling Emotion into our package
/* eslint-disable @typescript-eslint/no-empty-interface */

import '@emotion/react';

declare module '@emotion/react' {
  type StorybookTheme = import('./types').StorybookTheme;
  export interface Theme extends StorybookTheme {}
}
