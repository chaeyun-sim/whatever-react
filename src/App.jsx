import { useEffect } from './react/use-effect';
import { useState } from './react/use-state';

export default function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log(`current: ${count}`);
  }, [count]);

  return (
    <div>
      <span>{count}</span>
      <button onClick={() => setCount(prev => prev + 1)}>click</button>
    </div>
  );
}
