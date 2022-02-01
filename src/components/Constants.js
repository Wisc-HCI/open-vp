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
    LOCKED_INDICATOR: 0, // Should be working
    NAME_EDIT_TOGGLE: 1, // Should be working
    SELECTION_TOGGLE: 2, // Needs testing
    COLLAPSE_TOGGLE: 3, // Needs testing
    FUNCTION_BUTTON: 4, // Needs development
    INDICATOR: 5, // Needs testing
    DROPDOWN: 6,  // Should be working
    DELETE_BUTTON: 7, // TO ADD
    ADD_ARGUMENT: 8 // TO ADD
}