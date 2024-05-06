import React, { useState } from "react";
import { loginUser } from "../../utils/ApiFunctions";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const Login: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const auth = useAuth();
  const location = useLocation();
  const redirectUrl = location.state?.path || "/";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const success = await loginUser(login);
    if (success) {
      const token = success.token;
      auth.handleLogin(token);
      navigate(redirectUrl, { replace: true });
    } else {
      setErrorMessage("Invalid username or password. Please try again.");
    }
    setTimeout(() => {
      setErrorMessage("");
    }, 4000);
  };

  return (
    <section className="flex items-start justify-center min-h-screen mt-10">
      <div className="w-full max-w-md px-4 py-8 bg-white rounded-md shadow-md">
        {errorMessage && (
          <p className="p-4 my-4 text-red-800 bg-red-100 border border-red-400 rounded-md">
            {errorMessage}
          </p>
        )}
        <h2 className="mb-8 text-xl font-bold text-center">Login</h2>
        <form onSubmit={handleSubmit} className="mx-3">
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-1 mr-2 text-sm font-medium text-gray-70"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={login.email}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-1 mr-2 text-sm font-medium text-gray-700 "
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={login.password}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex items-center justify-between mb-4">
            <button
              type="submit"
              className="px-4 py-2 font-medium text-white bg-blue-500 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Login
            </button>
            <span className="text-sm text-gray-500">
              Don't have an account yet?{" "}
              <Link to={"/register"} className="hover:font-bold">
                Register
              </Link>
            </span>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
