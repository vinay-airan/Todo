import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const Sidebar = () => {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDesc, setUpdatedDesc] = useState("");

  const openUpdateModal = (todo) => {
    setSelectedTodo(todo);
    setUpdatedTitle(todo.title);
    setUpdatedDesc(todo.description);
    setIsModalOpen(true);
  };
  const updateHandler = async () => {
    try {
      const res = await axios.put(
        `http://localhost:8000/api/todos/${selectedTodo._id}`,
        {
          title: updatedTitle,
          description: updatedDesc,
        },
        { withCredentials: true }
      );

      //  update UI instantly
      setData(prev =>
        prev.map(todo =>
          todo._id === selectedTodo._id
            ? { ...todo, title: updatedTitle, description: updatedDesc }
            : todo
        )
      );
      alert("done");
      setIsModalOpen(false);

    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  const deletehandler = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:8000/api/todos/${id}`,
        {
          withCredentials: true,
        }
      );
      setData(prev => prev.filter(todo => todo._id !== id));

    } catch (error) {
      console.log(error.response?.data || error.message);

    }
  }

  const gettodohandler = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/todos/",
        { withCredentials: true }
      );

      if (Array.isArray(res.data)) {
        setData(res.data);
      } else {
        setData([]);
      }

    } catch (error) {
      console.log(error.response?.data || error.message);
      setData([]);
    }
  };

  useEffect(() => {
    gettodohandler();
  }, []);

  return (

    <div className="h-screen bg-amber-300 p-4 overflow-y-auto">

      <h2 className="text-2xl font-bold mb-4">Your Todos</h2>

      {data.length === 0 ? (
        <p className="text-gray-700">No todos yet</p>
      ) : (
<div className="space-y-4">
  {data.map((todo) => (
    <div
      key={todo._id}
      className="bg-white rounded-lg p-4 shadow-md overflow-hidden"
    >
      <div className="font-semibold flex justify-between items-start gap-3 text-lg text-gray-800">

<div className="wrap-break-word max-w-[70%] min-w-0">
  {todo.title}
</div>
        <div className="flex">
          <button
            onClick={() => openUpdateModal(todo)}
            className="mr-2 bg-black text-white px-3 py-1 rounded-2xl"
          >
            update
          </button>

          <button
            onClick={() => deletehandler(todo._id)}
            className="bg-red-400 px-3 py-1 rounded-2xl"
          >
            delete
          </button>
        </div>
      </div>

<p className="text-gray-700 mt-2 wrap-break-word whitespace-pre-wrap max-h-28 overflow-y-auto pr-2">
  {todo.description}
</p>
    </div>
  ))}
</div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">

          {/* BACKDROP */}
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          ></div>

          {/* MODAL */}
          <div className="relative w-[95%] md:w-[70%] lg:w-[55%] h-[80vh]
                    bg-amber-200 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.2)]
                    p-6 flex flex-col">

            {/* TITLE */}
            <h2 className="text-2xl font-semibold text-amber-900 text-center mb-4">
              Update Todo
            </h2>

            {/* TITLE INPUT */}
            <input
              type="text"
              value={updatedTitle}
              onChange={(e) => setUpdatedTitle(e.target.value)}
              placeholder="Add title here"
              className="w-full p-3 rounded-lg border border-amber-300 bg-black text-white
                   focus:outline-none focus:ring-2 focus:ring-amber-400 mb-4"
            />

            {/* DESCRIPTION */}
            <textarea
              value={updatedDesc}
              onChange={(e) => setUpdatedDesc(e.target.value)}
              placeholder="Type description..."
              className="flex-1 p-4 rounded-lg border border-amber-300 bg-black text-white
                   resize-none focus:outline-none focus:ring-2 focus:ring-amber-400"
            />

            {/* BUTTONS */}
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
              >
                Cancel
              </button>

              <button
                onClick={updateHandler}
                className="px-6 py-2 rounded-lg bg-amber-700 text-white
                     hover:bg-amber-800 transition shadow-md"
              >
                Update
              </button>
            </div>

          </div>
        </div>
      )}
    </div>

  );

};
