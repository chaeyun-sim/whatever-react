export function render(dom, root) {
  if (!dom) return null;

  const { type, props } = dom;

  const element =
    type === 'Fragment' ? document.createDocumentFragment() : document.createElement(type);

  if (props && props.children) {
    props.children.forEach(child => {
      if (typeof child !== 'object' && child !== undefined) {
        // primitive type
        element.appendChild(document.createTextNode(child));
      } else {
        const childElement = render(child, element);
        if (childElement) {
          element.appendChild(childElement);
        }
      }
    });
  }

  root.appendChild(element);

  return element;
}
