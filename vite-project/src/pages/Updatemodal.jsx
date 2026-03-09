import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateTodoModal = ({ isOpen, onClose, todo, refreshTodos }) => {
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
    }
  }, [todo]);

  const updateHandler = async () => {
    try {
      await axios.put(
        `http://localhost:8000/api/todos/${todo._id}`,
        { title },
        { withCredentials: true }
      );

      refreshTodos(); // reload list
      onClose(); // close modal
    } catch (error) {
      console.log(error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl p-6 w-[90%] max-w-md shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Update Todo</h2>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 mb-4 outline-none focus:ring-2 focus:ring-blue-400"
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
          >
            Cancel
          </button>

          <button
            onClick={updateHandler}
            className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateTodoModal;