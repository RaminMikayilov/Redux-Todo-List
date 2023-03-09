import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  toggle,
  deleteTodo,
  clearCompleted,
  openModal,
  findTodo,
} from "../../redux/slices/TodoSlice";

import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const TodoItems = () => {
  const { items, filterMode } = useSelector((state) => state.todo);
  const dispatch = useDispatch();

  // FILTER
  // default All
  let filtered = items;

  if (filterMode == "Active") {
    filtered = items.filter((item) => !item.completed);
  } else if (filterMode == "Completed") {
    filtered = items.filter((item) => item.completed);
  }

  if (items.length == 0) {
    return (
      <div className="text-red-600 font-bold text-xl">List is empty...</div>
    );
  }
  return (
    <>
      <div className="space-y-2">
        {filtered.map(({ id, text, completed }) => {
          return (
            <div key={id} className="flex items-center justify-between">
              <div className="space-x-2 flex items-center">
                <input
                  type="checkbox"
                  id={id}
                  className="w-5 h-5"
                  checked={completed}
                  onChange={() => dispatch(toggle(id))}
                />
                <label
                  htmlFor={id}
                  className={`${
                    completed ? "line-through font-medium" : "font-bold"
                  } text-custom-blue dark:text-custom-white`}
                >
                  {text}
                </label>
              </div>
              <div className="space-x-3 flex">
                <span
                  className="text-custom-blue cursor-pointer"
                  onClick={() => {
                    dispatch(openModal());
                    dispatch(findTodo(id));
                  }}
                >
                  <FaEdit />
                </span>

                <span
                  className="text-red-600 cursor-pointer"
                  onClick={() => dispatch(deleteTodo(id))}
                >
                  <MdDelete />
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <button
        type="submit"
        className="mt-10 float-right bg-red-600 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-800 hover:border-red-600 rounded duration-200"
        onClick={() => dispatch(clearCompleted())}
      >
        Clear Completed
      </button>
    </>
  );
};

export default TodoItems;
