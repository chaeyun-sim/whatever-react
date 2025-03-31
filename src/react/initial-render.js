import App from '@/App';
import { createRoot } from './create-root';
import { resetStateKey } from './use-state';

let root = null;

export function render() {
  if (!root) {
    const domNode = document.getElementById('app');
    root = createRoot(domNode);
  }

  resetStateKey();
  root.render(App());
}
