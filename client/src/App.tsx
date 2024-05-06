import "./App.css";
import { Route, Routes } from "react-router-dom";
import Missing from "./components/Missing";
import Home from "./components/home/Home";
import Layout from "./components/layout/Layout";
import Admin from "./components/admin/Admin";
import Checkout from "./components/booking/Checkout";
import BookingSuccess from "./components/booking/BookingSuccess";
import Bookings from "./components/booking/Bookings";
import FindBooking from "./components/booking/FindBooking";
import { AuthProvider } from "./components/auth/AuthProvider";
import Login from "./components/auth/Login";
import Registration from "./components/auth/Registration";
import Profile from "./components/auth/Profile";
import RequireAuth from "./components/auth/RequireAuth";
import AddBike from "./components/bike/AddBike";
import EditBike from "./components/bike/EditBike";
import ExistingBikes from "./components/bike/ExistingBikes";
import BikeListing from "./components/bike/BikeListing";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/edit-bike/:bikeId" element={<EditBike />} />
          <Route path="/existing-bikes" element={<ExistingBikes />} />
          <Route path="/add-bike" element={<AddBike />} />
          <Route
            path="/rent-bike/:bikeId"
            element={
              <RequireAuth>
                <Checkout />
              </RequireAuth>
            }
          />
          <Route path="/browse-all-bikes" element={<BikeListing />} />
          <Route path="/booking-success" element={<BookingSuccess />} />
          <Route path="/existing-bookings" element={<Bookings />} />
          <Route path="/find-booking" element={<FindBooking />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
