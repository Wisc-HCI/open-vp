import { P as PresetProperty, S as StorybookConfig } from './types-c490be17.js';
import 'file-system-cache';
import '@babel/core';
import 'http';
import '@storybook/builder-vite';
import '@joshwooding/vite-plugin-react-docgen-typescript';

declare const core: PresetProperty<'core', StorybookConfig>;
declare const viteFinal: StorybookConfig['viteFinal'];

export { core, viteFinal };
