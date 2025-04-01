import App from '@/App';
import { createRoot } from './create-root';
import { resetStateKey } from './use-state';

let root = null;

export function reRender() {
  const app = App();
  const domNode = document.getElementById('app');

  if (!root) {
    root = createRoot(domNode);
  }

  resetStateKey();

  root.render(app);
}
