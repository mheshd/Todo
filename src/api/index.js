// Import necessary modules and utilities
import axios from "axios";

// Create an Axios instance for API requests
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  withCredentials: true,
});

const baseUrl = import.meta.env.VITE_SERVER_URL;

// Functions to create axios instance
// const createTodoApi = (title, description) => {
//   apiClient
//     .post(
//       "/todos",
//       { title, description },
//       { headers: { "Content-Type": "application/json" } }
//     )
//     .then((res) => console.log("todo create", res));
// };

const createTodoApi = async (title, description) => {
  try {
    const response = await apiClient.post(
      "/todos",
      { title, description },
      { headers: { "Content-Type": "application/json" } }
    );
    console.log("todo create", response);
  } catch (error) {
    console.error("Error creating todo", error);
  }
};

export const postTodo = async ({ title, description }) => {
  await axios
    .post("https://api.freeapi.app/api/v1/todos", { title, description })
    .then((res) => console.log(" todo post", res));
};

const getAllTodos = async () => {
  console.log(baseUrl);
  const allTodos = await axios.get(baseUrl + "/todos");
  return allTodos;
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
