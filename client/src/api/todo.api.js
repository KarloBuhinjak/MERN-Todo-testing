import axios from "axios";

const BASE_URL = "http://localhost:3000/api/todos";

export const getTodos = async () => {
  const res = await axios.get(BASE_URL);
  return res.data;
};

export const createTodo = async (todo) => {
  const res = await axios.post(BASE_URL, todo);
  return res.data;
};

export const updateTodo = async (id, updates) => {
  const res = await axios.put(`${BASE_URL}/${id}`, updates);
  return res.data;
};

export const deleteTodo = async (id) => {
  const res = await axios.delete(`${BASE_URL}/${id}`);
  return res.status === 204;
};
