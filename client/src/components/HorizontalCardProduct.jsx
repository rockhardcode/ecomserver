import React, {  useEffect, useRef, useState } from "react";
import fetchCategoryWiseProduct from "../helpers/fetchCategoryWiseProduct";
import displayINRCurrency from "../helpers/displayCurrency";
import { FaAngleRight } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import addToCart from "../helpers/addToCart";
import scrollTop from "../helpers/scrollTop";

const HorizontalCardProduct = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const loadingList = new Array(13).fill(null);

  //   const [scroll, setScroll] = useState(0);

  const scrollEle = useRef();

  const fetchData = async () => {
    setLoading(true);
    const categoryProduct = await fetchCategoryWiseProduct(category);
    setLoading(false);
    setData(categoryProduct?.data);
  };
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollRight = () => {
    scrollEle.current.scrollLeft += 300;
  };
  const scrollLeft = () => {
    scrollEle.current.scrollLeft -= 300;
  };
  return (
    <div className="container mx-auto px-4 my-6 relative">
      <h2 className="text-2xl font-semibold py-4">{heading}</h2>
      <div
        className="flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none transition-all"
        ref={scrollEle}
      >
        <button
          className="bg-white rounded-full p-1 hover:scale-125 hover:text-slate-800 transition-all absolute left-0 text-lg hidden md:block"
          onClick={scrollLeft}
        >
          <FaAngleLeft />
        </button>
        <button
          className="bg-white rounded-full p-1 hover:scale-125 hover:text-slate-800 transition-all absolute right-0 text-lg hidden md:block "
          onClick={scrollRight}
        >
          <FaAngleRight />
        </button>
        {loading
          ? loadingList.map((product, index) => {
              return (
                <div className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex " key={index}>
                  <div className="bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] cursor-pointer animate-pulse"></div>
                  <div className="p-4 w-full grid gap-2 animate-pulse">
                    <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 bg-slate-200 text-black p-1 max-w-full">
                      {" "}
                    </h2>
                    <p className="capitalize text-slate-500 p-1 bg-slate-200 w-full"></p>
                    <div className="flex gap-1 w-full">
                      <p className="text-red-600 font-medium p-1 w-full bg-slate-200"></p>
                      <p className="text-slate-500 line-through p-1 w-full bg-slate-200"></p>
                    </div>
                    <button className="text-sm bg-slate-200 text-white px-3 py-0.5 rounded-full w-full"></button>
                  </div>
                </div>
              );
            })
          : data.map((product, index) => {
              return (
                <Link
                key={index}
                  to={"/product/" + product?._id}
                  className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex cursor-pointer"
                  onClick={
                    scrollTop
                  }
                >
                  <div className="bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] cursor-pointer">
                    <img
                      src={product.productImage[0]}
                      alt={product}
                      className="object-scale-down h-full hover:scale-110 transition-all"
                    />
                  </div>
                  <div className="p-4 grid">
                    <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black">
                      {product?.productName}
                    </h2>
                    <p className="capitalize text-slate-500">
                      {product?.category}
                    </p>
                    <div className="flex gap-1">
                      <p className="text-red-600 font-medium">
                        {displayINRCurrency(product?.sellingPrice)}
                      </p>
                      <p className="text-slate-500 line-through">
                        {displayINRCurrency(product?.price)}
                      </p>
                    </div>
                    <button
                      className="text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-0.5 rounded-full"
                      onClick={(e) => addToCart(e, product?._id)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </Link>
              );
            })}
      </div>
    </div>
  );
};

export default HorizontalCardProduct;
