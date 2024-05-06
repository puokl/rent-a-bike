import React, { ChangeEvent, useEffect, useState } from "react";
import { getBikeById, updateBike } from "../../utils/ApiFunctions";
import { Link, useParams } from "react-router-dom";

interface Bike {
  photo: File | string;
  bikeType: string;
  bikePrice: string;
  brand: string;
  model: string;
  info: string;
}

const EditBike: React.FC = () => {
  const [bike, setBike] = useState<Bike>({
    photo: "",
    bikeType: "",
    bikePrice: "",
    brand: "",
    model: "",
    info: "",
  });
  const [imagePreview, setImagePreview] = useState<string | File>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { bikeId } = useParams<{ bikeId: string }>();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selectedImage = e.target.files?.[0];
    if (selectedImage) {
      setBike({ ...bike, photo: selectedImage });
      setImagePreview(URL.createObjectURL(selectedImage));
    }
  };

  const handleInputChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setBike({ ...bike, [name]: value });
  };

  useEffect(() => {
    const fetchBike = async () => {
      if (!bikeId) return;
      try {
        const bikeData = await getBikeById(bikeId);
        setBike(bikeData);
        setImagePreview(bikeData.photo);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBike();
  }, [bikeId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!bikeId) return;
      const photoFile = bike.photo as File;
      console.log("photoFile", typeof photoFile);
      console.log("bike", bike);
      const response = await updateBike(bikeId, { ...bike, photo: photoFile });
      console.log("response in client", response);
      if (response.status === 200) {
        setSuccessMessage("Bike updated successfully!");
        const updatedBikeData = await getBikeById(bikeId);
        setBike(updatedBikeData);
        setImagePreview(updatedBikeData.photo);
        setErrorMessage("");
      } else {
        setErrorMessage("Error updating bike");
      }
    } catch (error: any) {
      console.error(error);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="container m-5">
      <h3 className="mt-5 mb-5 text-xl font-bold text-center">Edit Bike</h3>
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          {successMessage && (
            <div
              className="p-4 text-green-800 bg-green-100 border border-green-400 rounded-md"
              role="alert"
            >
              {successMessage}
            </div>
          )}
          {errorMessage && (
            <div
              className="p-4 text-red-800 bg-red-100 border border-red-400 rounded-md"
              role="alert"
            >
              {errorMessage}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label
                htmlFor="bikeType"
                className="mb-2 font-medium text-gray-700 "
              >
                Bike Type
              </label>
              <input
                type="text"
                className="w-[350px] px-2 py-1 ml-4 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                id="bikeType"
                name="bikeType"
                value={bike.bikeType}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="bikePrice"
                className="mb-2 font-medium text-gray-700 "
              >
                Bike Price
              </label>
              <input
                type="number"
                className="w-[150px] px-2 py-1 ml-4 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                id="bikePrice"
                name="bikePrice"
                value={bike.bikePrice}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="brand"
                className="mb-2 font-medium text-gray-700 "
              >
                Brand
              </label>
              <input
                type="text"
                className="w-[150px] px-2 py-1 ml-4 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                id="brand"
                name="brand"
                value={bike.brand}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="model"
                className="mb-2 font-medium text-gray-700 "
              >
                Model
              </label>
              <input
                type="text"
                className="w-[150px] px-2 py-1 ml-4 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                id="model"
                name="model"
                value={bike.model}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="model"
                className="mb-2 font-medium text-gray-700 "
              >
                Info
              </label>
              <textarea
                className="w-[150px] px-2 py-1 ml-4 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                id="info"
                name="info"
                value={bike.info}
                onChange={handleInputChange}
              ></textarea>
            </div>

            <div className="mb-3">
              <label
                htmlFor="photo"
                className="mb-2 font-medium text-gray-700 "
              >
                Photo
              </label>
              <input
                required
                type="file"
                className="w-[350px] px-2 py-1 ml-4 focus:outline-none focus:ring-1 focus:ring-blue-500"
                id="photo"
                name="photo"
                onChange={handleImageChange}
              />
              {imagePreview && (
                <div>
                  <img
                    src={`data:image/jpeg;base64,${imagePreview}`}
                    alt="Bike preview"
                    style={{ maxWidth: "400px", maxHeight: "400px" }}
                    className="mt-3"
                  />
                  <img
                    src={`${imagePreview}`}
                    alt="Bike preview"
                    style={{ maxWidth: "400px", maxHeight: "400px" }}
                    className="mt-3"
                  />
                </div>
              )}
            </div>
            <div className="mt-4">
              <Link
                to={"/existing-bikes"}
                className="px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded hover:bg-blue-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Back
              </Link>
              <button
                type="submit"
                className="px-4 py-2 ml-2 text-sm font-medium text-orange-600 border border-orange-600 rounded hover:bg-orange-100 hover:text-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                Edit Bike
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditBike;
