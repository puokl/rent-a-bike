import React from "react";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header
      className="relative header"
      style={{
        backgroundImage: "url('/images/service-bike.jpeg')",
        height: "150px",
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
    >
      <div className="overlay"></div>
      <div className="container">
        <h1 className="text-4xl text-center text-white">{title}</h1>
      </div>
    </header>
  );
};

export default Header;
