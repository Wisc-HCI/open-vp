import { createContext, useContext, ReactNode, useEffect } from "react";
import { useStore } from "zustand";
import { ProgrammingState, ProgrammingStore, ProgrammingStateStructures } from "./types";
import { createProgrammingStore } from "./store";

export const ProgrammingContext = createContext<ProgrammingStore | null>(null);

export function useProgrammingStore(selector: (state: ProgrammingState) => any) {
  const store = useContext(ProgrammingContext);
  if (!store) throw new Error("Missing ProgrammingProvider in the tree");
  return useStore(store, selector as (state: unknown) => any);
}

export interface ProgrammingProviderProps {
  store?: ProgrammingStore;
  initial?: Partial<ProgrammingStateStructures>;
  children: ReactNode;
}
export function ProgrammingProvider({ store, initial, children }: ProgrammingProviderProps) {


  return (
    <ProgrammingContext.Provider value={store ? store : createProgrammingStore(initial || {})}>
      <InnerProvider initial={initial}>
        {children}
      </InnerProvider>
    </ProgrammingContext.Provider>
  );
}

export interface InnerProviderProps {
  initial?: Partial<ProgrammingStateStructures>;
  children: ReactNode;
}
function InnerProvider({ initial, children}: InnerProviderProps) {
  // console.log(types, drawers);
  const store = useContext(ProgrammingContext);

  useEffect(()=>{
    store?.setState(initial || {})
  }, [initial])

  return (<>{children}</>)
}