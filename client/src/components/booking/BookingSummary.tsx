import React, { useState, useEffect } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";

interface BookingSummaryProps {
  booking: {
    guestFullName: string;
    guestEmail: string | null;
    checkInDate: string;
    checkOutDate: string;
    numOfAdults: string;
    numOfChildren: string;
  };
  payment: number;
  isFormValid: boolean;
  onConfirm: () => void;
}

const BookingSummary: React.FC<BookingSummaryProps> = ({
  booking,
  payment,
  isFormValid,
  onConfirm,
}) => {
  const checkInDate = moment(booking.checkInDate);
  const checkOutDate = moment(booking.checkOutDate);
  const numberOfDays = checkOutDate.diff(checkInDate, "days");
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const navigate = useNavigate();

  const handleConfirmBooking = () => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      setIsBookingConfirmed(true);
      onConfirm();
    }, 3000);
  };

  useEffect(() => {
    if (isBookingConfirmed) {
      navigate("/booking-success");
    }
  }, [isBookingConfirmed, navigate]);

  return (
    <div className="h-full p-1 pl-2 border border-teal-800 rounded-xl">
      <h4 className="my-1 text-lg font-bold">Reservation Summary</h4>
      <p className="mb-2">
        Name: <strong>{booking.guestFullName}</strong>
      </p>
      <p className="mb-2">
        Email: <strong>{booking.guestEmail}</strong>
      </p>
      <p className="mb-2">
        Check-in Date:{" "}
        <strong>{moment(booking.checkInDate).format("MMM Do YYYY")}</strong>
      </p>
      <p className="mb-2">
        Check-out Date:{" "}
        <strong>{moment(booking.checkOutDate).format("MMM Do YYYY")}</strong>
      </p>
      <p className="mb-4">
        Number of Days Booked: <strong>{numberOfDays}</strong>
      </p>

      <div>
        <h5 className="mb-2 font-bold">Number of Guests</h5>
        <p className="mb-2">
          Adult{parseInt(booking.numOfAdults) > 1 ? "s" : ""} :{" "}
          <strong>{booking.numOfAdults}</strong>
        </p>
        <p className="mb-2">
          Children : <strong>{booking.numOfChildren}</strong>
        </p>
      </div>

      {payment > 0 ? (
        <>
          <p className="mb-24">
            Total payment: <strong>{payment}€</strong>
          </p>

          {isFormValid && !isBookingConfirmed ? (
            <button
              className="px-4 py-2 font-bold text-white bg-green-500 rounded hover:bg-green-700"
              onClick={handleConfirmBooking}
              disabled={isProcessingPayment}
            >
              {isProcessingPayment ? (
                <>
                  <div className="flex items-center">
                    {/* spinner */}
                    <div className="mr-2">
                      <svg
                        className="w-5 h-5 mr-3 animate-spin"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zM20 12c0-3.042-1.135-5.824-3-7.938l-3 2.647A7.962 7.962 0 0116 12h4zm-8 7.938A7.962 7.962 0 0112 20v4c4.418 0 8-3.582 8-8h-4zm0-16V0a8 8 0 00-8 8h4c0-2.668 1.064-5.087 2.787-6.812L12 4.938z"
                        ></path>
                      </svg>
                    </div>
                    Booking Confirmed, redirecting to payment...
                  </div>
                </>
              ) : (
                "Confirm Booking & proceed to payment"
              )}
            </button>
          ) : isBookingConfirmed ? (
            <div className="flex items-center justify-center">
              <div className="w-8 h-8 border-b-2 border-gray-900 rounded-full animate-spin"></div>
            </div>
          ) : null}
        </>
      ) : (
        <p className="text-red-500">
          Check-out date must be after check-in date.
        </p>
      )}
    </div>
  );
};

export default BookingSummary;
