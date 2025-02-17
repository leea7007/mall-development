import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { loginUser } from "../../store/thunkFunctions";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "onChange" });

  const dispatch = useDispatch();
  //   try {
  //     const result = await axios.post(
  //       "http://localhost:8080/user/login",
  //       body
  //     );
  //     console.log("✅ [로그인 성공] 응답 데이터:", result);
  //   } catch (error) {
  //     console.error("❌ [로그인 실패] 에러 메시지:", error);
  //   }

  //   console.log("🔄 [입력 폼 초기화]");
  //   reset();
  // };

  const onSubmit = async ({ email, password }) => {
    console.log("🚀 [로그인 요청 시작]");
    const body = { email, password };
    console.log("📩 입력된 데이터:", body);
    dispatch(loginUser(body));
  };

  return (
    <section className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold text-center">Login</h1>

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
              Login
            </button>
          </div>

          <div className="mt-4 text-center">
            <p className="text-sm">
              If you forgot your password{" "}
              <a href="/find" className="text-blue-500 hover:underline">
                find
              </a>
            </p>
            <p className="text-sm">
              If you don't have an account{" "}
              <a href="/register" className="text-blue-500 hover:underline">
                register
              </a>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
