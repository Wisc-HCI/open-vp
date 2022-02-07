// DATA_TYPES are the sub-types of each user-defined type. For example, you may have an INSTANCE and REFERENCE to some newType
export const DATA_TYPES = {
    INSTANCE: 0,
    REFERENCE: 1,
    CALL: 2,
    ARGUMENT: 3
}

// The high-level type that each objectType belongs to (either object or function)
export const TYPES = {
    OBJECT: 0,
    FUNCTION: 1
}

export const EXTRA_TYPES = {
    LOCKED_INDICATOR: 0, 
    NAME_EDIT_TOGGLE: 1, 
    SELECTION_TOGGLE: 2, 
    COLLAPSE_TOGGLE: 3, 
    FUNCTION_BUTTON: 4, 
    INDICATOR: 5, 
    DROPDOWN: 6,  
    DELETE_BUTTON: 7, 
    ADD_ARGUMENT: 8, 
    ADD_ARGUMENT_GROUP: 9, 
    DEBUG_TOGGLE: 10 
}

export const SIMPLE_PROPERTY_TYPES = {
    BOOLEAN: 0,
    NUMBER: 1,
    STRING: 2,
    OPTIONS: 3
}