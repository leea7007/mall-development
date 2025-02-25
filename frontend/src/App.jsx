import React, { useState, useEffect } from "react"; // useState, useEffect 한 번에 임포트
import { Provider, useDispatch, useSelector } from "react-redux"; // useDispatch를 react-redux에서 함께 임포트
import { PersistGate } from "redux-persist/integration/react";
import { Routes, Route, Outlet, useLocation } from "react-router-dom"; // 필요한 것만 임포트
import store, { persistor } from "./store"; // store와 persistor를 따로 import
import Footer from "./layout/Footer";
import NavBar from "./layout/Navbar";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedPage from "./pages/ProtectedPage";
import CartPage from "./pages/CartPage";
import HistoryPage from "./pages/HistoryPage";
import DetailProductPage from "./pages/DetailProductPage";
import UploadProductPage from "./pages/UploadProductPage";
import { ToastContainer } from "react-toastify";
import { loginUser, registerUser } from "./_actions/user_actions"; // 액션 임포트
import "react-toastify/dist/ReactToastify.css"; // CSS 임포트
import { authUser } from "./store/thunkFunctions"; // authUser 액션 임포트
import ProtectedRoutes from "./components/ProtectedRoutes";
import NotAuthRoutes from "./components/NotAuthRoutes";

// function handleLogin() {
//   fetch("user/login", { method: "POST", credentials: "include" })
//     .then((res) => res.json())
//     .then((result) => console.log("로그인 결과:", result));
// }

function Layout({ data }) {
  return (
    <div className="flex flex-col h-screen justify-between">
      <NavBar />
      <main className="mb-auto w-10/12 max-w-4xl mx-auto">
        <Outlet />
      </main>
      <Footer />
      <div>
        <h1>백엔드 API 응답: {data ? JSON.stringify(data) : "로딩 중..."}</h1>
        <h1>
          로그인 상태 확인:{" "}
          {data && data.isLoggedIn ? "로그인됨" : "로그인되지 않음"}
        </h1>
      </div>
    </div>
  );
}

function App() {
  const dispatch = useDispatch(); // dispatch 훅 사용
  const [data, setData] = useState(null);
  const [loginError, setLoginError] = useState(null);
  const [registerError, setRegisterError] = useState(null);
  const isAuth = useSelector((state) => state.user?.isAuth);
  const { pathname } = useLocation();

  useEffect(() => {
    if (isAuth) {
      dispatch(authUser());
    }
  }, [dispatch]);

  // useEffect 훅 수정: 로그인 및 회원가입은 한 번만 실행되도록 수정
  useEffect(() => {
    // 로그인 요청 보내기 (로그인된 상태 체크)
    const dataToSubmit = { email: "", password: "" };
    dispatch(loginUser(dataToSubmit))
      .then((response) => {})
      .catch((error) => {
        console.error("로그인 오류:", error);
        setLoginError("로그인에 실패했습니다. 다시 시도해주세요.");
      });

    // 회원가입 요청 보내기 (실제 환경에서는 주석 처리 또는 제거해야 함)
    // const registerData = {
    //   email: "",
    //   password: "",
    //   firstName: "",
    //   lastName: "",
    // };
    // dispatch(registerUser(registerData))
    //   .then((response) => {
    //     console.log("회원가입 응답:", response);
    //   })
    //   .catch((error) => {
    //     console.error("회원가입 실패:", error);
    //     setRegisterError("회원가입에 실패했습니다. 다시 시도해주세요.");
    //   });

    // 테스트용 API 호출
    fetch("http://localhost:8080/user/test", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ test: "data" }),
      credentials: "include", // 쿠키를 포함하도록 설정
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("API 호출 오류: " + response.status);
        }
        return response.json();
      })
      .then((data) => setData(data))
      .catch((err) => {
        console.error("API 호출 오류:", err);
        setData(null);
      });
  }, []); // 빈 의존성 배열로 한 번만 실행되도록 설정

  return (
    <Provider store={store}>
      <ToastContainer
        position="bottom-right"
        theme="light"
        pauseOnHover
        autoClose={1500}
      />
      <PersistGate loading={null} persistor={persistor}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<LandingPage />} />
            <Route path="/cartpage" element={<CartPage />} />
            <Route path="/detailproduct" element={<DetailProductPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/product/upload" element={<UploadProductPage />} />
            <Route path="/product/:productId" element={<DetailProductPage />} />

            <Route element={<ProtectedRoutes />}>
              <Route path="/protected" element={<ProtectedPage />} />
            </Route>

            <Route element={<NotAuthRoutes />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Route>
          </Route>
        </Routes>
      </PersistGate>
    </Provider>
  );
}

export default App;
