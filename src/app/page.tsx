import React, { useEffect } from "react";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import TaskDashboard from "@/components/tasks/TaskDashboard";
const page = () => {
  return (
    <div className="  ">
      <ToastContainer newestOnTop autoClose={5000} theme="dark" />
      <TaskDashboard />
    </div>
  );
};

export default page;
