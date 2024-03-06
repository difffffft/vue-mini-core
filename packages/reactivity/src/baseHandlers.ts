import { isObject } from "@vue/shared";
import { reactive, readonly } from "./reactive";

const createGetter = (
  isReadonly: boolean = false,
  isShallow: boolean = false
) => {
  return (target: any, key: any, receiver: any) => {
    const res = Reflect.get(target, key, receiver);
    if (!isReadonly) {
      // 收集依赖
    }
    if (isShallow) {
      return res;
    }
    if (isObject(res)) {
      return isReadonly ? readonly(res) : reactive(res);
    }
    return res;
  };
};

const get = createGetter(); // 可读可写，深
const shallowGet = createGetter(false, true); // 可读可写，浅
const readonlyGet = createGetter(true); // 只读，深
const shallowReadonlyGet = createGetter(true, true); // 只读，浅

export const reactiveHandlers = {
  get,
  set: () => {
    console.log("set");
  },
};
export const shallowReactiveHandlers = {
  get: shallowGet,
};
export const readonlyHandlers = {
  get: readonlyGet,
};
export const shallowReadonlyHandlers = {
  get: shallowReadonlyGet,
};
