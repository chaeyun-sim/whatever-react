import { createElement } from './lib/createElement';

const App = () => {
  const name = 'World';

  return createElement(
    'div',
    { className: 'app' },
    createElement(
      'h1',
      { className: 'greet' },
      'Hello ',
      createElement('i', null, name),
      '. Welcome!'
    ),
    createElement(
      'p',
      null,
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    )
  );
};

export default App;
