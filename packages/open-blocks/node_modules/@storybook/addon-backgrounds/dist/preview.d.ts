import { Addon_DecoratorFunction } from '@storybook/types';

declare const decorators: Addon_DecoratorFunction[];
declare const parameters: {
    backgrounds: {
        grid: {
            cellSize: number;
            opacity: number;
            cellAmount: number;
        };
        values: {
            name: string;
            value: string;
        }[];
    };
};
declare const globals: {
    backgrounds: any;
};

export { decorators, globals, parameters };
