const effectStates = [];
let currentEffectKey = 0;

export const resetEffectKey = () => (currentEffectKey = 0);

export function useEffect(callback, dependencies) {
  const tmpKey = currentEffectKey++;
  const prevDependencies = effectStates[tmpKey];

  const hasChange =
    !prevDependencies || dependencies.some((el, idx) => el !== prevDependencies[idx]);

  if (hasChange) {
    callback();
    effectStates[tmpKey] = dependencies;
  }
}
