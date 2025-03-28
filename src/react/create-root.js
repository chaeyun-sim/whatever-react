import { render } from './render';

function createRoot(domNode) {
  return {
    render: dom => {
      domNode.innerHTML = ''; // 주의 사항 (1)
      render(dom, domNode);
    },
    unmount: () => undefined,
  };
}

export { createRoot };
