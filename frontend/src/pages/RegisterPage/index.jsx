import React from "react";
import { useForm } from "react-hook-form";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }, 
    reset,
  } = useForm({ mode: "onChange" });

  const onSubmit = async ({ email, password, firstName, lastName }) => {
    console.log("Submitted:", { email, password, firstName, lastName });
    reset();
  };

  return (
    <section className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold text-center">Register</h1>

        <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
          {/* 이메일 입력 */}
          <div className="mb-2">
            <label htmlFor="email" className="text-sm font-semibold">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter email"
              id="email"
              {...register("email", { required: "Email is required" })}
              className="w-full px-4 py-2 mt-2 bg-white border rounded-md"
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email.message}</p>
            )}
          </div>

          {/* 이름 입력 (First Name) */}
          <div className="mb-2">
            <label htmlFor="firstName" className="text-sm font-semibold">
              First Name
            </label>
            <input
              type="text"
              placeholder="Enter first name"
              id="firstName"
              {...register("firstName", { required: "First name is required" })}
              className="w-full px-4 py-2 mt-2 bg-white border rounded-md"
            />
            {errors.firstName && (
              <p className="text-red-500 text-xs">{errors.firstName.message}</p>
            )}
          </div>

          {/* 성 입력 (Last Name) */}
          <div className="mb-2">
            <label htmlFor="lastName" className="text-sm font-semibold">
              Last Name
            </label>
            <input
              type="text"
              placeholder="Enter last name"
              id="lastName"
              {...register("lastName", { required: "Last name is required" })}
              className="w-full px-4 py-2 mt-2 bg-white border rounded-md"
            />
            {errors.lastName && (
              <p className="text-red-500 text-xs">{errors.lastName.message}</p>
            )}
          </div>

          {/* 비밀번호 입력 */}
          <div className="mb-2">
            <label htmlFor="password" className="text-sm font-semibold">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter password"
              id="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 5,
                  message: "Password must have at least 5 characters",
                },
              })}
              className="w-full px-4 py-2 mt-2 bg-white border rounded-md"
            />
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password.message}</p>
            )}
          </div>

          <div className="mt-4">
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
              Register
            </button>
          </div>

          <div className="mt-4 text-center">
            <p className="text-sm">
              If you have an ID already{" "}
              <a href="/login" className="text-blue-500 hover:underline">
                Login
              </a>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default RegisterPage;
