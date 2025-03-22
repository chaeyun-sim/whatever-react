import { createElement } from './create-element';

export function jsx(tagName, props) {
  const { children, ...rest } = props;
  return createElement(tagName, rest, children);
}
