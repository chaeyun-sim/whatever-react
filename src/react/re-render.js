import App from '@/App';
import { createRoot } from './create-root';
import { resetStateKey } from './use-state';
import { diffing } from './diffing';
import { resetEffectKey } from './use-effect';

let root = null;
let prevNode = null;

export function reRender() {
  const app = App();
  const domNode = document.getElementById('app');

  if (!root) {
    root = createRoot(domNode);
    root.render(app);
  }

  resetStateKey();
  resetEffectKey();

  const newPrevNode = app;

  if (prevNode !== newPrevNode) {
    diffing(prevNode, newPrevNode, domNode);
  }

  prevNode = newPrevNode;

  root.render(app);
}
