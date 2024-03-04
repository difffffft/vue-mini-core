// 解析ts
import ts from "rollup-plugin-typescript2"

// 解析json
import json from "@rollup/plugin-json"

// 解析第三方插件
import resolvePlugin from "@rollup/plugin-node-resolve"

import path from "path"
import { dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)

// 1.获取文件路径
let packagesDir = path.resolve(__dirname, "packages")


console.log(packagesDir);

// 2.获取打包的包的路径
let packageDir = path.resolve(packagesDir, process.env.TARGET)

console.log("TARGET", process.env.TARGET);
console.log(packageDir);