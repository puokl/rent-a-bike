import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Header from "../common/Header";

interface LocationState {
  message?: string;
  error?: string;
}

const BookingSuccess: React.FC = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  // const message = location.state?.message;
  // const error = location.state?.error;
  const [message, setMessage] = useState<string | undefined>(
    location.state?.message
  );
  const [error, setError] = useState<string | undefined>(location.state?.error);

  useEffect(() => {
    const fetchMessage = () => {
      setTimeout(() => {
        setMessage(location.state?.message);
        setLoading(false);
      }, 2000);
    };

    fetchMessage();
  }, [location.state?.message]);

  return (
    <div className="px-20 mx-auto">
      <Header title="Booking Success" />
      <div className="mt-8 ml-4">
        {loading ? (
          <div>Loading...</div>
        ) : message ? (
          <div>
            <h2 className="text-2xl font-bold text-emerald-800">
              Booking Success!
            </h2>
            <p className="mt-3 text-lg text-emerald-600">{message}</p>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-red-800">
              Error Booking Room!
            </h2>
            <p className="mt-3 text-lg text-red-600">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingSuccess;
