import { reRender } from './re-render';

const state = [];
let currentStateKey = 0;
export const resetStateKey = () => (currentStateKey = 0);

export function useState(initialState) {
  const tmpKey = currentStateKey;

  if (!(tmpKey in state)) {
    if (typeof initialState === 'function') {
      // If you pass a function as initialState, it will be treated as an initializer function.
      state[tmpKey] = initialState();
    } else {
      state[tmpKey] = initialState;
    }
  }

  function setState(nextState) {
    if (Object.is(state[tmpKey], nextState)) {
      // 공식문서: If the new value you provide is identical to the current state, as determined by an Object.is comparison, React will skip re-rendering the component and its children.
      return;
    }

    if (typeof nextState === 'function') {
      // If you pass a function as nextState, it will be treated as an updater function.
      state[tmpKey] = nextState(state[tmpKey]);
    } else {
      state[tmpKey] = nextState; // update the state to a different value
    }

    reRender(); // trigger a re-render
  }

  const currentState = state[tmpKey];
  currentStateKey++;
  return [currentState, setState];
}
