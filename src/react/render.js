function getProperty(element, props, propKey) {
  const dangerousProps = ['innerHTML', 'outerHTML', 'insertAdjacentHTML'];
  if (dangerousProps.includes(propKey)) {
    console.warn(`보안 상의 이유로 ${propKey} 사용을 지양하세요.`);
    return;
  }

  const value = props[propKey];

  if (propKey === 'children') {
    props.children.forEach(child => {
      if (typeof child !== 'object' && child !== undefined) {
        element.appendChild(document.createTextNode(child));
      } else {
        const childElement = render(child, element);
        if (childElement) element.appendChild(childElement);
      }
    });
  } else if (propKey === 'style') {
    Object.assign(element.style, value);
  } else if (propKey.startsWith('on')) {
    const type = propKey.slice(2).toLowerCase();
    element.addEventListener(type, value);
  } else if (propKey === 'ref') {
    if (typeof value === 'function') {
      props[propKey](element);
    } else {
      value.current = element;
    }
  } else if (propKey === 'className') {
    element.setAttribute('class', value);
  } else {
    element.setAttribute(propKey, value);
  }
}

export function render(dom, root) {
  if (!dom) return null;

  const { type, props } = dom;

  const element =
    type === 'Fragment' ? document.createDocumentFragment() : document.createElement(type);

  if (props.children) {
    Object.keys(props).forEach(propKey => getProperty(element, props, propKey));
  }

  root.appendChild(element);

  return element;
}
