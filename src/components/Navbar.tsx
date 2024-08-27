import { useRouter } from "next/navigation";
import React from "react";

const Navbar = () => {
  const isLoggedIn = localStorage.getItem("userData");

  const router = useRouter();
  return (
    <div className="h-16 px-3 flex gap-8 items-center justify-center text-white bg-black">
      <p
        className="hover:text-blue-500 cursor-pointer"
        onClick={() => router.push("/")}
      >
        Home
      </p>
      <p
        className="hover:text-blue-500 cursor-pointer"
        onClick={() => router.push("/task")}
      >
        All Tasks
      </p>
      {!isLoggedIn ? (
        <p
          className="hover:text-blue-500 cursor-pointer"
          onClick={() => router.push("/signin")}
        >
          Login
        </p>
      ) : (
        <p
          onClick={() => {
            localStorage.removeItem("userData");
            router.push("/signin");
          }}
          className="hover:text-blue-500 cursor-pointer"
        >
          Logout
        </p>
      )}
    </div>
  );
};

export default Navbar;
