import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../../store/thunkFunctions";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// 네비게이션 항목들 (로그인, 회원가입, 마이페이지, 로그아웃)
const routes = [
  { to: "/login", name: "로그인", auth: false },
  { to: "/register", name: "회원가입", auth: false },
  { to: "/mypage", name: "마이페이지", auth: true },
  { to: "/", name: "로그아웃", auth: true },
];

const NavItem = ({ mobile }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 로그아웃 처리 함수
  const handleLogout = async () => {
    console.log("로그아웃 중...");
    try {
      await dispatch(logoutUser()).then(() => {
        navigate("/login"); // 로그인 페이지로 이동
        toast.info("로그아웃되었습니다.", { position: "top-center" }); // 로그아웃 알림
      }); // 로그아웃 후 상태 업데이트
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  // 현재 사용자 인증 상태
  const isAuth = useSelector((state) => state.user?.isAuth);

  return (
    <ul
      className={`text-md justify-center w-full flex gap-4 ${
        mobile ? "flex-col" : ""
      } bg-gray-900 h-full item-center`}
    >
      {/* 각 항목에 대한 렌더링 */}
      {routes.map(({ to, name, auth }) => {
        if (isAuth !== auth) return null; // 인증 상태에 맞는 항목만 표시

        if (name === "로그아웃") {
          // 로그아웃 항목
          return (
            <li
              key={name}
              className="py-2 text-center border-b-4 cursor-pointer"
            >
              <Link onClick={handleLogout}>{name}</Link>
            </li>
          );
        }

        // 로그인, 회원가입, 마이페이지 항목
        return (
          <li key={name} className="py-2 text-center border-b-4 cursor-pointer">
            <Link to={to}>{name}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NavItem;
