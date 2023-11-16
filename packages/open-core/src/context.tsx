import { createContext, useContext, ReactNode, useEffect } from "react";
import { useStore } from "zustand";
import { ProgrammingState, ProgrammingStore, DrawerSpec, TypeSpec } from "./types";
import { createProgrammingStore } from "./store";

export const ProgrammingContext = createContext<ProgrammingStore | null>(null);

export function useProgrammingStore(selector: (state: ProgrammingState) => any) {
  const store = useContext(ProgrammingContext);
  if (!store) throw new Error("Missing ProgrammingProvider in the tree");
  return useStore(store, selector as (state: unknown) => any);
}

export interface ProgrammingProviderProps {
  store?: ProgrammingStore;
  drawers: DrawerSpec[];
  types: { [key: string]: TypeSpec };
  children: ReactNode;
}
export function ProgrammingProvider({ store, types, drawers, children }: ProgrammingProviderProps) {


  return (
    <ProgrammingContext.Provider value={store ? store : createProgrammingStore}>
      <InnerProvider types={types} drawers={drawers}>
        {children}
      </InnerProvider>
    </ProgrammingContext.Provider>
  );
}

export interface InnerProviderProps {
  store?: ProgrammingStore;
  drawers: DrawerSpec[];
  types: { [key: string]: TypeSpec };
  children: ReactNode;
}
function InnerProvider({ types, drawers, children}: InnerProviderProps) {
  // console.log(types, drawers);
  const store = useContext(ProgrammingContext);

  useEffect(()=>{
    store?.setState({programSpec:{drawers, objectTypes: types}})
  }, [types, drawers])

  return (<>{children}</>)
}