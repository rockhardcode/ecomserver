import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SummaryApi from "../common";
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import displayINRCurrency from "../helpers/displayCurrency";
import HorizontalCardProduct from "../components/HorizontalCardProduct";
import addToCart from "../helpers/addToCart";

const ProductDetail = () => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
  });
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const productImageListLoading = new Array(4).fill(null);
  const [activeImg, setActiveImg] = useState("");
  const fetchProductDetails = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.productDetails.url, {
      method: SummaryApi.productDetails.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        productId: params?.id,
      }),
    });
    setLoading(false);
    const dataResponse = await response.json();
    setData(dataResponse.data);
    setActiveImg(dataResponse?.data.productImage[0]);
  };
  useEffect(() => {
    fetchProductDetails();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);
  const handleProductHover = (imageUrl) => {
    setActiveImg(imageUrl);
  };
  return (
    <div className="container mx-auto p-4">
      <div className=" min-h-[200px] flex flex-col lg:flex-row gap-2">
        {/* poduct Image */}
        <div className="h-96 flex flex-col lg:flex-row-reverse  gap-4">
          <div className="h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200">
            <img
              src={activeImg}
              alt=""
              srcset=""
              className="h-full w-full object-scale-down mix-blend-multiply"
            />
          </div>
          <div className="h-full">
            {loading ? (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                {productImageListLoading.map((el, index) => {
                  return (
                    <div
                      className="w-20 h-20 bg-slate-200 rounded animate-pulse"
                      key={"loadingImage" + index}
                    ></div>
                  );
                })}
              </div>
            ) : (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                {data?.productImage.map((imgUrl, index) => {
                  return (
                    <div
                      className="w-20 h-20 bg-slate-200 rounded p-1 cursor-pointer"
                      key={imgUrl}
                    >
                      <img
                        src={imgUrl}
                        alt=""
                        className="w-full h-full object-scale-down mix-blend-multiply"
                        onMouseEnter={() => handleProductHover(imgUrl)}
                        onClick={() => handleProductHover(imgUrl)}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        {/* product details */}
        {
          loading ? (
            <div className="flex flex-col gap-2">
          <p className="bg-slate-200 animate-pulse px-2 rounded-full inline-block w-[80px] p-2"> </p>
          <h2 className="text-2xl lg:text-4xl font-medium bg-slate-200 animate-pulse p-2 rounded-full w-[160px]"> </h2>
          <p className="capitalize text-slate-400 bg-slate-200 animate-pulse p-2 rounded-full w-[100px]"></p>
          <div className="flex items-center gap-2 text-xl font-medium lg:text-3xl my-1">
            <p className="bg-slate-200 animate-pulse p-2 rounded-full w-[160px]"></p>
            <p className="text-slate-400 line-through bg-slate-200 animate-pulse p-2 rounded-full w-[160px]"></p>
          </div>
          <div className="flex items-center gap-3 my-2">
            <button className="border-2 bg-slate-200 animate-pulse p-2 rounded-full w-[160px]"></button>
            <button className="border-2 bg-slate-200 animate-pulse p-2 rounded-full w-[160px]"></button>
          </div>
          <div>
            <p className="text-slate-600 font-medium my-1 bg-slate-200 animate-pulse p-2 rounded-full w-[160px]"> </p>
            <p className="bg-slate-200 animate-pulse p-2 rounded w-[300px] h-[200px]"></p>
          </div>
        </div>
          ) : (
            <div className="flex flex-col gap-2">
          <p className="bg-red-200 text-red-600 px-2 rounded-full inline-block w-fit">{data?.brandName}</p>
          <h2 className="text-2xl lg:text-4xl font-medium">{data?.productName}</h2>
          <p className="capitalize text-slate-400">{data?.category}</p>

          <div className="text-red-600 flex items-center gap-1">
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStarHalf />
          </div>
          <div className="flex items-center gap-2 text-xl font-medium lg:text-3xl my-1">
            <p className="text-red-600">{displayINRCurrency(data?.sellingPrice)}</p>
            <p className="text-slate-400 line-through">{displayINRCurrency(data?.price)}</p>
          </div>
          <div className="flex items-center gap-3 my-2">
            <button className="border-2 border-red-600 rounded px-3 py-1 min-w-[120px] text-red-600 font-medium hover:text-white hover:bg-red-600">Buy</button>
            <button className="border-2 border-red-600 rounded px-3 py-1 min-w-[120px] font-medium text-white bg-red-600 hover:text-red-600 hover:bg-white" onClick={(e) => addToCart(e, data?._id)}>Add to Cart</button>
            {/*  */}
          </div>
          <div>
            <p className="text-slate-600 font-medium my-1">Description : </p>
            <p>{data?.description}</p>
          </div>
        </div>
          )
        }
      </div>
      {data.category && (<HorizontalCardProduct category={data?.category} heading={"Recommended Products"}/>) }
    </div>
  );
};

export default ProductDetail;
