import { makeProperties, removeProperties } from './control-properties';
import { render } from './render';

function mount(node, parent) {
  render(node, parent);
}

function unmount(node, parent) {
  if (!node || !node.dom) return;
  parent.removeChild(node.dom);
}

function diffChildren(prevChildren, nextChildren, parentDom) {
  const max = Math.max(prevChildren.length, nextChildren.length);

  for (let i = 0; i < max; i++) {
    const [prevChild, nextChild] = [prevChildren[i], nextChildren[i]];
    const currentParent = nextChild?.dom?.parentNode || prevChild?.dom?.parentNode || parentDom;

    if (!prevChild) {
      mount(nextChild, currentParent);
      return;
    }

    if (!nextChildren[i]) {
      unmount(prevChild, currentParent);
      return;
    }

    diffing(prevChild, nextChild, currentParent);
  }
}

function diffProps(prevProps, nextProps, parent) {
  for (const key of Object.keys(prevProps)) {
    if (!(key in nextProps)) {
      removeProperties(parent, prevProps, key);
    }
  }

  for (const [key, value] of Object.entries(nextProps)) {
    if (prevProps[key] !== value) {
      makeProperties(parent, nextProps, key);
    }
  }
}

export function diffing(prevNode, nextNode, parentDom) {
  if (!prevNode) {
    mount(nextNode, parentDom);
    return;
  }

  if (!nextNode) {
    unmount(prevNode, parentDom);
    return;
  }

  if (prevNode.type !== nextNode.type) {
    unmount(prevNode, parentDom);
    mount(nextNode, parentDom);
    return;
  }

  if (prevNode === nextNode) return;

  diffProps(prevNode.props, nextNode.props, prevNode.dom || nextNode.dom);
  diffChildren(prevNode.props.children, nextNode.props.children, prevNode.dom || nextNode.dom);
}
