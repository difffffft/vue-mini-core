const reactiveHandler = {};
const shallowReactiveHandler = {};
const readonlyHandler = {};
const shallowReadonlyHandler = {};

export const reactive = (target: any) => {
  return createReactObj(target, false, reactiveHandler);
};
export const shallowReactive = (target: any) => {
  return createReactObj(target, false, shallowReactiveHandler);
};
export const readonly = (target: any) => {
  return createReactObj(target, true, readonlyHandler);
};
export const shallowReadonly = (target: any) => {
  return createReactObj(target, true, shallowReadonlyHandler);
};

const createReactObj = (target, isReadonly, handler) => {
    
};
