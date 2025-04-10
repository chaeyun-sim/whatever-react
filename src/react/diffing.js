import { isPrimitiveType } from './check-primitive';
import { handleProperties } from './control-properties';
import { render } from './render';

function mount(node, parent) {
  if (isPrimitiveType(node)) {
    parent.appendChild(document.createTextNode(String(node)));
    return;
  }
  render(node, parent);
}

function unmount(node, parent) {
  if (!node?.dom) return;
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

    if (prevChild?.key !== nextChild?.key) {
      unmount(prevChild, currentParent);
      mount(nextChild, currentParent);
      return;
    }

    diffing(prevChild, nextChild, currentParent);
  }
}

function diffProps(prevProps = {}, nextProps = {}, parent) {
  for (const key of Object.keys(prevProps)) {
    if (!(key in nextProps)) {
      handleProperties(parent, prevProps, key, 'remove');
    }
  }

  for (const [key, value] of Object.entries(nextProps)) {
    if (prevProps[key] !== value) {
      handleProperties(parent, nextProps, key, 'add');
    }
  }
}

export function diffing(prevNode, nextNode, parentDom) {
  if (isPrimitiveType(prevNode) || isPrimitiveType(nextNode)) {
    if (prevNode !== nextNode) {
      if (parentDom.firstChild) {
        parentDom.textContent = '';
      }
      mount(nextNode, parentDom);
    }
  }

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
  diffChildren(
    prevNode.props?.children || [],
    nextNode.props?.children || [],
    prevNode.dom || nextNode.dom
  );
}
