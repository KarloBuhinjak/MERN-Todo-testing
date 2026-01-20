import { useTodos } from "../context/TodoContext";
import TodoItem from "../components/TodoItem";
import TodoForm from "../components/TodoForm";

export default function TodoPage() {
  const { todos, loading } = useTodos();

  if (loading) return <p className="loading">Loading...</p>;

  return (
    <div className="todo-container">
      <h1>Todo App</h1>
      <TodoForm />
      <ul className="todo-list">
        {todos.length === 0 && <p>No todos yet.</p>}
        {todos.map((todo) => (
          <TodoItem key={todo._id} todo={todo} />
        ))}
      </ul>
    </div>
  );
}
