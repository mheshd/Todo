// Import necessary modules and utilities
import axios from "axios";

// Create an Axios instance for API requests
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  withCredentials: true,
  timeout: 120000,
});

// Functions to create axios instance
const createTodoApi = (title, description) => {
  return apiClient.post(
    "/todos",
    { title, description },
    { headers: { "Content-Type": "application/json" } }
  );
};

const getAllTodos = () => {
  return apiClient.get("/todos");
};

const toggleTodoStatusApi = (todoId) => {
  return apiClient.patch(`/todos/toggle/status/${todoId}`);
};

const deleteTodoApi = (todoId) => {
  return apiClient.delete(`/todos/${todoId}`);
};

const editTodo = (todoId, todoData) => {
  return apiClient.patch(`/todos/${todoId}`, todoData, {
    headers: { "Content-Type": "application/json" },
  });
};

const getFilteredTodoApi = (query, isComplete) => {
  return apiClient.get(
    `/todos?query=${query}${
      isComplete === null ? "" : `&complete=${isComplete}`
    }`
  );
};

export {
  createTodoApi,
  deleteTodoApi,
  editTodo,
  getAllTodos,
  getFilteredTodoApi,
  toggleTodoStatusApi,
};
