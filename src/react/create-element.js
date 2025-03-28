import { Fragment } from './jsx-runtime';

function checkChildren(children) {
  if (!children.length) return null;
  const flat = children.flat();
  return flat;
}

function createElement(type, props, ...children) {
  const dom = {
    type,
    props: {},
  };

  if (typeof type === 'string' || type === null) {
    dom.props = {
      ...props,
      children: checkChildren(children),
    };
  } else if (typeof type === 'function') {
    dom.props = type();
  } else if (type === Fragment) {
    dom.type = 'Fragment';
    dom.props = {
      ...props,
      children: checkChildren(children),
    };
  } else {
    dom.props = {
      ...props,
      children: null,
    };
  }

  return Object.assign(dom);
}

export { createElement };
