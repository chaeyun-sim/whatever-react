import App from '@/App';
import { reRender } from './react/re-render';

const el = App();

console.log(JSON.stringify(el, null, 2));

reRender();
