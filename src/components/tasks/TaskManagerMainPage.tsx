"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { getAllItemsAvailable } from "@/api/tasks";
import Loader from "../Loader";
import Navbar from "../Navbar";

const TaskList = () => {
  const router = useRouter();
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("userData");
    if (!isLoggedIn) {
      router.push("/signin");
    } else {
      getAllItemsAvailable(
        (e: any) => {
          setLoading(false);
          setTasks(e);
          setFilteredTasks(e); // Initialize filteredTasks with all tasks
        },
        (e) => {
          toast.success("Error while fetching task");
        }
      );
    }
  }, []);

  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = tasks.filter(
      (task: any) =>
        task.title.toLowerCase().includes(lowercasedQuery) ||
        task.description.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredTasks(filtered);
  }, [searchQuery, tasks]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="">
          <Navbar />
          <div className="px-6 py-4">
            {/* search tasks by title or description*/}
            <input
              type="text"
              placeholder="Search tasks by title or description"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            />
            {/* list of all tasks */}
            <div className="h-[calc(100vh-128px)] overflow-auto">
              <table className="min-w-full bg-white border border-gray-300 rounded-lg">
                <thead>
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-600 bg-gray-100">
                      Title
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-600 bg-gray-100">
                      Description
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-600 bg-gray-100">
                      Due Date
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-600 bg-gray-100">
                      Priority
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-600 bg-gray-100">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-600 bg-gray-100">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTasks.map((task: any) => (
                    <tr key={task._id} className="border-t border-gray-300">
                      <td className="px-6 py-4 text-gray-800">{task.title}</td>
                      <td className="px-6 py-4 text-gray-600">
                        {task.description}
                      </td>
                      <td className="px-6 py-4 text-gray-500">
                        {new Date(task.dueDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-gray-500">
                        {task.priority}
                      </td>
                      <td
                        className={`px-6 py-4 ${
                          task.status === "pending"
                            ? "text-yellow-400"
                            : "text-green-500"
                        }`}
                      >
                        {task.status}
                      </td>
                      <td className="px-6 py-4 text-blue-600 hover:underline cursor-pointer">
                        <span onClick={() => router.push(`/task/${task._id}`)}>
                          Edit
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredTasks.length === 0 && (
                <div className="text-center py-6 text-gray-600">
                  No tasks found.
                </div>
              )}
              <div
                onClick={() => router.push("/task/create")}
                className="flex w-full justify-center mt-5"
              >
                <button className="bg-blue-500 text-white px-5 py-2 rounded">
                  Add new task
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskList;
