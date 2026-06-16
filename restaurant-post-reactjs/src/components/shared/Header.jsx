import React, { useState, useEffect } from "react";
import { FaSearch, FaBell, FaUserCircle, FaSun, FaMoon } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { logout } from "../../api/endpoints";
import { removeUser } from "../../redux/slices/userSlice";
import logo from "../../assets/images/logo.png";

const Header = () => {
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Dark/Light Theme Switcher State & Effect
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    if (theme === "light") {
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const logoutMutation = useMutation({
    mutationFn: () => logout(),
    onSuccess: (data) => {
      console.log(data);
      dispatch(removeUser());
      navigate("/auth");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <header className="flex justify-between items-center py-4 px-4 md:px-8 bg-bg-secondary border-b border-border-color text-text-primary shrink-0">
      {/* LOGO */}
      <div className="flex items-center gap-2">
        <img src={logo} className="h-8 w-8" alt="res logo" />
        <h1 className="text-lg font-bold tracking-wider hidden sm:block">Restro</h1>
      </div>

      {/* SEARCH */}
      <div className="flex items-center gap-2 bg-bg-input rounded-[15px] px-3 md:px-5 py-2 w-full max-w-[180px] sm:max-w-[300px] md:max-w-[400px] lg:max-w-[500px]">
        <FaSearch className="text-text-primary shrink-0 text-sm" />
        <input
          type="text"
          placeholder="Search"
          className="bg-transparent outline-none text-text-primary text-sm w-full placeholder-text-secondary"
        />
      </div>

      {/* LOOGGED USER DETAILS */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="bg-bg-input hover:bg-bg-card-hover rounded-[15px] p-2 md:p-3 cursor-pointer text-text-primary transition-all duration-150 flex items-center justify-center"
          title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {theme === "dark" ? (
            <FaSun className="text-yellow-400 text-lg md:text-xl" />
          ) : (
            <FaMoon className="text-blue-500 text-lg md:text-xl" />
          )}
        </button>

        <div className="bg-bg-input rounded-[15px] p-2 md:p-3 cursor-pointer text-text-primary hover:bg-bg-card-hover transition-colors flex items-center justify-center">
          <FaBell className="text-text-primary text-lg md:text-xl" />
        </div>

        <div className="flex items-center gap-2 cursor-pointer">
          <FaUserCircle className="text-text-primary text-3xl md:text-4xl shrink-0" />
          <div className="hidden sm:flex flex-col items-start">
            <h1 className="text-sm text-text-primary font-semibold truncate max-w-[80px] md:max-w-[120px]">
              {userData.name || "Unknown"}
            </h1>
            <p className="text-xs text-text-secondary font-medium">
              {userData.role || "Role"}
            </p>
          </div>
        </div>

        <IoLogOut
          onClick={handleLogout}
          className="text-text-primary ml-1 md:ml-2 cursor-pointer hover:text-red-500 transition-colors shrink-0 text-2xl md:text-3xl"
          size={32}
        />
      </div>
    </header>
  );
};

export default Header;
