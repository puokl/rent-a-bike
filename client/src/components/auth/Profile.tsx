import React, { useEffect, useState } from "react";
import {
  deleteUser,
  getRentalsByUserId,
  getUser,
} from "../../utils/ApiFunctions";
import { useNavigate } from "react-router-dom";
import moment from "moment";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: { id: string; name: string }[];
}

interface Booking {
  id: string;
  room: { id: string; roomType: string };
  checkInDate: string;
  checkOutDate: string;
  bookingConfirmationCode: string;
}

const Profile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [message, setMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId")!;
  const token = localStorage.getItem("token")!;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser(userId, token);
        setUser(userData);
        console.log("userData", userData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, [userId, token]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        console.log("userId", userId);
        console.log("token", token);
        console.log("user", user);
        const response = await getRentalsByUserId(userId, token);
        setBookings(response);
        console.log("bookings", bookings);
      } catch (error: any) {
        console.error("Error fetching bookings:", error.message);
        setErrorMessage(error.message);
      }
    };

    fetchBookings();
  }, [userId, token]);

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (confirmed) {
      try {
        await deleteUser(userId!);
        setMessage("Account successfully deleted.");
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("userRole");
        navigate("/");
        window.location.reload();
      } catch (error: any) {
        setErrorMessage(error.message);
      }
    }
  };

  return (
    <div className="container mx-auto">
      {errorMessage && <p className="text-red-500 m-4">{errorMessage}</p>}{" "}
      {message && <p className="text-red-500 m-4">{message}</p>}
      {user ? (
        <div className="p-5 mt-5 bg-gray-100 rounded shadow-md">
          <h4 className="mb-4 text-xl font-bold text-center">
            User Information
          </h4>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
            <div className="flex items-center justify-center col-span-2">
              <img
                src="https://themindfulaimanifesto.org/wp-content/uploads/2020/09/male-placeholder-image.jpeg"
                alt="Profile"
                className="object-cover w-48 h-48 rounded-full"
              />
            </div>
            <div className="col-span-10">
              <div className="space-y-4">
                <div className="flex items-center">
                  <label className="mr-2 text-sm font-bold">ID:</label>
                  <p className="text-gray-700">{user.id}</p>
                </div>
                <hr className="border-gray-200" />
                {/* Separator line */}
                <div className="flex items-center">
                  <label className="mr-2 text-sm font-bold">First Name:</label>
                  <p className="text-gray-700">{user.firstName}</p>
                </div>
                <hr className="border-gray-200" />
                <div className="flex items-center">
                  <label className="mr-2 text-sm font-bold">Last Name:</label>
                  <p className="text-gray-700">{user.lastName}</p>
                </div>
                <hr className="border-gray-200" />
                <div className="flex items-center">
                  <label className="mr-2 text-sm font-bold">Email:</label>
                  <p className="text-gray-700">{user.email}</p>
                </div>
                <hr className="border-gray-200" />
                <div className="flex items-center">
                  <label className="mr-2 text-sm font-bold">Roles:</label>
                  <ul className="pl-4 list-disc">
                    {user.roles.map((role) => (
                      <li key={role.id} className="text-gray-700">
                        {role.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <hr className="mt-6 border-gray-400" />
          {/* <h4 className="my-4 text-xl font-bold text-center">
            User Information
          </h4> */}
          {/* <div className="grid grid-cols-1 gap-4 md:grid-cols-12"> */}
          <div>
            <h4 className="mt-8 mb-4 text-xl font-bold text-center">
              Booking History
            </h4>
            <div>
              {bookings.length > 0 ? (
                <div className="overflow-x-auto rounded-md shadow">
                  <table className="table w-full text-left table-bordered table-hover">
                    <thead>
                      <tr>
                        <th className="px-4 py-2 text-xs font-medium tracking-wider text-gray-500 uppercase">
                          Booking ID
                        </th>
                        <th className="px-4 py-2 text-xs font-medium tracking-wider text-gray-500 uppercase">
                          Room ID
                        </th>
                        <th className="px-4 py-2 text-xs font-medium tracking-wider text-gray-500 uppercase">
                          Room Type
                        </th>
                        <th className="px-4 py-2 text-xs font-medium tracking-wider text-gray-500 uppercase">
                          Check In Date
                        </th>
                        <th className="px-4 py-2 text-xs font-medium tracking-wider text-gray-500 uppercase">
                          Check Out Date
                        </th>
                        <th className="px-4 py-2 text-xs font-medium tracking-wider text-gray-500 uppercase">
                          Confirmation Code
                        </th>
                        <th className="px-4 py-2 text-xs font-medium tracking-wider text-gray-500 uppercase">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((booking, index) => (
                        <tr key={index} className="border-b hover:bg-gray-100">
                          <td className="px-4 py-4">{booking.id}</td>
                          <td className="px-4 py-4">{booking.room.id}</td>
                          <td className="px-4 py-4">{booking.room.roomType}</td>
                          <td className="px-4 py-4">
                            {moment(booking.checkInDate)
                              .subtract(1, "month")
                              .format("MMM Do, YYYY")}
                          </td>
                          <td className="px-4 py-4">
                            {moment(booking.checkOutDate)
                              .subtract(1, "month")
                              .format("MMM Do, YYYY")}
                          </td>
                          <td className="px-4 py-4">
                            {booking.bookingConfirmationCode}
                          </td>
                          <td className="px-4 py-4 text-green-500">On-going</td>{" "}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-center">
                  You have not made any bookings yet.
                </p>
              )}
            </div>
            <div className="flex justify-center mt-4">
              <div className="mx-2">
                <button className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                  Delete account
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="m-4">Loading user data...</p>
      )}
    </div>
  );
};

export default Profile;
