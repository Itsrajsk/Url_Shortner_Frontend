import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import TextField from "./TextField";
import { Link, useNavigate, useLocation } from "react-router-dom";
import api from "../api/api";
import toast from "react-hot-toast";
import { useStoreContext } from "../context/ContextApi";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loader, setLoader] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { setToken } = useStoreContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      username: "", // Changed from email to username
      password: "",
    },
    mode: "onTouched",
  });

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, [isLoggedIn, navigate]);

  const onSubmit = async (data) => {
    setLoader(true);
    try {
      // The API call will now send an object with username and password
      const response = await api.post("/api/auth/public/login", data);
      localStorage.setItem("JWT_TOKEN", response.data.token);
      console.log("JWT_TOKEN : ", response.data.token);
      reset();
      toast.success("Login Successful!");
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Login failed:", error);
      toast.error(
        error.response?.data || "Invalid credentials. Please try again."
      );
    } finally {
      setLoader(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-[40rem] bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-md w-full space-y-8 bg-white p-10 rounded-3xl shadow-lg border border-gray-200"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div>
          <h2 className="text-center text-3xl font-bold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <Link
              to="/register"
              className="font-medium text-gray-900 hover:text-gray-700"
            >
              create a new account
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-6">
            <TextField
              id="username" // Changed id to username
              label="Username" // Changed label to Username
              type="text" // Changed type to text
              placeholder="Your Username" // Changed placeholder
              register={register}
              errors={errors}
              required
            />
            <TextField
              id="password"
              label="Password"
              type="password"
              placeholder="********"
              register={register}
              errors={errors}
              required
              min={6}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-full text-white bg-gray-900 hover:bg-gray-800 transition-colors duration-300 transform hover:scale-[1.01]"
              disabled={loader}
            >
              {loader ? "Logging in..." : "Sign In"}
            </button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
};

export default LoginPage;
