import { babel } from "@rollup/plugin-babel";
import external from "rollup-plugin-peer-deps-external";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';

export default [
  {
    input: "./src/index.js",
    output: [
      {
        file: "dist/index.js",
        format: "cjs",
      },
      {
        file: "dist/index.es.js",
        format: "es",
        exports: "named",
      },
    ],
    plugins: [
      json(),
      babel({
        exclude: "node_modules/**",
        presets: ["@babel/react", "@babel/env"],
        babelHelpers: 'bundled'
      }),
      commonjs(),
      external(),
      nodeResolve({ extensions: [".mjs", ".js", ".json", ".node", ".jsx"] }),
    //   terser(),
    ],
  },
];
