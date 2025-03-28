import App from '@/App';
import { createRoot } from './react/create-root';

const el = App();

console.log(JSON.stringify(el, null, 2));

const domNode = document.getElementById('app');
const root = createRoot(domNode);

root.render(App());
