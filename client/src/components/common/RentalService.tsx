import React from "react";
import Header from "./Header";
import {
  FaBicycle,
  // FaHelmet,
  FaMapMarkerAlt,
  FaTools,
  FaLock,
  // FaRepairing,
  FaShower,
  FaMap,
  FaPhoneAlt,
} from "react-icons/fa";
import { GiFullMotorcycleHelmet } from "react-icons/gi";
import { GiAutoRepair, GiPathDistance } from "react-icons/gi";

const RentalService: React.FC = () => {
  return (
    <>
      <div className="mb-2 border border-green-600">
        <Header title={"Our Services"} />

        <div className="my-4 text-center">
          <h4>
            Services at{" "}
            <span className="text-yellow-500"> Your Bike Rental</span>
          </h4>
          <span className="pb-4">
            <FaMapMarkerAlt className="inline-block" /> Convenient Locations
          </span>
        </div>
        <hr />

        <div className="grid grid-cols-1 gap-4 mt-2 md:grid-cols-2 lg:grid-cols-3">
          <div className="border rounded-lg shadow-lg">
            <div className="p-4">
              <h5 className="flex items-center text-xl rent-color">
                <FaBicycle className="mr-2" /> Bike Rental
              </h5>
              <p>Rent high-quality bikes for your adventure.</p>
            </div>
          </div>
          <div className="border rounded-lg shadow-lg">
            <div className="p-4">
              <h5 className="flex items-center text-xl rent-color">
                <GiFullMotorcycleHelmet className="mr-2" /> Safety Gear
              </h5>
              <p>Stay safe with our range of helmets and protective gear.</p>
            </div>
          </div>
          <div className="border rounded-lg shadow-lg">
            <div className="p-4">
              <h5 className="flex items-center text-xl rent-color">
                <FaTools className="mr-2" /> Maintenance
              </h5>
              <p>
                Keep your bike in top condition with our maintenance services.
              </p>
            </div>
          </div>
          <div className="border rounded-lg shadow-lg">
            <div className="p-4">
              <h5 className="flex items-center text-xl rent-color">
                <FaLock className="mr-2" /> Secure Locks
              </h5>
              <p>Keep your bike safe with our reliable lock systems.</p>
            </div>
          </div>
          <div className="border rounded-lg shadow-lg">
            <div className="p-4">
              <h5 className="flex items-center text-xl rent-color">
                <GiAutoRepair className="mr-2" /> On-Site Repairs
              </h5>
              <p>
                Get your bike fixed quickly with our on-site repair services.
              </p>
            </div>
          </div>
          <div className="border rounded-lg shadow-lg">
            <div className="p-4">
              <h5 className="flex items-center text-xl rent-color">
                <FaShower className="mr-2" /> Shower Facilities
              </h5>
              <p>
                Freshen up after your ride with our convenient shower
                facilities.
              </p>
            </div>
          </div>
          <div className="border rounded-lg shadow-lg">
            <div className="p-4">
              <h5 className="flex items-center text-xl rent-color">
                <GiPathDistance className="mr-2" /> Guided Routes
              </h5>
              <p>Explore scenic routes with our experienced guides.</p>
            </div>
          </div>
          <div className="border rounded-lg shadow-lg">
            <div className="p-4">
              <h5 className="flex items-center text-xl rent-color">
                <FaLock className="mr-2" /> Bike Locks and Security
              </h5>
              <p>
                Provide high-quality bike locks for rent to ensure the safety of
                rented bikes when customers need to make stops during their
                rides.
              </p>
            </div>
          </div>
          <div className="border rounded-lg shadow-lg">
            <div className="p-4">
              <h5 className="flex items-center text-xl rent-color">
                <FaMapMarkerAlt className="mr-2" /> GPS Navigation
              </h5>
              <p>
                Provide GPS devices or smartphone apps with pre-loaded cycling
                routes and maps to help customers navigate unfamiliar areas
                easily and safely.
              </p>
            </div>
          </div>
          <div className="border rounded-lg shadow-lg">
            <div className="p-4">
              <h5 className="flex items-center text-xl rent-color">
                <FaMap className="mr-2" /> Guided Tours
              </h5>
              <p>
                Offer guided bike tours led by experienced local guides who can
                provide insights into the area's history, culture, and
                attractions.
              </p>
            </div>
          </div>
          <div className="border rounded-lg shadow-lg">
            <div className="p-4">
              <h5 className="flex items-center text-xl rent-color">
                <FaTools className="mr-2" /> Bike Maintenance Workshops
              </h5>
              <p>
                Organize workshops where customers can learn basic bike
                maintenance skills such as fixing a flat tire, adjusting gears,
                and performing routine bike maintenance.
              </p>
            </div>
          </div>
          <div className="border rounded-lg shadow-lg">
            <div className="p-4">
              <h5 className="flex items-center text-xl rent-color">
                <FaPhoneAlt className="mr-2" /> Emergency Assistance Service
              </h5>
              <p>
                Offer a 24/7 emergency assistance service where customers can
                call for help if they encounter any issues with their rental
                bikes.
              </p>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </>
  );
};

export default RentalService;
