import React from "react";
import { Link } from "react-router-dom";

const Admin: React.FC = () => {
  return (
    <section className="container m-6">
      <h2 className="mb-4 text-2xl font-bold">Welcome to Admin Panel</h2>
      <hr className="mb-4" />
      <Link
        to={"/existing-bikes"}
        className="block mb-2 text-lg text-blue-500 hover:underline"
      >
        Manage Bikes
      </Link>
      <Link
        to={"/existing-bookings"}
        className="block text-lg text-blue-500 hover:underline"
      >
        Manage Bookings
      </Link>
    </section>
  );
};

export default Admin;
