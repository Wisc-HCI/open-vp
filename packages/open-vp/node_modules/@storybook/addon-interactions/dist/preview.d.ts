import * as _storybook_types from '@storybook/types';
import { ArgsEnhancer, Renderer, StepLabel, PlayFunction, PlayFunctionContext } from '@storybook/types';

declare const argsEnhancers: ArgsEnhancer<Renderer, _storybook_types.Args>[];
declare const runStep: (label: StepLabel, play: PlayFunction, context: PlayFunctionContext<any>) => void | Promise<void>;
declare const parameters: {
    throwPlayFunctionExceptions: boolean;
};

export { argsEnhancers, parameters, runStep };
