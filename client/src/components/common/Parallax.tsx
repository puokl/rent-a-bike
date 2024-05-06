import React from "react";

const Parallax: React.FC = () => {
  return (
    <div
      className="h-[70vh] mb-5 bg-fixed bg-center bg-no-repeat bg-cover"
      style={{ backgroundImage: "url('/images/parrall.jpg')" }}
    >
      <div className="container justify-center px-5 py-5 mx-auto text-center">
        <div className="animate__animated animate__bounceIn">
          <h1 className="mb-2 text-3xl font-bold">
            Experience the Best hospitality at{" "}
            <span className="text-yellow-500">Puok Rent A Bike</span>
          </h1>
          <h3 className="text-lg">
            We offer the best bikes for all your needs.
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Parallax;
