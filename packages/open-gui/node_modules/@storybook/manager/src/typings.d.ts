/* eslint-disable no-underscore-dangle,  @typescript-eslint/naming-convention */
declare module 'chromatic/isChromatic';

declare var DOCS_OPTIONS: any;
declare var CONFIG_TYPE: any;
declare var PREVIEW_URL: any;

declare var __STORYBOOK_ADDONS_MANAGER: any;
declare var RELEASE_NOTES_DATA: any;

declare var FEATURES:
  | {
      storyStoreV7?: boolean;
      argTypeTargetsV7?: boolean;
    }
  | undefined;

declare var REFS: any;
declare var VERSIONCHECK: any;
declare var LOGLEVEL: 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'silent' | undefined;
