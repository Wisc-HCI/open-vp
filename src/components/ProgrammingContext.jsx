import React from 'react';
import {createContext, useContext} from 'react';
import { useDefaultProgrammingStore } from './defaultStore';
import { useStore } from 'zustand'

const ProgrammingContext = createContext();

export const useProgrammingStore = (selector, equalityFn) => {
    const store = useContext(ProgrammingContext);
    return useStore(store, selector, equalityFn)
}

export const ProgrammingProvider = ({store, children}) => {
    return (
        <ProgrammingContext.Provider value={store ? store : useDefaultProgrammingStore}>
            {children}
        </ProgrammingContext.Provider>
    )
}
