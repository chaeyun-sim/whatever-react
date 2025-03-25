import { createElement } from './create-element';

function jsx(tagName, props) {
  const { children, ...rest } = props;
  return createElement(tagName, rest, children);
}

export const Fragment = Symbol('Fragment');

export { jsx, jsx as jsxs };
