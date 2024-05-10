import React from "react";
import MainHeader from "../layout/MainHeader";
import Parallax from "../common/Parallax";
import { useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import RentalService from "../common/RentalService";
import BikeCarousel from "../common/BikeCarousel";
import BikeSearch from "../common/BikeSearch";

const Home: React.FC = () => {
  const location = useLocation();

  const message = location.state && location.state.message;
  const currentUser = localStorage.getItem("userId");

  return (
    <section>
      {message && <p className="px-5 text-warning">{message}</p>}
      {currentUser && (
        <h6 className="text-center text-success">
          {" "}
          You are logged-In as {currentUser}
        </h6>
      )}
      <MainHeader />
      <div className="container mx-auto">
        <BikeCarousel />
        <BikeSearch />
        <Parallax imageUrl="1.jpg" />
        <BikeCarousel />
        <RentalService />
        <Parallax imageUrl="2.jpg" />
        <BikeCarousel />
      </div>
    </section>
  );
};

export default Home;
