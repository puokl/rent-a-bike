import React, { useState, ChangeEvent, FormEvent } from "react";
import { registerUser } from "../../utils/ApiFunctions";
import { Link } from "react-router-dom";

interface RegistrationState {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const Registration: React.FC = () => {
  const [registration, setRegistration] = useState<RegistrationState>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setRegistration({
      ...registration,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegistration = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    try {
      const result = await registerUser(registration);
      setSuccessMessage(result);
      setErrorMessage("");
      setRegistration({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });
    } catch (error: any) {
      setSuccessMessage("");
      setErrorMessage(`Registration error : ${error.message}`);
    }
    setTimeout(() => {
      setErrorMessage("");
      setSuccessMessage("");
    }, 5000);
  };

  return (
    <section className="flex items-start justify-center min-h-screen mt-10">
      <div className="w-full max-w-md px-4 py-8 bg-white rounded-md shadow-md">
        {errorMessage && (
          <p className="p-4 my-4 text-red-800 bg-red-100 border border-red-400 rounded-md">
            {errorMessage}
          </p>
        )}
        {successMessage && (
          <p className="p-4 my-4 text-green-800 bg-green-100 border border-green-400 rounded-md">
            {successMessage}
          </p>
        )}
        <h2 className="mb-8 text-xl font-bold text-center">Register</h2>
        <form onSubmit={handleRegistration} className="mx-3">
          <div className="mb-4">
            <label
              htmlFor="firstName"
              className="block mb-1 mr-2 text-sm font-medium text-gray-700"
            >
              First Name
            </label>
            <div className="col-sm-10">
              <input
                id="firstName"
                name="firstName"
                type="text"
                className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={registration.firstName}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="block mb-1 mr-2 text-sm font-medium text-gray-700"
            >
              Last Name
            </label>
            <div className="col-sm-10">
              <input
                id="lastName"
                name="lastName"
                type="text"
                className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={registration.lastName}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block mb-1 mr-2 text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <div className="col-sm-10">
              <input
                id="email"
                name="email"
                type="email"
                className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={registration.email}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block mb-1 mr-2 text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="col-sm-10">
              <input
                type="password"
                className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                id="password"
                name="password"
                value={registration.password}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="flex items-center justify-between mb-4">
            <button
              type="submit"
              className="px-4 py-2 font-medium text-white bg-blue-500 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Register
            </button>
            <span className="text-sm text-gray-500">
              Already have an account?{" "}
              <Link to={"/login"} className="hover:font-bold">
                Login
              </Link>
            </span>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Registration;
