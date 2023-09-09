import { Addon_DecoratorFunction } from '@storybook/types';

declare const decorators: Addon_DecoratorFunction[];
declare const globals: {
    measureEnabled: boolean;
};

export { decorators, globals };
