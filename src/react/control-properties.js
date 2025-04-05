export function makeProperties(element, props, propKey) {
  const dangerousProps = ['innerHTML', 'outerHTML', 'insertAdjacentHTML'];
  if (dangerousProps.includes(propKey)) {
    console.warn(`보안 상의 이유로 ${propKey} 사용을 지양하세요.`);
    return;
  }

  const value = props[propKey];

  if (propKey === 'children') {
    return;
  } else if (propKey === 'style') {
    if (value && typeof value === 'object') {
      Object.assign(element.style, value);
    } else {
      element.removeAttribute('style');
    }
  } else if (propKey.startsWith('on')) {
    const type = propKey.slice(2).toLowerCase();
    element.addEventListener(type, value);
  } else if (propKey === 'ref') {
    if (typeof value === 'function') {
      value(element);
    } else {
      value.current = element;
    }
  } else if (propKey === 'className') {
    element.setAttribute('class', value);
  } else {
    element.setAttribute(propKey, value);
  }
}

export function removeProperties(element, props, propKey) {
  const value = props[propKey];

  if (propKey === 'children') {
    return;
  } else if (propKey === 'style') {
    element.removeAttribute('style');
  } else if (propKey.startsWith('on')) {
    const type = propKey.slice(2).toLowerCase();
    element.removeEventListener(type, value);
  } else if (propKey === 'ref') {
    if (typeof value === 'function') {
      value(null);
    } else {
      value.current = null;
    }
  } else if (propKey === 'className') {
    element.removeAttribute('class');
  } else {
    element.removeAttribute(propKey);
  }
}
