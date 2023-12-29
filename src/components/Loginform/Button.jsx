import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import PropTypes from "prop-types";

const avatars = [
  "https://i.pravatar.cc/300",
  // Add more avatar URLs as needed
];

const getRandomAvatar = () => {
  const randomIndex = Math.floor(Math.random() * avatars.length);
  return avatars[randomIndex];
};

const Button = ({ className, closeDropdown }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const [avatar, setAvatar] = useState(getRandomAvatar);

  const handleLogout = () => {
    Cookies.remove("authToken");
    window.location.href = "/";
  };

  const isLoggedIn = Cookies.get("authToken");

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleClick = () => {
    if (closeDropdown) {
      closeDropdown();
    }
    toggleDropdown();
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex items-center" ref={dropdownRef}>
      {isLoggedIn ? (
        <div className="relative inline-block">
          <button
            onClick={toggleDropdown}
            className={`rounded-full p-1 focus:outline-none ${className}`}
          >
            <img
              src={avatar}
              alt="User Avatar"
              className="rounded-full w-14 h-14"
            />
          </button>
          {showDropdown && (
            <div className="absolute right-0 mt-2 -mr-8 bg-white border rounded shadow-md md:-mr-0">
              <button
                onClick={handleLogout}
                className="block w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-200"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <>
          <Link to="/login">
            <button
              onClick={() => handleClick()}
              className={`px-6 py-2 rounded-lg mr-3 font-poppins hover:scale-110 ${className}`}
            >
              {isLoggedIn ? "Logout" : "Login"}
            </button>
          </Link>

          <Link to="/register">
            <button
              onClick={() => handleClick()}
              className="px-3 py-2 rounded-lg bg-[#E9E3FF] hover:scale-110 text-primary"
            >
              Sign up
            </button>
          </Link>
        </>
      )}
    </div>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  closeDropdown: PropTypes.func,
};

export default Button;
