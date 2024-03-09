import { createContext, useContext, type ReactNode, useEffect } from "react";
import { useStore } from "zustand";
import type {
  ProgrammingState,
  ProgrammingStore,
  ProgrammingStateStructures,
} from "./types.ts";
import { createProgrammingStore } from "./store.ts";

export const ProgrammingContext = createContext<ProgrammingStore | null>(null);

export function useProgrammingStore<T>(
  selector: (state: ProgrammingState) => T,
): T {
  const store = useContext(ProgrammingContext);
  if (!store) throw new Error("Missing ProgrammingProvider in the tree");
  return useStore(store, selector as (state: unknown) => T);
}

export interface ProgrammingProviderProps {
  store?: ProgrammingStore;
  initial?: Partial<ProgrammingStateStructures>;
  children: ReactNode;
}
export function ProgrammingProvider({
  store,
  initial,
  children,
}: ProgrammingProviderProps): ReactNode {
  return (
    <ProgrammingContext.Provider
      value={store ? store : createProgrammingStore(initial || {})}
    >
      <InnerProvider initial={initial}>{children}</InnerProvider>
    </ProgrammingContext.Provider>
  );
}

export interface InnerProviderProps {
  initial?: Partial<ProgrammingStateStructures>;
  children: ReactNode;
}
function InnerProvider({ initial, children }: InnerProviderProps): ReactNode {
  // console.log(types, drawers);
  const store = useContext(ProgrammingContext);

  useEffect(() => {
    store?.setState(initial || {});
  }, [initial, store]);

  return <>{children}</>;
}
