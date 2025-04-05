import { useState } from '@/react/use-state';

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState(null);

  const toggle = idx => {
    setTodos(todos.map((todo, i) => (i === idx ? { ...todo, isChecked: !todo.isChecked } : todo)));
  };

  const addClick = () => {
    const nextTodo = { id: Date.now(), value: '', isChecked: false };
    setNewTodo(nextTodo);
    if (newTodo !== null) {
      setTodos([...todos, newTodo]);
      setNewTodo(null);
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
      <h1>TODO LIST</h1>

      <div style={{ minHeight: '100px', width: '300px', backgroundColor: '#f9f9f9' }}>
        {todos.length > 0 ? (
          todos.map((todo, idx) => (
            <div
              key={`${todo.id}-${todo.isChecked}`}
              style={{ display: 'flex', gap: '2px', alignItems: 'center' }}
            >
              <div>
                <button
                  onClick={() => toggle(idx)}
                  style={{
                    background: 'transparent',
                    width: '30px',
                    height: '30px',
                    border: 'none',
                  }}
                >
                  {todo.isChecked ? (
                    <input
                      type='checkbox'
                      checked
                    />
                  ) : (
                    <input type='checkbox' />
                  )}
                </button>
                <span
                  style={{
                    textDecoration: todo.isChecked ? 'line-through' : 'none',
                    color: todo.isChecked ? 'lightgray' : 'black',
                  }}
                >
                  {todo.value}
                </span>
              </div>
              <span style={{ color: 'gray', fontSize: '12px', marginTop: '5px' }}>{`${new Date(
                todo.id
              ).getHours()} : ${new Date(todo.id).getMinutes()}`}</span>
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center' }}>작성된 투두가 없습니다.</p>
        )}
      </div>

      {newTodo && (
        <div>
          <input
            value={newTodo.value}
            onChange={e => {
              setNewTodo({ ...newTodo, value: e.target.value });
            }}
            autoFocus
          />
        </div>
      )}

      <div style={{ display: 'flex', marginTop: '10px' }}>
        {newTodo && (
          <button
            style={{ width: '60px', marginRight: '20px' }}
            onClick={() => setNewTodo(null)}
          >
            취소
          </button>
        )}
        <button
          style={{ width: '60px' }}
          onClick={addClick}
        >
          추가
        </button>
      </div>
    </div>
  );
}
