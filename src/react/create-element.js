export function createElement(type, props, ...children) {
  const dom = {
    type,
    props: {},
  };

  if (typeof type === 'string') {
    dom.props = {
      ...props,
      children: children.length > 1 ? children : children[0],
    };
  } else if (typeof type === 'function') {
    dom.props = type();
  }

  return Object.assign(dom);
}
