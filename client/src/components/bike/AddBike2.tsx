import { useState } from "react";
import { Link } from "react-router-dom";
import { addBike } from "../../utils/ApiFunctions";
import BikeTypeSelector from "../common/BikeTypeSelector";
import ExistingBikes from "./ExistingBikes";

const AddBike2 = () => {
  //   const [newBike, setNewBike] = useState<{
  //     photo: File | null;
  //     bikeType: string;
  //     bikePrice: string;
  //     brand: string;
  //     model: string;
  //     info: string;
  //   }>({
  //     photo: null,
  //     bikeType: "",
  //     bikePrice: "",
  //     brand: "",
  //     model: "",
  //     info: "",
  //   });
  //   const [successMessage, setSuccessMessage] = useState("");
  //   const [errorMessage, setErrorMessage] = useState("");
  //   const [imagePreview, setImagePreview] = useState("");
  //   const handleBikeInputChange = (
  //     e:
  //       | React.ChangeEvent<HTMLInputElement>
  //       | React.ChangeEvent<HTMLTextAreaElement>
  //   ) => {
  //     const { name, value } = e.target;
  //     let newValue = value;
  //     if (name === "bikePrice") {
  //       if (!isNaN(parseInt(value))) {
  //         newValue = value;
  //       } else {
  //         newValue = "";
  //       }
  //     }
  //     setNewBike({ ...newBike, [name]: newValue });
  //   };
  //   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     if (!e.target.files) return;
  //     const selectedImage = e.target.files[0];
  //     if (selectedImage) {
  //       setNewBike({ ...newBike, photo: selectedImage });
  //       setImagePreview(URL.createObjectURL(selectedImage));
  //     }
  //   };
  //   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //     e.preventDefault();
  //     try {
  //       if (!newBike.photo) {
  //         setErrorMessage("Please select a photo");
  //         return;
  //       }
  //       if (!newBike.bikeType) {
  //         setErrorMessage("Please select a bike type");
  //         return;
  //       }
  //       const photo = newBike.photo as File;
  //       console.log("newBike", newBike);
  //       const success = await addBike(
  //         photo,
  //         newBike.bikeType,
  //         newBike.bikePrice,
  //         newBike.brand,
  //         newBike.model,
  //         newBike.info
  //       );
  //       if (success) {
  //         setSuccessMessage("A new bike was added successfully!");
  //         setNewBike({
  //           photo: null,
  //           bikeType: "",
  //           bikePrice: "",
  //           brand: "",
  //           model: "",
  //           info: "",
  //         });
  //         setImagePreview("");
  //         setErrorMessage("");
  //       } else {
  //         setErrorMessage("Error adding new bike");
  //       }
  //     } catch (error: any) {
  //       setErrorMessage(error.message);
  //     }
  //     setTimeout(() => {
  //       setSuccessMessage("");
  //       setErrorMessage("");
  //     }, 3000);
  //   };
  //   return (
  //     <>
  //       <section className="container mt-5 mb-5">
  //         <div className="flex justify-center">
  //           <div className="w-full md:w-3/4 lg:w-2/3">
  //             <h2 className="mx-auto mt-5 mb-2 text-3xl font-bold">
  //               Add a New Bike
  //             </h2>
  //             {successMessage && (
  //               <div
  //                 className="relative px-4 py-3 text-green-700 bg-green-100 border border-green-400 rounded"
  //                 role="alert"
  //               >
  //                 {successMessage}
  //               </div>
  //             )}
  //             {errorMessage && (
  //               <div
  //                 className="relative px-4 py-3 text-red-700 bg-red-100 border border-red-400 rounded"
  //                 role="alert"
  //               >
  //                 {errorMessage}
  //               </div>
  //             )}
  //             <form onSubmit={handleSubmit}>
  //               <div className="mb-3">
  //                 <label htmlFor="bikeType" className="block text-gray-700">
  //                   Bike Type
  //                 </label>
  //                 <div>
  //                   <BikeTypeSelector
  //                     handleBikeInputChange={handleBikeInputChange}
  //                     newBike={newBike}
  //                   />
  //                 </div>
  //               </div>
  //               <div className="mb-3">
  //                 <label htmlFor="bikePrice" className="block text-gray-700">
  //                   Bike Price
  //                 </label>
  //                 <input
  //                   required
  //                   type="number"
  //                   className="px-3 py-2 leading-tight text-gray-700 border rounded-md focus:outline-none focus:shadow-outline"
  //                   id="bikePrice"
  //                   name="bikePrice"
  //                   value={newBike.bikePrice}
  //                   onChange={handleBikeInputChange}
  //                 />
  //               </div>
  //               <div className="mb-3">
  //                 <label htmlFor="brand" className="block text-gray-700">
  //                   Brand
  //                 </label>
  //                 <input
  //                   type="text"
  //                   className="px-3 py-2 leading-tight text-gray-700 border rounded-md focus:outline-none focus:shadow-outline"
  //                   id="brand"
  //                   name="brand"
  //                   value={newBike.brand}
  //                   onChange={handleBikeInputChange}
  //                 />
  //               </div>
  //               <div className="mb-3">
  //                 <label htmlFor="model" className="block text-gray-700">
  //                   Model
  //                 </label>
  //                 <input
  //                   type="text"
  //                   className="px-3 py-2 leading-tight text-gray-700 border rounded-md focus:outline-none focus:shadow-outline"
  //                   id="model"
  //                   name="model"
  //                   value={newBike.model}
  //                   onChange={handleBikeInputChange}
  //                 />
  //               </div>
  //               <div className="mb-3">
  //                 <label htmlFor="info" className="block text-gray-700">
  //                   Info
  //                 </label>
  //                 <textarea
  //                   className="px-3 py-2 leading-tight text-gray-700 border rounded-md focus:outline-none focus:shadow-outline"
  //                   id="info"
  //                   name="info"
  //                   value={newBike.info}
  //                   onChange={handleBikeInputChange}
  //                 ></textarea>
  //               </div>
  //               <div className="mb-3">
  //                 <label htmlFor="photo" className="block text-gray-700">
  //                   Bike Photo
  //                 </label>
  //                 <input
  //                   required
  //                   name="photo"
  //                   id="photo"
  //                   type="file"
  //                   className="px-3 py-2 leading-tight text-gray-700 border rounded-md focus:outline-none focus:shadow-outline"
  //                   onChange={handleImageChange}
  //                 />
  //                 {imagePreview && (
  //                   <img
  //                     src={imagePreview}
  //                     alt="Preview bike photo"
  //                     className="object-cover w-64 h-64 mt-2"
  //                   />
  //                 )}
  //               </div>
  //               <div className="grid grid-cols-2 gap-2">
  //                 <Link to={"/existing-bikes"} className="btn btn-outline-info">
  //                   Existing bikes
  //                 </Link>
  //                 <button type="submit" className="btn btn-outline-primary">
  //                   Save Bike
  //                 </button>
  //               </div>
  //             </form>
  //           </div>
  //         </div>
  //       </section>
  //     </>
  //   );
};

export default AddBike2;
