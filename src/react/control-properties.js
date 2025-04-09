export function handleProperties(element, props, propKey, mode = 'add') {
  const dangerousProps = ['innerHTML', 'outerHTML', 'insertAdjacentHTML'];
  if (dangerousProps.includes(propKey)) {
    if (mode === 'add') {
      console.warn(`보안 상의 이유로 ${propKey} 사용을 지양하세요.`);
    }
    return;
  }

  const propsValue = props[propKey];

  if (propKey === 'children') return;

  if (propKey.startsWith('on')) {
    const type = propKey.slice(2).toLowerCase();
    if (mode === 'add') {
      element.addEventListener(type, propsValue);
    } else {
      element.removeEventListener(type, value);
    }
  }

  switch (propKey) {
    case 'style':
      if (mode === 'add' && propsValue && typeof propsValue === 'object') {
        Object.assign(element.style, propsValue);
      } else {
        element.removeAttribute('style');
      }
      break;
    case 'ref':
      const refValue = mode === 'add' ? element : null;
      if (typeof propsValue === 'function') {
        propsValue(refValue);
      } else {
        propsValue.current = refValue;
      }
      break;
    case 'className':
      if (mode === 'add') {
        element.setAttribute('class', propsValue);
      } else {
        element.removeAttribute('class');
      }
      break;
    default:
      element.setAttribute(propKey, propsValue);
  }
}
