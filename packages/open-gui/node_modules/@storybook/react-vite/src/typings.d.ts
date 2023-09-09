// TODO: Replace, as soon as @types/react-dom 17.0.14 is used
// Source: https://github.com/DefinitelyTyped/DefinitelyTyped/blob/fb0f14b7a35cde26ffaa82e7536c062e593e9ae6/types/react-dom/client.d.ts
declare module 'react-dom/client' {
  import React = require('react');

  export interface HydrationOptions {
    onHydrated?(suspenseInstance: Comment): void;
    onDeleted?(suspenseInstance: Comment): void;
    /**
     * Prefix for `useId`.
     */
    identifierPrefix?: string;
    onRecoverableError?: (error: unknown) => void;
  }

  export interface RootOptions {
    /**
     * Prefix for `useId`.
     */
    identifierPrefix?: string;
    onRecoverableError?: (error: unknown) => void;
  }

  export interface Root {
    render(children: React.ReactChild | Iterable<React.ReactNode>): void;
    unmount(): void;
  }

  /**
   * Replaces `ReactDOM.render` when the `.render` method is called and enables Concurrent Mode.
   *
   * @see https://reactjs.org/docs/concurrent-mode-reference.html#createroot
   */
  export function createRoot(
    container: Element | Document | DocumentFragment | Comment,
    options?: RootOptions
  ): Root;

  export function hydrateRoot(
    container: Element | Document | DocumentFragment | Comment,
    initialChildren: React.ReactChild | Iterable<React.ReactNode>,
    options?: HydrationOptions
  ): Root;
}
