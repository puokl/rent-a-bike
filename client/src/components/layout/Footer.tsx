import React from "react";

const Footer: React.FC = () => {
  let today = new Date();
  return (
    <footer className="py-3 mt-5 text-white bg-gray-900">
      <div className="container mx-auto">
        <div className="flex justify-center">
          <p className="text-center">
            &copy; {today.getFullYear()} Puok Rent-A-Bike
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
