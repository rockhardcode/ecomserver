import React, { useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import productCategory from "../helpers/productCategory";
import { MdOutlineFileUpload } from "react-icons/md";
import uploadImage from "../helpers/uploadImage";
import DisplayImage from "./DisplayImage";
import { MdDelete } from "react-icons/md";
import SummaryApi from "../common";
import { toast } from "react-toastify";

const UploadProduct = ({ onClose, fetchData }) => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
  });
  const [openFullScreen, setOpenFullScreen] = useState(false);
  const [fullScreenImg, setFullScreenImg] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];
    const uploadImageCloudinary = await uploadImage(file);
    setData((prev) => {
      return {
        ...prev,
        productImage: [...prev.productImage, uploadImageCloudinary.url],
      };
    });
  };
  const handleDeleteProductImg = async (index) => {
    const newProductImg = [...data.productImage];
    newProductImg.splice(index, 1);
    setData((prev) => {
      return {
        ...prev,
        productImage: [...newProductImg],
      };
    });
  };

  // submit uploaded product
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(SummaryApi.uploadProduct.url, {
      method: SummaryApi.uploadProduct.method,
      credentials: "include",
      headers : {
        "content-type" : "application/json"
    },
      body: JSON.stringify(data),
    })
     const responseData = await response.json()
     if(responseData.success) {
      toast.success(responseData?.message)
      onClose()
      fetchData()
     }
     if(responseData.error) {
      toast.error(responseData?.message)
     }
  };
  return (
    <div className="fixed w-full h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center">
      <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden">
        <div className="flex justify-center item-center pb-4">
          <h2 className="font-bold text-lg">Upload Product</h2>
          <div className="w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer">
            <IoMdCloseCircle onClick={onClose} />
          </div>
        </div>
        <form
          className="grid p-4 gap-3 overflow-y-scroll h-full pb-5"
          onSubmit={handleSubmit}
        >
          <label htmlFor="productName">Prodect Name :</label>
          <input
            type="text"
            id="procuctName"
            placeholder="Enter Product name"
            name="productName"
            value={data.productName}
            onChange={handleChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />
          <label htmlFor="brandName" className="mt-3">
            Brand Name :
          </label>
          <input
            type="text"
            id="procuctName"
            placeholder="Enter brand name"
            name="brandName"
            value={data.brandName}
            onChange={handleChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />
          <label htmlFor="category" className="mt-3">
            category :
          </label>
          <select
            name="category"
            value={data.category}
            id=""
            className="p-2 bg-slate-100 border rounded"
            onChange={handleChange}
            required
          >
            <option value={""}>Select Category</option>
            {productCategory.map((el, index) => {
              return (
                <option key={el.value} value={el.value}>
                  {el.label}
                </option>
              );
            })}
          </select>
          <label htmlFor="productImage" className="mt-3">
            Product Image :
          </label>
          <label htmlFor="uploadImageInput">
            <div className="p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer">
              <div className="text-slate-500 flex justify-center items-center flex-col gap-2">
                <span className="text-3xl">
                  <MdOutlineFileUpload />
                </span>
                <p className="text-sm">Upload Product Image</p>
                <input
                  type="file"
                  name="productImage"
                  id="uploadImageInput"
                  className="opacity-0 absolute w-0 h-0"
                  onChange={handleUploadProduct}
                  // required
                />
              </div>
            </div>
          </label>

          <div>
            {data?.productImage[0] ? (
              <div className="flex items-center gap-2">
                {data.productImage.map((el, index) => {
                  return (
                    <div className="relative group">
                      <img
                        src={el}
                        alt={el}
                        width={80}
                        height={80}
                        className="bg-slate-100 cursor-pointer"
                        onClick={() => {
                          setOpenFullScreen(true);
                          setFullScreenImg(el);
                        }}
                      />
                      <div
                        className="absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer"
                        onClick={() => handleDeleteProductImg(index)}
                      >
                        <MdDelete />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-red-600 text-xs">
                *Please upload Product image
              </p>
            )}
          </div>
          <label htmlFor="price" className="mt-3">
            Price :
          </label>
          <input
            type="number"
            id="price"
            placeholder="Enter price"
            name="price"
            value={data.price}
            onChange={handleChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />

          <label htmlFor="price" className="mt-3">
            Selling Price :
          </label>
          <input
            type="number"
            id="sellingPrice"
            placeholder="Enter selling price"
            name="sellingPrice"
            value={data.sellingPrice}
            onChange={handleChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />
          <label htmlFor="description" className="mt-3">
            Description :
          </label>
          <textarea
            name="description"
            value={data.description}
            id="description"
            className="h-28 bg-slate-100 border resize-none"
            placeholder="Enter Product description"
            rows="3"
            onChange={handleChange}
            required
          ></textarea>
          <button className="px-3 py-2 bg-red-600 text-white mb-10 hover:bg-red-700">
            Upload Product
          </button>
        </form>
      </div>

      {/* {display full screen image} */}
      {openFullScreen && (
        <DisplayImage
          onClose={() => setOpenFullScreen(false)}
          imgUrl={fullScreenImg}
        />
      )}
    </div>
  );
};

export default UploadProduct;
