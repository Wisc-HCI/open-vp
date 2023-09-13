import React, {useRef} from 'react';
import {createContext, useContext} from 'react';
import { useDefaultProgrammingStore } from './store';
import { useStore } from 'zustand';

const ProgrammingContext = createContext(null);

export const useProgrammingStore = (selector: (store:any)=>any, equalityFn: (value:any)=>boolean) => {
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
