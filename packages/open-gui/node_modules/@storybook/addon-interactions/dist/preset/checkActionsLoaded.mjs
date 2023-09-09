import '../chunk-NNAAFZ4U.mjs';
import { checkAddonOrder, serverRequire } from '@storybook/core-common';
import path from 'path';

var checkActionsLoaded=configDir=>{checkAddonOrder({before:{name:"@storybook/addon-actions",inEssentials:!0},after:{name:"@storybook/addon-interactions",inEssentials:!1},configFile:path.isAbsolute(configDir)?path.join(configDir,"main"):path.join(process.cwd(),configDir,"main"),getConfig:configFile=>serverRequire(configFile)});};

export { checkActionsLoaded };
