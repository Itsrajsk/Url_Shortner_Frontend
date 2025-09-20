import React from "react";

const TextField = ({
  label,
  id,
  type,
  errors,
  register,
  required,
  message,
  className,
  min,
  placeholder,
}) => {
  // Define validation rules for React Hook Form
  const validationRules = {
    required: required
      ? { value: true, message: message || "This field is required" }
      : false,
    minLength: min
      ? { value: min, message: `Minimum ${min} characters are required` }
      : false,
    // Add pattern validation for specific types
    ...(type === "email" && {
      pattern: {
        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: "Invalid email address",
      },
    }),
    ...(type === "url" && {
      pattern: {
        value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i,
        message: "Invalid URL",
      },
    }),
  };

  return (
    <div className="flex flex-col gap-1">
      {/* Label */}
      {label && (
        <label
          htmlFor={id}
          className={`${
            className ? className : ""
          } font-semibold text-gray-900 text-md`}
        >
          {label}
        </label>
      )}

      {/* Input Field */}
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        className={`
          px-4 py-3 border border-gray-300 outline-none rounded-md bg-white text-gray-900
          transition-all duration-300
          focus:border-gray-900 focus:ring-1 focus:ring-gray-900
          ${errors[id]?.message ? "border-red-500" : "border-gray-300"}
        `}
        {...register(id, validationRules)}
      />

      {/* Error Message */}
      {errors[id]?.message && (
        <p className="text-sm font-semibold text-red-600 mt-1">
          {errors[id].message}
        </p>
      )}
    </div>
  );
};

export default TextField;
