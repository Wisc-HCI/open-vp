import { ProgrammingSlice, ImmerProgrammingSlice, useDefaultProgrammingStore } from "./defaultStore";
import Environment from './Environment';
import { ExternalBlock } from "./Block/ExternalBlock";
import { DATA_TYPES, TYPES, EXTRA_TYPES, SIMPLE_PROPERTY_TYPES, CONNECTIONS } from "./Constants";
import { instanceTemplateFromSpec, referenceTemplateFromSpec, callTemplateFromSpec } from "./Generators";
// import { ProgrammingProvider } from "./ProgrammingContext";

export { 
    ProgrammingSlice, 
    ImmerProgrammingSlice, 
    useDefaultProgrammingStore, 
    Environment, 
    DATA_TYPES, 
    TYPES, 
    EXTRA_TYPES, 
    SIMPLE_PROPERTY_TYPES,
    CONNECTIONS,
    ExternalBlock,
    instanceTemplateFromSpec,
    referenceTemplateFromSpec,
    callTemplateFromSpec
};