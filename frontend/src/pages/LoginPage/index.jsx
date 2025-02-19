import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/thunkFunctions";
import { useNavigate } from "react-router-dom";
import { updateValue } from "../../store/userSlice";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const value = useSelector((state) => state.user.value);
  const userData = useSelector((state) => state.user.userData); // Redux에서 userData 가져오기
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async ({ email, password }) => {
    console.log("🚀 [로그인 요청 시작]");
    const body = { email, password };

    try {
      // 로그인 요청을 dispatch로 보내고, 그 결과를 받아옴
      const result = await dispatch(loginUser(body));

      // 로그인 성공 여부 확인
      if (result.payload?.loginSuccess) {
        // 로그인 성공 시 홈 페이지로 리다이렉트
        navigate("/");
      } else {
        console.error("❌ [로그인 실패] loginSuccess가 false이거나 응답 없음");
      }
    } catch (error) {
      console.error("❌ [로그인 실패] 에러 메시지:", error);
    }
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

            {/* test */}
            <div className="p-4">
              <h1 className="text-xl font-bold mb-2">현재 값: {value}</h1>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded"
                onClick={() => dispatch(updateValue("업데이트된 값"))}
              >
                업데이트
              </button>
            </div>
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
