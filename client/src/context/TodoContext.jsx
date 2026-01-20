import { createContext, useContext, useState, useEffect } from "react";
import * as todoAPI from "../api/todo.api";

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTodos = async () => {
    const data = await todoAPI.getTodos();
    setTodos(data);
    setLoading(false);
  };

  const addTodo = async (todo) => {
    const newTodo = await todoAPI.createTodo(todo);
    setTodos((prev) => [...prev, newTodo]);
  };

  const updateTodo = async (id, updates) => {
    const updated = await todoAPI.updateTodo(id, updates);
    setTodos((prev) => prev.map((t) => (t._id === id ? updated : t)));
  };

  const deleteTodo = async (id) => {
    await todoAPI.deleteTodo(id);
    setTodos((prev) => prev.filter((t) => t._id !== id));
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <TodoContext.Provider
      value={{ todos, loading, addTodo, updateTodo, deleteTodo }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodos = () => useContext(TodoContext);
