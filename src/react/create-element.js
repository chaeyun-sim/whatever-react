export function createElement(type, props, ...children) {
  const dom = {
    type,
    props: {},
  };

  const checkChildren = () => {
    const filteredChildren = children.filter(child => child);
    if (filteredChildren.length === 1) return children[0];
    if (filteredChildren.length === 0) return null;
    return children;
  };

  if (typeof type === 'string' || type === null) {
    dom.props = {
      ...props,
      children: checkChildren(children),
    };
  } else if (typeof type === 'function') {
    dom.props = type();
  } else {
    dom.props = {
      ...props,
      children: null,
    };
  }

  return Object.assign(dom);
}
