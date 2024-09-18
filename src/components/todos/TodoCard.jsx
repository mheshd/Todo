import moment from "moment";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaCheck, FaSpinner } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import { useTodo } from "../../context/TodoContext";
import { classNames } from "../../utils";
import DetailAndEditModal from "./DetailAndEditModal";
import axios from "axios";

const TodoCard = ({ todo }) => {
  const [deleteLoading, setDeleteLoading] = useState(false);
  const { changeTodo, deletetodo } = useTodo();
  const [isEditModal, setIsEditModal] = useState(false);

  const toggleTodoStatus = async (e) => {
    e.stopPropagation();
    try {
      const response = await axios.patch(
        `https://api.freeapi.app/api/v1/todos/toggle/status/${todo._id}`
      );

      toast.success("Todo toogle succes successfully!");
      changeTodo(response);
    } catch (error) {
      toast.error(error);
    }
  };

  const deleteTodoHandler = async (e) => {
    e.stopPropagation();
    try {
      setDeleteLoading(true);
      const data = await axios.delete(
        `https://api.freeapi.app/api/v1/todos/${todo._id}`
      );
      toast.success("Todo delete succes successfully!");

      deletetodo(data);
    } catch (error) {
      console.error("error on fetchin on delete");
    }
  };

  return (
    <>
      {isEditModal && (
        <DetailAndEditModal onClose={() => setIsEditModal(false)} todo={todo} />
      )}
      <div
        role="button"
        onClick={() => setIsEditModal(true)}
        className="flex border-[1.5px] border-t-0 border-white cursor-default w-full items-center py-3 px-3"
      >
        <button
          onClick={toggleTodoStatus}
          className={classNames(
            "p-1 border-[1px] rounded-sm w-5 h-5 md:w-6 md:h-6 flex items-center justify-center",
            todo.isComplete ? "bg-green-600 text-white" : "bg-black text-black"
          )}
        >
          <FaCheck className="text-xs" />
        </button>

        <div className="flex flex-col justify-center ml-4 mr-4">
          <p
            className={classNames(
              "text-base md:text-lg flex items-center gap-4",
              todo.isComplete ? "opacity-50" : ""
            )}
          >
            <span
              className={classNames(
                "line-clamp-1",
                todo.isComplete ? "line-through" : ""
              )}
            >
              {todo.title}
            </span>
            <span className="hidden sm:block md:text-base text-gray-400">
              ({moment(todo.updatedAt).add("TIME_ZONE", "hours").fromNow(true)}{" "}
              ago)
            </span>
          </p>
          <p
            className={classNames(
              "opacity-75 text-xs sm:text-sm md:text-base line-clamp-1",
              todo.isComplete ? "hidden" : ""
            )}
          >
            {todo.description.substring(0, 50)}
            {todo.description.length > 50 ? "..." : ""}
          </p>
        </div>

        <div className="ml-auto flex flex-shrink-0 gap-2">
          <button
            onClick={deleteTodoHandler}
            disabled={deleteLoading}
            className="bg-red-500 p-2 md:p-3 md:text-lg rounded-md"
          >
            {deleteLoading ? (
              <FaSpinner className="animate-spin" />
            ) : (
              <MdDelete />
            )}
          </button>

          <button
            onClick={() => setIsEditModal(true)}
            className="bg-purple-500 p-2 md:p-3 md:text-lg rounded-md"
          >
            <MdEdit />
          </button>
        </div>
      </div>
    </>
  );
};

export default TodoCard;
