import React, { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { Link, useNavigate } from "react-router-dom";

interface Props {
  handleAccountClick: () => void;
}

const Logout: React.FC<Props> = ({ handleAccountClick }) => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.handleLogout();
    handleAccountClick();
    navigate("/", { state: { message: "You have been logged out!" } });
  };

  return (
    <div className="py-1 pl-2">
      <div>
        <Link
          className="text-gray-600 hover:text-sky-500"
          to={"/profile"}
          onClick={() => handleAccountClick()}
        >
          Profile
        </Link>
      </div>
      <div>
        <hr className="border-b border-gray-200" />
      </div>
      <button
        className="text-gray-600 hover:text-sky-500"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;
