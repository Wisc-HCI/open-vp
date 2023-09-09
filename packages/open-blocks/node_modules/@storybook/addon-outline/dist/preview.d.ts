import { Addon_DecoratorFunction } from '@storybook/types';

declare const decorators: Addon_DecoratorFunction[];
declare const globals: {
    outline: boolean;
};

export { decorators, globals };
