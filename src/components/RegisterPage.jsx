// RegisterPage.jsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import TextField from "./TextField";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import toast from "react-hot-toast";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    mode: "onTouched",
  });

  const onSubmit = async (data) => {
    setLoader(true);
    try {
      const { data: response } = await api.post(
        "/api/auth/public/register",
        data
      );
      reset();
      navigate("/login");
      toast.success("Registration successful! Please log in.");
    } catch (error) {
      console.log(error);
      // Remove this line to prevent the extra toast message on failure
      // toast.error("Registration Failed!");
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
          <h2 className=" text-center text-3xl font-bold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <Link
              to="/login"
              className="font-medium text-gray-900 hover:text-gray-700"
            >
              sign in to your existing account
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-6">
            <TextField
              id="username"
              label="Username"
              type="text"
              placeholder="Your Username"
              register={register}
              errors={errors}
              required
              min={3}
            />
            <TextField
              id="email"
              label="Email address"
              type="email"
              placeholder="you@example.com"
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
            >
              Register
            </button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
