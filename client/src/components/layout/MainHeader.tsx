import React from "react";

const MainHeader: React.FC = () => {
  return (
    <header className=" bg-stone-700">
      {/* <div className="absolute inset-0 opacity-50 bg-stone-500"></div> */}
      <div className="container px-4 py-16 mx-auto">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold text-white">
            Welcome to <span className="text-yellow-500">Puok Rent a Bike</span>
          </h1>
          <h4 className="text-lg text-gray-300">
            Experience the Best Bike Rental Services in Town
          </h4>
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
