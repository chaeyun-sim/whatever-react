import Todos from './components/todo/Todos';
import { useState } from './react/use-state';

export default function App() {
  const [value, setValue] = useState('');
  const handleChange = e => {
    console.log(e.target.value);
  };

  return (
    <div>
      <input
        onChange={handleChange}
        value={value}
      />
    </div>
  );
}
