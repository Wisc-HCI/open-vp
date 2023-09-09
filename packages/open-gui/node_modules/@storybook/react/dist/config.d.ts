import { Addon_DecoratorFunction, ArgTypesEnhancer, ArgsStoryFn, RenderContext, LegacyStoryFn, DecoratorFunction } from '@storybook/types';
import { S as StoryFnReactReturnType, R as ReactRenderer } from './types-0a347bb9.js';
import 'react';

declare const decorators: Addon_DecoratorFunction<StoryFnReactReturnType>[];
declare const argTypesEnhancers: ArgTypesEnhancer[];

declare const render: ArgsStoryFn<ReactRenderer>;
declare function renderToCanvas({ storyContext, unboundStoryFn, showMain, showException, forceRemount, }: RenderContext<ReactRenderer>, canvasElement: ReactRenderer['canvasElement']): Promise<() => void>;

declare const applyDecorators: (storyFn: LegacyStoryFn<ReactRenderer>, decorators: DecoratorFunction<ReactRenderer>[]) => LegacyStoryFn<ReactRenderer>;

declare const parameters: {};

export { applyDecorators, argTypesEnhancers, decorators, parameters, render, renderToCanvas };
