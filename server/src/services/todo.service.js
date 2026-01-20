const Todo = require("../models/todo.model");

const createTodo = async (data) => {
  return await Todo.create(data);
};

const getTodos = async () => {
  return await Todo.find().sort({ createdAt: -1 });
};

const updateTodo = async (id, data) => {
  return await Todo.findByIdAndUpdate(id, data, { new: true });
};

const deleteTodo = async (id) => {
  return await Todo.findByIdAndDelete(id);
};

module.exports = {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
};
