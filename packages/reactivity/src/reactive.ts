import { isObject } from "@vue/shared";
import { reactiveHandlers, readonlyHandlers, shallowReactiveHandlers, shallowReadonlyHandlers } from "./baseHandlers";



export const reactive = (target: any) => {
  return createReactObj(target, false, reactiveHandlers);
};
export const shallowReactive = (target: any) => {
  return createReactObj(target, false, shallowReactiveHandlers);
};
export const readonly = (target: any) => {
  return createReactObj(target, true, readonlyHandlers);
};
export const shallowReadonly = (target: any) => {
  return createReactObj(target, true, shallowReadonlyHandlers);
};

/**
 * key必须是对象
 * 自动垃圾回收
 */
const reactiveMap = new WeakMap();
const readonlyReactiveMap = new WeakMap();

/**
 * 实现代理
 * @param target
 * @param isReadonly
 * @param handler
 */
const createReactObj = (target: any, isReadonly: boolean, baseHandlers: Object) => {
  if (!isObject(target)) {
    return target;
  }

  const proxyMap = isReadonly ? readonlyReactiveMap : reactiveMap;
  const _proxy = proxyMap.get(target);
  if (_proxy) {
    return _proxy;
  }

  const proxy = new Proxy(target, baseHandlers);
  proxyMap.set(target, proxy);
  return proxy;
};
