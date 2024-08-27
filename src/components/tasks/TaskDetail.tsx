// pages/task/[id].tsx
"use client";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { deleteTask, getItemById, updateTask } from "@/api/tasks";
import Loader from "../Loader";

const TaskDetail = () => {
  const router = useParams();
  const router1 = useRouter();
  const id = router.id;
  const [task, setTask] = useState<any>({
    title: "",
    description: "",
    dueDate: "",
    priority: "",
    status: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("userData");
    if (!isLoggedIn) {
      // If the user is logged in, redirect to the home page
      router1.push("/signin");
    } else {
      if (id) {
        setTask({
          title: "",
          description: "",
          dueDate: "",
          priority: "",
          status: "",
        });
        getItemById(
          id,
          (e) => {
            setTask(e && e[0]);
            setLoading(false);
          },
          (e: any) => {
            console.log(e);
          }
        );
      }
    }
  }, [id]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setTask((prevTask: any) => ({ ...prevTask, [name]: value }));
  };

  const handleStatusChange = () => {
    updateTask(
      id,
      { ...task, status: "completed" },
      (e) => {
        alert("Task updated successfully");
        setTask((prevTask: any) => ({
          ...prevTask,
          status: "Success",
        }));
      },
      (e) => console.log(e)
    );
  };

  const handleUpdate = async () => {
    updateTask(
      id,
      task,
      (e) => {
        alert("Task updated successfully");
      },
      (e) => console.log(e)
    );
  };

  if (!task) {
    return <p className="text-center">Task not found</p>;
  }
  const removeTask = () => {
    deleteTask(
      id,
      () => {
        alert("deleted successfully");
        router1.push("/task");
      },
      () => alert("some error occured")
    );
  };
  console.log(task);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
          <div className="flex justify-between">
            {" "}
            <h1 className="text-2xl font-semibold text-gray-800 mb-4">
              Task Details
            </h1>
            <div className="mb-4">
              <button
                onClick={removeTask}
                className={`px-4 py-2 rounded-lg bg-red-500 text-white`}
              >
                Delete
              </button>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={task.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Description</label>
            <textarea
              name="description"
              value={task.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={new Date(task.dueDate).toISOString().split("T")[0]}
              onChange={handleChange}
              min={new Date().toISOString().split("T")[0]}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Priority</label>
            <select
              name="priority"
              value={task.priority}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div className="mt-6 gap-5 items-center flex justify-center w-full">
            {task.status === "pending" ? (
              <div className="">
                <button
                  onClick={handleStatusChange}
                  className={`px-4 py-2 rounded-lg bg-green-500 text-white`}
                >
                  Mark as complete
                </button>
              </div>
            ) : (
              <p className="text-green-500">This task is marked as done</p>
            )}
            <button
              onClick={handleUpdate}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Update Task
            </button>
          </div>
        </div>
      )}
    </>
  );
};
export default TaskDetail;
