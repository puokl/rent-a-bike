import { useState } from "react";
import { Link } from "react-router-dom";
import { addBike } from "../../utils/ApiFunctions";
import BikeTypeSelector from "../common/BikeTypeSelector";
import ExistingBikes from "./ExistingBikes";

const AddBike = () => {
  const [newBike, setNewBike] = useState<{
    photo: File | null;
    bikeType: string;
    bikePrice: string;
    brand: string;
    model: string;
    info: string;
  }>({
    photo: null,
    bikeType: "",
    bikePrice: "",
    brand: "",
    model: "",
    info: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const handleBikeInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    let newValue = value;
    if (name === "bikePrice") {
      if (!isNaN(parseInt(value))) {
        newValue = value;
      } else {
        newValue = "";
      }
    }
    setNewBike({ ...newBike, [name]: newValue });
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      setNewBike({ ...newBike, photo: selectedImage });
      setImagePreview(URL.createObjectURL(selectedImage));
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!newBike.photo) {
        setErrorMessage("Please select a photo");
        return;
      }
      if (!newBike.bikeType) {
        setErrorMessage("Please select a bike type");
        return;
      }
      const photo = newBike.photo as File;
      console.log("newBike", newBike);
      const success = await addBike(
        photo,
        newBike.bikeType,
        newBike.bikePrice,
        newBike.brand,
        newBike.model,
        newBike.info
      );
      console.log("success in addbike", success);
      // if (success) {
      setSuccessMessage("A new bike was added successfully!");
      setNewBike({
        photo: null,
        bikeType: "",
        bikePrice: "",
        brand: "",
        model: "",
        info: "",
      });
      setImagePreview("");
      setErrorMessage("");
      console.log("success2 in addbike", success);
      // } else {
      //   console.log("error add bike");
      //   setErrorMessage("Error adding new bike");
      // }
    } catch (error: any) {
      setErrorMessage(error.message);
    }
    setTimeout(() => {
      setSuccessMessage("");
      setErrorMessage("");
    }, 3000);
  };
  return (
    <>
      <section className="container mt-5 mb-5">
        <div className="flex justify-center">
          <div className="w-full md:w-3/4 lg:w-2/3">
            <h2 className="mx-auto mt-5 mb-2 text-3xl font-bold">
              Add a New Bike
            </h2>
            {successMessage && (
              <div
                className="relative px-4 py-3 text-green-700 bg-green-100 border border-green-400 rounded"
                role="alert"
              >
                {successMessage}
              </div>
            )}
            {errorMessage && (
              <div
                className="relative px-4 py-3 text-red-700 bg-red-100 border border-red-400 rounded"
                role="alert"
              >
                {errorMessage}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="bikeType" className="block text-gray-700">
                  Bike Type
                </label>
                <div>
                  <BikeTypeSelector
                    handleBikeInputChange={handleBikeInputChange}
                    newBike={newBike}
                  />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="bikePrice" className="block text-gray-700">
                  Bike Price
                </label>
                <input
                  required
                  type="number"
                  className="px-3 py-2 leading-tight text-gray-700 border rounded-md focus:outline-none focus:shadow-outline"
                  id="bikePrice"
                  name="bikePrice"
                  value={newBike.bikePrice}
                  onChange={handleBikeInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="brand" className="block text-gray-700">
                  Brand
                </label>
                <input
                  type="text"
                  className="px-3 py-2 leading-tight text-gray-700 border rounded-md focus:outline-none focus:shadow-outline"
                  id="brand"
                  name="brand"
                  value={newBike.brand}
                  onChange={handleBikeInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="model" className="block text-gray-700">
                  Model
                </label>
                <input
                  type="text"
                  className="px-3 py-2 leading-tight text-gray-700 border rounded-md focus:outline-none focus:shadow-outline"
                  id="model"
                  name="model"
                  value={newBike.model}
                  onChange={handleBikeInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="info" className="block text-gray-700">
                  Info
                </label>
                <textarea
                  className="px-3 py-2 leading-tight text-gray-700 border rounded-md focus:outline-none focus:shadow-outline"
                  id="info"
                  name="info"
                  value={newBike.info}
                  onChange={handleBikeInputChange}
                ></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="photo" className="block text-gray-700">
                  Bike Photo
                </label>
                <input
                  required
                  name="photo"
                  id="photo"
                  type="file"
                  className="px-3 py-2 leading-tight text-gray-700 border rounded-md focus:outline-none focus:shadow-outline"
                  onChange={handleImageChange}
                />
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview bike photo"
                    className="object-cover w-64 h-64 mt-2"
                  />
                )}
              </div>
              <div className="flex">
                <Link
                  to={"/existing-bikes"}
                  className="w-1/3 px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded hover:bg-blue-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Back to existing bikes
                </Link>
                <button
                  type="submit"
                  className="w-1/3 px-4 py-2 ml-2 text-sm font-medium text-orange-600 border border-orange-600 rounded hover:bg-orange-100 hover:text-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                >
                  Save Bike
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddBike;
