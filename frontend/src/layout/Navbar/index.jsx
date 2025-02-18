import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../store/thunkFunctions";
import NavItem from "./Sections/NavItem";

const NavBar = () => {
  const isAuth = useSelector((state) => state.user?.isAuth);
  const [menu, setMenu] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleMenu = () => {
    setMenu(!menu);
  };

  const logout = () => {
    dispatch(logoutUser()); // 로그아웃 처리
    navigate("/login"); // 로그인 페이지로 리디렉션
  };



  return (
    // <div>
    //   NavBar
    //   {isAuth ? (
    //     <button onClick={logout}>로그아웃</button> // 로그인 상태일 때만 버튼 활성화
    //   ) : (
    //     <button disabled>로그인 필요</button> // 로그인 상태가 아닐 때 비활성화
    //   )}
    // </div>

    <section className="relativ z-10 text-white bg-gray-900">
      <div className="w-full">
        <div className="flex justify-between items-center sm:mx-10 lg:mx-20">
          {/* logo */}
          <div className="flex items-center text-2xl h-14">
            <Link to="/"> LOGO </Link>
          </div>
          <div className="text-2xl sm:hidden">
            <button onClick={handleMenu}> {menu ? "-" : "+"} </button>
          </div>

          {/* big screen */}
          <div className="hidden sm:block"></div>
          <NavItem />
        </div>
        <div className="block sm:hidden">{menu && <NavItem mobile/>}</div>
      </div>
    </section>
  );
};

export default NavBar;
