import "./index.css";
import { Routes, Route, Outlet } from "react-router-dom";
import Footer from "./layout/Footer";
import NavBar from "./layout/Navbar";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function Layout() {
  return (
    <div className="flex flex-col h-screen justify-between">
      <NavBar />
      <main className="mb-auto w-10/12 max-w-4xl mx-auto">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Routes>
      {/* 로그인과 상관없이 갈 수 있는 경로 */}
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
    </Routes>
  );
}

export default App;
