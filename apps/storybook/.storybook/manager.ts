import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming/create';

export const prTheme = create({
  base: 'dark',

  // Storybook-specific color palette

  // Branding
  brandUrl: 'https://wisc-hci.github.io/open-vp',
  brandTitle: 'OpenVP',
  brandImage: './logo.svg',
  brandTarget: '_self',

})

addons.setConfig({
  theme: prTheme
});

