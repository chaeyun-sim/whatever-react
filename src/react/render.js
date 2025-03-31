function getProperty(element, props, propKey) {
  const dangerousProps = ['innerHTML', 'outerHTML', 'insertAdjacentHTML'];
  if (dangerousProps.includes(propKey)) {
    console.warn(`보안 상의 이유로 ${propKey} 사용을 지양하세요.`);
    return;
  }

  if (propKey === 'children') {
    return;
  } else if (propKey === 'style') {
    Object.assign(element.style, props[propKey]);
  } else if (propKey.startsWith('on')) {
    const type = propKey.slice(2).toLowerCase();
    element.addEventListener(type, props[propKey]);
  } else if (propKey === 'ref') {
    if (typeof props[propKey] === 'function') {
      props[propKey](element);
    } else {
      props[propKey].current = element;
    }
  } else {
    element.setAttribute(propKey, props[propKey]);
  }
}

export function render(dom, root) {
  if (!dom) return null;

  const { type, props } = dom;

  const element =
    type === 'Fragment' ? document.createDocumentFragment() : document.createElement(type);

  if (props && props.children) {
    Object.keys(props).forEach(propKey => getProperty(element, props, propKey));

    props.children.forEach(child => {
      if (typeof child !== 'object' && child !== undefined) {
        element.appendChild(document.createTextNode(child));
      } else {
        const childElement = render(child, element);
        if (childElement) element.appendChild(childElement);
      }
    });
  }

  root.appendChild(element);

  return element;
}
