import { Fragment } from './jsx-runtime';

function checkChildren(children) {
  if (!children.length) return null;
  const flat = children.flat();
  return flat;
}

function createElement(type, props, ...children) {
  const dom = {};

  if (typeof type === 'string' || type === null) {
    dom.type = type;
    dom.props = {
      ...props,
      children: checkChildren(children),
    };
  } else if (typeof type === 'function') {
    const fn = type();
    dom.type = fn.type;
    dom.props = fn.props;
  } else if (type === Fragment) {
    dom.type = 'Fragment';
    dom.props = {
      ...props,
      children: checkChildren(children),
    };
  } else {
    dom.type = type;
    dom.props = {
      ...props,
      children: null,
    };
  }

  return Object.assign(dom);
}

export { createElement };
