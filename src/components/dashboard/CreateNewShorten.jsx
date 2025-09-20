import React, { useState } from "react";
import { useStoreContext } from "../../context/ContextApi";
import { set, useForm } from "react-hook-form";
import TextField from "../TextField";
import Tooltip from "@mui/material/Tooltip";
import { RxCross2 } from "react-icons/rx";
import { FaSpinner } from "react-icons/fa";
import api from "../../api/api";
import toast from "react-hot-toast";

const CreateNewShorten = ({ setOpen, refetch }) => {
  const { token } = useStoreContext();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      originalUrl: "",
    },
    mode: "onTouched",
  });

  const createShortUrlHandler = async (data) => {
    setLoading(true);
    try {
      const { data: res } = await api.post("/api/urls/shorten", data, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      });

      const shortenUrl = `${import.meta.env.VITE_REACT_SUBDOMAIN}/${
        res.shortUrl
      }`;
      console.log("API Response:", res);
      console.log("Generated Short URL:", shortenUrl);

      navigator.clipboard.writeText(shortenUrl).then(() => {
        toast.success("Short URL Copied to Clipboard");
      });
      // await refetch();
      reset();
      setOpen(false);
    } catch (error) {
      toast.error("Create ShortUrl Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center p-4">
      <form
        onSubmit={handleSubmit(createShortUrlHandler)}
        className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8 space-y-6 relative"
      >
        <div className="flex justify-between items-center pb-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900 mr-20">
            Create New Shorten URL
          </h1>
          <Tooltip title="close">
            <button
              type="button"
              disabled={loading}
              onClick={() => setOpen(false)}
              className="text-gray-600 hover:text-gray-900 transition-colors duration-300"
            >
              <RxCross2 className="text-2xl" />
            </button>
          </Tooltip>
        </div>

        <div className="space-y-4">
          <TextField
            label="Enter URL"
            required
            id="originalUrl"
            placeholder="https://www.example.com"
            type="url"
            message="Url is required"
            register={register}
            errors={errors}
          />
        </div>

        {/* Consistent button styling with Navbar's "Get Started" button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-full font-semibold text-white transition-colors duration-300
          ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-gray-900 hover:bg-gray-800"
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center space-x-2">
              <FaSpinner className="animate-spin text-xl" />
              <span>Creating...</span>
            </span>
          ) : (
            "Create Short URL"
          )}
        </button>
      </form>
    </div>
  );
};

export default CreateNewShorten;
