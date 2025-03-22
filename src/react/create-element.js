export function createElement(type, props, ...children) {
  const dom = {
    type,
    props: {
      ...props,
      children: children.length === 1 ? children[0] : children,
    },
  };

  return dom;
}
