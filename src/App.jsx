import { useState } from './react/use-state';

function createInitialTodos() {
  return 1;
}

export default function App() {
  const [value, setValue] = useState(createInitialTodos());

  return (
    <div>
      <header>
        <h1>Counter</h1>
      </header>
      <main>
        <article aria-label='article'>
          <h1>{value}</h1>
          <button onClick={() => setValue(value + 1)}>Increas</button>
          <button onClick={() => setValue(value - 1)}>Decrease</button>
          <button onClick={() => setValue(prev => prev + 1)}>updator function</button>
        </article>
      </main>
    </div>
  );
}
