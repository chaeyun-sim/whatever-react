import App from '@/App';
import { render } from './react/initial-render';

const el = App();

console.log(JSON.stringify(el, null, 2));

render();
