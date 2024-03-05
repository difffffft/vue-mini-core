
## monorepo

monorepo -> 源码 -> packages

将包进行独立，解耦

## monorepo环境搭建


控制台输入

```
pnpm init
```

修改package.json
```
"private":"true",
"workspaces":[
    "packages/*"
]
```

## 工程目录结构

```
packages
    reactivity // 响应式
    shared     // 公共工具类
package.json
```


## typescript安装

```
pnpm add typescript -D -w
```

新建tsconfig.json

```json
{
    "compilerOptions": {
      "baseUrl": ".",
      "outDir": "temp",
      "sourceMap": false,
      "target": "es2016",
      "newLine": "LF",
      "useDefineForClassFields": false,
      "module": "esnext",
      "moduleResolution": "bundler",
      "allowJs": true,
      "strict": true,
      "noUnusedLocals": true,
      "experimentalDecorators": true,
      "resolveJsonModule": true,
      "isolatedModules": true,
      "skipLibCheck": true,
      "esModuleInterop": true,
      "removeComments": false,
      "jsx": "preserve",
      "lib": ["es2016", "dom"],
      "types": [],
      "rootDir": ".",
      "paths": {
        "@vue/compat": ["packages/vue-compat/src"],
        "@vue/*": ["packages/*/src"],
        "vue": ["packages/vue/src"]
      }
    },
    "include": [
      "packages/global.d.ts",
      "packages/*/src",
      "packages/runtime-dom/types/jsx.d.ts",
      "packages/*/__tests__",
      "packages/dts-test",
      "packages/vue/jsx-runtime",
      "scripts/*",
      "rollup.*.js"
    ]
  }
```

## 构建工具rollup

```sh
pnpm add rollup rollup-plugin-typescript2 @rollup/plugin-node-resolve @rollup/plugin-json execa -D -w
```

## 添加构建脚本

新增文件

```sh
scripts/build.js
```

新增脚本package.json

```json
"scripts": {
    "build": "node scripts/build.js"
}
```

子模块新增自定义属性

```
  "buildOptions": {
    "name": "VueReactivity",
    "formats": [
      "esm-bundler",
      "cjs",
      "global"
    ]
  }
```


https://www.bilibili.com/video/BV1td4y1r76e/?p=3&spm_id_from=pageDriver&vd_source=12303975543fb5440256284e15cb7a6f

37.51