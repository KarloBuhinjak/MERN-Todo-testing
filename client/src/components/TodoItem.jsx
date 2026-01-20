import { useTodos } from "../context/TodoContext";

export default function TodoItem({ todo }) {
  const { updateTodo, deleteTodo } = useTodos();

  return (
    <li>
      <div>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => updateTodo(todo._id, { completed: !todo.completed })}
        />
        {todo.title}
      </div>
      <button onClick={() => deleteTodo(todo._id)}>Delete</button>
    </li>
  );
}
