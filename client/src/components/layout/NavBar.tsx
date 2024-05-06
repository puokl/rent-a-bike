import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import Logout from "../auth/Logout";

const NavBar: React.FC = () => {
  const [showAccount, setShowAccount] = useState(false);

  const handleAccountClick = () => {
    setShowAccount((prevShowAccount) => !prevShowAccount);
  };

  const isLoggedIn = localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole");

  return (
    <nav className="sticky top-0 mt-5 bg-gray-100 shadow">
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between py-2">
          <Link to={"/"} className="text-2xl font-bold text-gray-800">
            <span className="text-yellow-500">Puok Rent-A-Bike</span>
          </Link>

          <button
            className="block lg:hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-yellow-500"
            onClick={handleAccountClick}
          >
            <svg
              className="w-6 h-6 text-gray-800"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>

          <div
            className={` lg:flex lg:flex-grow lg:items-center lg:w-auto ${
              showAccount ? "" : "hidden"
            }`}
          >
            <ul className="flex flex-col lg:flex-row lg:gap-x-4">
              <li>
                <NavLink
                  className="block px-4 py-2 text-gray-800 hover:text-yellow-500"
                  // activeClassName="font-bold"
                  to={"/browse-all-bikes"}
                >
                  Browse all bikes
                </NavLink>
              </li>

              {isLoggedIn && userRole?.includes("ROLE_ADMIN") && (
                <li>
                  <NavLink
                    className="block px-4 py-2 text-gray-800 hover:text-yellow-500"
                    // activeClassName="font-bold"
                    to={"/admin"}
                  >
                    Admin
                  </NavLink>
                </li>
              )}
            </ul>

            <ul className="flex flex-col ml-auto lg:flex-row lg:gap-x-4">
              <li>
                <NavLink
                  className="block px-4 py-2 text-gray-800 hover:text-yellow-500"
                  //   activeClassName="font-bold"
                  to={"/find-booking"}
                >
                  Find my booking
                </NavLink>
              </li>
              <li>
                <div className="relative">
                  <button
                    className="block px-4 py-2 text-gray-800 hover:text-yellow-500"
                    onClick={handleAccountClick}
                  >
                    Account
                  </button>

                  <div
                    className={`absolute right-0 mt-2 w-48 bg-stone-100 rounded-lg shadow-lg z-100 ${
                      showAccount ? "" : "hidden"
                    }`}
                  >
                    {isLoggedIn ? (
                      <Logout handleAccountClick={handleAccountClick} />
                    ) : (
                      <NavLink
                        className="block px-4 py-2"
                        to={"/login"}
                        onClick={() => handleAccountClick()}
                      >
                        Login
                      </NavLink>
                    )}
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
