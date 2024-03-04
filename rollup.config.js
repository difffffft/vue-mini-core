import { createRequire } from "node:module";

// 解析ts
import ts from "rollup-plugin-typescript2";

// 解析json
import json from "@rollup/plugin-json";

// 解析第三方插件
import resolvePlugin from "@rollup/plugin-node-resolve";

import path from "path";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const __dirname = fileURLToPath(new URL(".", import.meta.url));

// 1.获取文件路径
const packagesDir = path.resolve(__dirname, "packages");
const packageDir = path.resolve(packagesDir, process.env.TARGET);
const resolve = (/** @type {string} */ p) => path.resolve(packageDir, p);
const pkg = require(resolve(`package.json`));
const packageOptions = pkg.buildOptions || {};
const name = packageOptions.filename || path.basename(packageDir);

// 2.配置：输出配置
const outputConfigs = {
  "esm-bundler": {
    file: resolve(`dist/${name}.esm-bundler.js`),
    format: "es",
  },
  cjs: {
    file: resolve(`dist/${name}.cjs.js`),
    format: "cjs",
  },
  global: {
    file: resolve(`dist/${name}.global.js`),
    format: "iife",
  },
};

const createConfig = (format, output) => {
  output.name = packageOptions.name;
  output.sourcemap = true;
  return {
    input: resolve(`src/index.ts`),
    output,
    plugins: [
      json(),
      // 解析TS
      ts({
        // tsconfig: resolve("tsconfig.json"),
      }),
      resolvePlugin(),
    ],
  };
};

// 3.获取每个pkg的name和配置项
const defaultFormats = ["esm-bundler", "cjs"];
const inlineFormats = process.env.FORMATS && process.env.FORMATS.split(",");
const packageFormats =
  inlineFormats || packageOptions.formats || defaultFormats;
const packageConfigs = packageFormats.map((format) =>
  createConfig(format, outputConfigs[format])
);

export default packageConfigs;
