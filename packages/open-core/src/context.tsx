"use client"

import { createContext, useContext, ReactNode, Context, useRef } from "react";
import { useStore } from "zustand";
import { useStoreWithEqualityFn } from "zustand/traditional";
import { ProgrammingState, ProgrammingStore } from "./types";
import { DefaultSlice, createProgrammingStore } from "./store";
import { create } from "lodash";

export const ProgrammingContext = createContext<ProgrammingStore | null>(null);

export function useProgrammingStore(selector: (state: ProgrammingState) => any) {
  const store = useContext(ProgrammingContext);
  if (!store) throw new Error("Missing ProgrammingProvider in the tree");
  return useStore(store, selector);
}

export function ProgrammingProvider({ store, children }: {store: ProgrammingStore | undefined, children: ReactNode}) {
  return (
    <ProgrammingContext.Provider value={store ? store : createProgrammingStore}>
      {children}
    </ProgrammingContext.Provider>
  );
}
