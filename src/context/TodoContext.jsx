import React, { createContext, useContext, useEffect, useState } from "react";
import { requestHandler } from "../utils";
import { createTodoApi, getAllTodos, getFilteredTodoApi } from "../api";
import toast from "react-hot-toast";
import Loader from "../components/Loader";

// Create a context to manage todos
const TodoContext = createContext({
  todos: [],
  loading: false,
  createLoading: false,
  fetchLoading: false,
  createTodo: async () => {},
  changeTodo: () => {},
  deletetodo: () => {},
  getFilteredTodos: async () => {},
});

// Create a hook to access the todos and related functions
const useTodo = () => useContext(TodoContext);

// Create a component that provides todos
const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [createLoading, setCreateloading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);

  // function to create todo
  const deletetodo = (_id) => {
    const updatedTodos = todos.filter((todo) => todo._id !== _id);
    setTodos(updatedTodos);
  };

  // change todos
  const changeTodo = (updatedTodo) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo._id === updatedTodo._id ? updatedTodo : todo
      )
    );
  };

  const getFilteredTodos = async (query = "", isComplete) => {
    await requestHandler(
      async () => await getFilteredTodoApi(query, isComplete),
      setFetchLoading,
      (res) => {
        const { data } = res;
        setTodos(data);
        console.log(data);
      },
      (error) => {
        toast.error(error);
      }
    );
  };

  useEffect(() => {
    // fetching todos on page refresh
    (async () => {
      await requestHandler(
        async () => await getAllTodos(),
        setLoading,
        (res) => {
          const { data } = res;
          setTodos(data);
        },
        (error) => {
          toast.error(error);
        }
      );
    })();
  }, []);

  return (
    <TodoContext.Provider
      value={{
        todos,
        createLoading,
        deletetodo,
        changeTodo,
        loading,
        fetchLoading,
        getFilteredTodos,
      }}
    >
      {loading ? (
        <div className="flex justify-center items-center text-2xl h-[100vh]">
          <Loader />
        </div>
      ) : (
        children
      )}
    </TodoContext.Provider>
  );
};

// Export the context, provider component, and custom hook
export { TodoContext, TodoProvider, useTodo };
