import { hasOwn } from 'util';

/**
 * 判断是否为 vue 虚拟节点
 * @param node  节点对象
 * @returns {boolean|*} 是否为 vue 虚拟节点
 */
export function isVNode (node) {
    return node !== null && typeof node === 'object' && hasOwn(node, 'componentOptions');
}

/**
 * 获取组件的第一个子节点
 * @param children
 * @returns {*}
 */
export function getFirstComponentChild (children) {
    return children && children.filter(c => c && c.tag)[0];
}
