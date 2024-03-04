// 进行打包 monorepo 进行打包

// 1.获取打包文件/目录
import { readdirSync, statSync } from "fs";
import { execa } from "execa";

const rootDir = "packages";
const dirs = readdirSync(rootDir).filter((item) =>
  statSync(`${rootDir}/${item}`).isDirectory()
);

// 2.并行打包,

const rollupBuild = async (target) => {
  await execa("rollup", ["-c", "--environment", `TARGET:${target}`],{ stdio: 'inherit' });
};

const runParaller = async (dirs, build) => {
  const res = [];
  for (const dir of dirs) {
    res.push(build(dir));
  }
  return Promise.all(res);
};

const main = async () => {
  await runParaller(dirs, rollupBuild);
  console.log("打包成功");
};

main();
