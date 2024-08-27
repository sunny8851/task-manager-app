"use client";
import { getAllItemsAvailable } from "@/api/tasks";
import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { toast } from "react-toastify";
import "chart.js/auto";
import { useRouter } from "next/navigation";
import Loader from "../Loader";
import Navbar from "../Navbar";

const TaskDashboard = () => {
  const [tasks, setTask] = useState([0, 0, 0]);
  const [tasksAvailable, setTasksAvailable] = useState(false);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [upcomingTasks, setUpcomingTask] = useState([0, 0, 0]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("userData");
    if (!isLoggedIn) {
      router.push("/signin");
    } else {
      getAllItemsAvailable(
        (e: any) => {
          setLoading(false);
          setTask([0, 0, 0]);
          const upcomingTasks = e
            .filter((task: any) => {
              const dueDate = new Date(task.dueDate);
              const today = new Date();
              return dueDate >= today;
            })
            .sort(
              (a: any, b: any) =>
                new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
            );
          setUpcomingTask(upcomingTasks);
          let x = 0;
          e.forEach((item: any) => {
            if (item.status === "completed") {
              x++;
            }
            setTask((prevTasks) => {
              const updatedTasks = [...prevTasks];
              if (item.priority === "Medium") {
                updatedTasks[1] += 1;
              } else if (item.priority === "High") {
                updatedTasks[0] += 1;
              } else {
                updatedTasks[2] += 1;
              }
              return updatedTasks;
            });
          });
          console.log(x);
          e.length > 0 && setCompletedTasks((x / e.length) * 100);
          e.length > 0 && setTasksAvailable(true);
        },
        (e) => {
          toast.error("Error while fetching task");
        }
      );
    }
  }, []);
  const taskPriorityOptions = {
    responsive: true,
    plugins: { title: { display: true, text: "Task priority" } },
  };
  const taskPriorirtyData = {
    labels: ["High", "Medium", "Low"],
    datasets: [
      {
        label: "# of Votes",
        data: tasks,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  console.log(completedTasks);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="w-full">
          <Navbar />
          {tasksAvailable ? (
            <div className="h-[calc(100vh-64px)] overflow-auto w-full">
              <div className="max-w-5xl w-full  mx-auto p-6 bg-white rounded-lg shadow-lg">
                <h1 className="text-4xl py-4 text-center font-extrabold text-gray-800">
                  Task Analysis
                </h1>

                <div className="flex flex-col pb-5 lg:flex-row gap-8 items-start">
                  {/* Pie Chart Section */}
                  <div className="flex-shrink-0 lg:w-1/2 w-full">
                    <Pie
                      className="w-full max-h-[400px]"
                      options={taskPriorityOptions}
                      data={taskPriorirtyData}
                    />
                  </div>

                  {/* Upcoming Deadlines Section */}
                  <div className="flex-grow max-h-[400px] overflow-y-auto bg-gray-50 p-6 rounded-lg border border-gray-200 shadow-sm">
                    <h2 className="text-3xl font-bold text-gray-700 mb-4">
                      Upcoming Deadlines
                    </h2>
                    {upcomingTasks.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {upcomingTasks.map(
                          (task: any) =>
                            task.status != "completed" && (
                              <div
                                key={task._id}
                                className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-lg transition-shadow duration-300"
                              >
                                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                                  {task.title}
                                </h3>
                                <p className="text-base text-gray-600 mb-4">
                                  {task.description}
                                </p>
                                <div className="flex justify-between items-center">
                                  <div className="text-sm text-gray-500">
                                    <span className="font-medium">
                                      Due Date:
                                    </span>{" "}
                                    {new Date(
                                      task.dueDate
                                    ).toLocaleDateString()}
                                  </div>
                                  <div
                                    className={`text-xs font-bold py-1 px-3 rounded-full ${
                                      task.priority === "High"
                                        ? "bg-red-100 text-red-600"
                                        : task.priority === "Medium"
                                        ? "bg-yellow-100 text-yellow-600"
                                        : "bg-green-100 text-green-600"
                                    }`}
                                  >
                                    {task.priority}
                                  </div>
                                </div>
                              </div>
                            )
                        )}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-lg">
                        No upcoming deadlines.
                      </p>
                    )}
                  </div>
                </div>
                <hr />
                {/* task progress */}
                <div className="w-full  overflow-hidden">
                  <h1 className="text-2xl text-center my-5 font-semibold mb-2">
                    Task Progress ({Math.trunc(completedTasks)}%)
                  </h1>
                  <div className="relative w-full h-8 bg-gray-300 rounded-full overflow-hidden">
                    <div
                      className="absolute left-0 top-0 h-full bg-green-500 rounded-full text-center text-white flex items-center justify-center font-bold"
                      style={{ width: `${Math.trunc(completedTasks)}%` }}
                    >
                      {/* {completedTasks && Math.trunc(completedTasks)}% */}
                    </div>
                    <div
                      className="absolute right-0 top-0 h-full bg-gray-300"
                      style={{ width: `${100 - Math.trunc(completedTasks)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // when no task is available
            <div className="pt-10 w-full">
              <p className="text-center text-3xl ">
                No tasks available! Please add tasks to get their analysis
                details
              </p>
              <div className="w-full mt-5 justify-center flex">
                <button
                  onClick={() => router.push("/task/create")}
                  className="bg-blue-400 text-white rounded px-3 py-1"
                >
                  Create +
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default TaskDashboard;
