// 进行打包 monorepo 进行打包

// 1.获取打包文件/目录
import { readdirSync, statSync } from "fs";
import { execa } from "execa";

const rootDir = "packages";
const dirs = readdirSync(rootDir).filter((item) =>
  statSync(`${rootDir}/${item}`).isDirectory()
);


// 2.并行打包,

/**
 * 
 * stdio: 子进程输出在父进程能看到
 * @param {*} target 
 */
const build = async (target) => {
  await execa("rollup", ["-c", "--environment", `TARGET:${target}`],{ stdio: 'inherit' });
};

const runParallel = async (dirs, iteratorFn) => {
  const res = [];
  for (const dir of dirs) {
    res.push(iteratorFn(dir));
  }
  return Promise.all(res);
};

const main = async () => {
  await runParallel(dirs, build);
  console.log("打包成功");
};

main();