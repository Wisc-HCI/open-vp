declare namespace jest {
  interface Matchers<R> {
    toMatchPaths(paths: string[]): R;
  }
}
