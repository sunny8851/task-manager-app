"use client";
import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, notification } from "antd";
import { useRouter } from "next/navigation";
import { SignupApi } from "@/api/auth";

const SignUP = () => {
  const router = useRouter();
  useEffect(() => {
    // Check if the user is logged in by inspecting localStorage
    // if (window.location.href !== "http://localhost:3000/") {
    const isLoggedIn = localStorage.getItem("userData");
    if (isLoggedIn) {
      // If the user is logged in, redirect to the home page
      router.push("/");
    }
    setIsLoading(false);
    // }
  }, []);
  const [isLoading, setIsLoading] = useState(true);
  const onSignUpSuccess = (e: any) => {
    console.log(e);
    setIsLoading(true);
    openNotification("Successfully created user! Please login again");
    setTimeout(() => {
      router.push("/signin");
    }, 2000);
  };
  const onSignUpFailure = (e: any) => {
    console.log(e);
    openNotification(e.response.data.message);
  };
  const onFinish = (values: any) => {
    console.log("Success:", values);
    const data = {
      name: values.name,
      password: values.password,
      email: values.email,
    };
    SignupApi(onSignUpSuccess, onSignUpFailure, data);
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (msg: string) => {
    api.info({
      message: msg,
    });
  };
  return (
    <div className="max-w-[500px] mt-64 w-full mx-auto">
      {contextHolder}
      <Form
        name="basic"
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 450,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your name!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <div className="mb-4 ml-10 flex justify-center">
          <button className="bg-blue-500 rounded px-3 py-1" type="submit">
            Create
          </button>
        </div>
      </Form>
      <p className="text-center">
        Already have a account!{" "}
        <span
          onClick={() => router.push("/signin")}
          className="text-blue-400 cursor-pointer"
        >
          Login
        </span>
      </p>
    </div>
  );
};
export default SignUP;
