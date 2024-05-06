import axios, { AxiosResponse } from "axios";

export const api = axios.create({
  baseURL: "http://localhost:9190",
});

export const getHeader = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

interface Bike {
  id: string;
  bikeType: string;
  bikePrice: string;
  photo: string;
}

interface Booking {}

/* to add a new bike to the db */
export async function addBike(
  photo: File,
  bikeType: string,
  bikePrice: string,
  brand: string,
  model: string,
  info: string
): Promise<boolean> {
  const formData = new FormData();
  formData.append("photo", photo);
  formData.append("bikeType", bikeType);
  formData.append("bikePrice", bikePrice);
  formData.append("brand", brand);
  formData.append("model", model);
  formData.append("info", info);
  const header = getHeader();
  console.log("header", header);
  console.log("firformst", bikeType);
  try {
    const formDataArray = Array.from(formData.entries());
    console.log("formDataArray", formDataArray);
    console.log("bikeType", bikeType);
    const header = {
      ...getHeader(),
      "Content-Type": "multipart/form-data",
    };
    console.log("header", header);
    const response: AxiosResponse = await api.post(
      "/bikes/add/new-bike",
      formData,
      {
        headers: header,
      }
      // {
      //   headers: getHeader(),
      // }
    );
    // console.log("second");
    // return response.status === 201;
    console.log("response in add Bike", response);
    return response.status === 201;
  } catch (error: any) {
    console.log("error", error);
    throw new Error(`Error creating bike ${error.message}`);
  }
}

/* to update a bike */
export async function updateBike(
  bikeId: string,
  bikeData: {
    bikeType: string;
    bikePrice: string;
    photo: File;
    brand: string;
    model: string;
    info: string;
  }
): Promise<any> {
  const formData = new FormData();
  formData.append("bikeType", bikeData.bikeType);
  formData.append("bikePrice", bikeData.bikePrice);
  formData.append("photo", bikeData.photo);
  formData.append("brand", bikeData.brand);
  formData.append("model", bikeData.model);
  formData.append("info", bikeData.info);

  try {
    console.log("bikeData.bikePrice", bikeData.bikePrice);
    console.log("typeof bikeData.photo", typeof bikeData.photo);
    console.log("bikeData.photo", bikeData.photo);
    const formDataArray = Array.from(formData.entries());
    console.log("formDataArray", formDataArray);
    const header = {
      ...getHeader(),
      "Content-Type": "multipart/form-data",
    };
    const response: AxiosResponse = await api.put(
      `/bikes/update/${bikeId}`,
      formData,
      {
        headers: header,
      }
    );
    console.log("response in updateBike", response);
    return response;
  } catch (error: any) {
    throw new Error(`Error updating bike ${error.message}`);
  }
}

/* to get all bikes types from the db */
export async function getBikeTypes(): Promise<any[]> {
  try {
    const response: AxiosResponse = await api.get("/bikes/bike/types");
    return response.data;
  } catch (error) {
    throw new Error("Error fetching bike types");
  }
}

/* to get all bikes from the db */
export async function getAllBikes(): Promise<Bike[]> {
  try {
    const response: AxiosResponse = await api.get("/bikes/all-bikes");
    return response.data;
  } catch (error) {
    throw new Error("Error fetching bikes");
  }
}

/* to delete a bike by the id */
export async function deleteBike(bikeId: string): Promise<any> {
  try {
    const response: AxiosResponse = await api.delete(
      `/bikes/delete/bike/${bikeId}`,
      {
        headers: getHeader(),
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(`Error deleting bike ${error.message}`);
  }
}

/* to get a bike by the id */
export async function getBikeById(bikeId: string) {
  try {
    const result = await api.get(`/bikes/bike/${bikeId}`);
    console.log("result in getBikeById", result);
    return result.data;
  } catch (error: any) {
    throw new Error(`Error fetching bike ${error.message}`);
  }
}

/* to save a new rental to the db */
export async function rentBike(bikeId: string, booking: any) {
  try {
    const response = await api.post(
      `/bookings/bike/${bikeId}/booking`,
      booking
    );
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error(`Error booking bike : ${error.message}`);
    }
  }
}

/* to get all rental from the db */
export async function getAllRentals() {
  try {
    const result = await api.get("/bookings/all-rentals", {
      headers: getHeader(),
    });
    return result.data;
  } catch (error: any) {
    throw new Error(`Error fetching rentals : ${error.message}`);
  }
}

/* to get rental by the confirmation code */
export async function getRentalByConfirmationCode(confirmationCode: string) {
  try {
    const result = await api.get(`/bookings/confirmation/${confirmationCode}`);
    return result.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error(`Error find rental : ${error.message}`);
    }
  }
}

/* to cancel user rental */
export async function cancelRental(rentalId: string) {
  try {
    const result = await api.delete(`/bookings/rental/${rentalId}/delete`);
    return result.data;
  } catch (error: any) {
    throw new Error(`Error cancelling rental :${error.message}`);
  }
}

/* to get all available bikes from the database with a given date and a bike type */
export async function getAvailableBikes(
  checkInDate: string,
  checkOutDate: string,
  bikeType: string
) {
  const result = await api.get(
    `bikes/available-bikes?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&bikeType=${bikeType}`
  );
  return result;
}

/* to register a new user */
export async function registerUser(registration: any) {
  try {
    const response = await api.post("/auth/register-user", registration);
    return response.data;
  } catch (error: any) {
    if (error.reeponse && error.response.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error(`User registration error : ${error.message}`);
    }
  }
}

/* to login a registered user */
export async function loginUser(login: any) {
  try {
    const response = await api.post("/auth/login", login);
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

/*  to get the user profile */
export async function getUserProfile(userId: string, token: string) {
  try {
    const response = await api.get(`users/profile/${userId}`, {
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

/* to delete a single user */
export async function deleteUser(userId: string) {
  try {
    const response = await api.delete(`/users/delete/${userId}`, {
      headers: getHeader(),
    });
    return response.data;
  } catch (error: any) {
    return error.message;
  }
}

/* to get a single user */
export async function getUser(userId: string, token: string) {
  try {
    const response = await api.get(`/users/${userId}`, {
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

/* to get user rentals by the user id */
export async function getRentalsByUserId(userId: string, token: string) {
  try {
    const response = await api.get(`/bookings/user/${userId}/rentals`, {
      headers: getHeader(),
    });
    return response.data;
  } catch (error: any) {
    console.error("Error fetching rentals:", error.message);
    throw new Error("Failed to fetch rentals");
  }
}
