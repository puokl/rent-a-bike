import React, { useState } from "react";
import moment from "moment";
import {
  cancelRental,
  getRentalByConfirmationCode,
} from "../../utils/ApiFunctions";

interface BookingInfo {
  id: string;
  bookingConfirmationCode: string;
  bike: {
    id: string;
    bikeType: string;
  };
  bikeNumber: string;
  checkInDate: string;
  checkOutDate: string;
  guestName: string;
  guestEmail: string;
  numOfAdults: string;
  numOfChildren: string;
  totalNumOfGuests: string;
}

const emptyBookingInfo: BookingInfo = {
  id: "",
  bookingConfirmationCode: "",
  bike: { id: "", bikeType: "" },
  bikeNumber: "",
  checkInDate: "",
  checkOutDate: "",
  guestName: "",
  guestEmail: "",
  numOfAdults: "",
  numOfChildren: "",
  totalNumOfGuests: "",
};

const FindBooking: React.FC = () => {
  const [confirmationCode, setConfirmationCode] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [bookingInfo, setBookingInfo] = useState<BookingInfo>(emptyBookingInfo);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmationCode(event.target.value);
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const data = await getRentalByConfirmationCode(confirmationCode);
      setBookingInfo(data);
      setError(null);
    } catch (error: any) {
      setBookingInfo(emptyBookingInfo);
      if (error.response && error.response.status === 404) {
        setError(error.response.data.message);
      } else {
        setError(error.message);
      }
    }

    setTimeout(() => setIsLoading(false), 2000);
  };

  const handleBookingCancellation = async (bookingId: string) => {
    try {
      await cancelRental(bookingInfo.id);
      setIsDeleted(true);
      setSuccessMessage("Booking has been cancelled successfully!");
      setBookingInfo(emptyBookingInfo);
      setConfirmationCode("");
      setError(null);
    } catch (error: any) {
      setError(error.message);
    }
    setTimeout(() => {
      setSuccessMessage("");
      setIsDeleted(false);
    }, 2000);
  };

  return (
    <>
      <div className="container flex flex-col items-center mt-5">
        <h2 className="mb-4 text-xl font-bold text-center">Find My Booking</h2>
        <form onSubmit={handleFormSubmit} className="w-full md:w-1/2">
          <div className="flex items-center border border-black rounded-md">
            <input
              className="w-full p-1 mx-auto form-input"
              type="text"
              id="confirmationCode"
              name="confirmationCode"
              value={confirmationCode}
              onChange={handleInputChange}
              placeholder="Enter the booking confirmation code"
            />
            <button type="submit" className="w-[200px] p-1 bg-red-200  ">
              Find booking
            </button>
          </div>
        </form>

        {isLoading ? (
          <div>Finding your booking...</div>
        ) : error ? (
          <div className="text-red-500">Error: {error}</div>
        ) : bookingInfo.bookingConfirmationCode ? (
          <div className="w-full mt-4 mb-5 border md:w-1/2 border-slate-800">
            <div className="mx-auto">
              <h2 className="mb-4 text-xl font-bold">Booking Information</h2>
              <div className="grid w-1/2 grid-cols-2 bg-red-100 ">
                <p className="mb-2 font-semibold">Confirmation Code:</p>
                <p className="mb-2 ">{bookingInfo.bookingConfirmationCode}</p>
                <p className="mb-2 font-semibold">Room Number:</p>
                <p className="mb-2">{bookingInfo.bike.id}</p>
                <p className="mb-2 font-semibold">Room Type:</p>
                <p className="mb-2">{bookingInfo.bike.bikeType}</p>
                <p className="mb-2 font-semibold">Check-in Date:</p>
                <p className="mb-2">
                  {moment(bookingInfo.checkInDate)
                    .subtract(1, "month")
                    .format("MMM Do, YYYY")}
                </p>
                <p className="mb-2 font-semibold">Check-out Date:</p>
                <p className="mb-2">
                  {moment(bookingInfo.checkOutDate)
                    .subtract(1, "month")
                    .format("MMM Do, YYYY")}
                </p>
                <p className="mb-2 font-semibold">Full Name:</p>
                <p className="mb-2">{bookingInfo.guestName}</p>
                <p className="mb-2 font-semibold">Email Address:</p>
                <p className="mb-2">{bookingInfo.guestEmail}</p>
                <p className="mb-2 font-semibold">Adults:</p>
                <p className="mb-2">{bookingInfo.numOfAdults}</p>
                <p className="mb-2 font-semibold">Children:</p>
                <p className="mb-2">{bookingInfo.numOfChildren}</p>
                <p className="mb-2 font-semibold">Total Guest:</p>
                <p className="mb-2">{bookingInfo.totalNumOfGuests}</p>
              </div>

              {!isDeleted && (
                <button
                  onClick={() => handleBookingCancellation(bookingInfo.id)}
                  className="p-1 px-2 mt-4 text-white bg-red-700 border rounded-md"
                >
                  Cancel Booking
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="pt-4">Enter your booking number</div>
        )}

        {isDeleted && (
          <div className="mt-3 border rounded-md bg-emerald-500 border-emerald-950">
            {successMessage}
          </div>
        )}
      </div>
    </>
  );
};

export default FindBooking;
