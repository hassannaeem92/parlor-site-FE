import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProgressSpinner } from "primereact/progressspinner";
import { getSpecificServiceDetails } from "../../store/AsynMethod/ServiceMethod";
import '../../styles/ServiceDetails.scss';
import massageImage from '../../assets/images/masaag-image1.jpg'; // Replace with your image path
import { useParams } from "react-router-dom";
import { getCategoriesWithSubCategories, getServicePrices, getAllDeals, getspecificDeal } from "../../store/AsynMethod/ProductMethod";
import { base_url } from "../../api/backend";
import Slider from "react-slick";
import './DealsDetails.scss';
import { all } from "axios";
import { getUserCartItem, increaseUserCartItemQty } from "../../store/AsynMethod/CartMethod";

import {
  addItemToCart,
  decreaseUserCartItemQty,
} from "../../store/AsynMethod/CartMethod";
import Deals from "../Home/includes/Deals";




const DealDetails = () => {

  // const baseURL = "http://localhost:7001/uploads"
  // const baseURL = "https://be.beautyserviceathome.com/uploads"
  const { id } = useParams();
  const dispatch = useDispatch();
  // const { specificservice } = useSelector((state) => state.ServiceReducers);
  const { specificDeal } = useSelector((state) => state.ProductReducers);

  const { categoriesWithSub } = useSelector((state) => state.ProductReducers);
  // const [specificCategory, setSpecificCategory] = useState({});
  const { allDeals } = useSelector((state) => state.ProductReducers);
  // const testDeal = [{id: 1, image: '/files-1739224091628-313762804.png', name: 'test', description: 'test', price: 100}];
  const { cartItem } = useSelector((state) => state.CartReducers);



  useEffect(() => {


    const body = {
      serviceid: Number(id)
    }
    // dispatch(getCategoriesWithSubCategories(body));
    dispatch(getspecificDeal(id));

  }, [id]);


  useEffect(() => {
    dispatch(getCategoriesWithSubCategories());
    dispatch(getAllDeals());

  }, [dispatch]);

  useEffect(() => {

    if (specificDeal) {

    }


  }, [id, specificDeal]);


  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,  // Adjust based on how many images you want visible
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const handleViewDetails = (id) => {
    dispatch(getspecificDeal(id));
  };


  const handleAdd = (deal) => {

    dispatch(addItemToCart(deal));
  };

  const increaeDealPerson = (deal) => {
    dispatch(increaseUserCartItemQty(deal));
  };


  // return (

  //   <div className="min-h-screen bg-gray-100 flex items-center justify-center p-10">
  //   {specificDeal && specificDeal.length > 0 ? (
  //     <div className="bg-white p-8 rounded-lg shadow-lg max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
  //       {/* Left: Product Image */}
  //       <div className="relative">
  //         <img
  //           src={`${base_url}${specificDeal[0]?.imagePath}`}
  //           alt={specificDeal[0]?.dealName || "Product Image"}
  //           className="w-full rounded-lg"
  //         />
  //       </div>

  //       {/* Right: Product Details */}
  //       <div>
  //         <h1 className="text-3xl font-semibold text-gray-900">
  //           {specificDeal[0]?.dealName || "No Deal Name"}
  //         </h1>
  //         <p className="text-lg text-gray-600 mt-2">
  //           Rs {specificDeal[0]?.dealPrice || "N/A"}
  //         </p>
  //         <p className="text-gray-500 mt-4 leading-relaxed">
  //           {specificDeal[0]?.description || "No description available."}
  //         </p>

  //         {/* Product Features */}
  //         {specificDeal[0]?.servies?.length > 0 && (
  //           <ul className="mt-4 text-gray-600 space-y-1">
  //             {specificDeal.map((service, index) => {
  //               const isProductInCart = Array.isArray(cartItem)
  //                 ? cartItem.find((item) => item.dealId === service.id)
  //                 : null;

  //               return (
  //                 <li key={index}>
  //                   - {service.description || "No service description"}

  //                   {/* Add to Cart or Quantity Controls */}
  //                   <div className="mt-3">
  //                     {!isProductInCart ? (
  //                       <button
  //                         onClick={() =>
  //                           handleAdd({
  //                             dealId: service.id,
  //                             name: service.dealName,
  //                             description: service.description,
  //                             price: service.dealPrice,
  //                           })
  //                         }
  //                         className="mt-2 w-full bg-black text-white py-2 rounded-lg text-lg font-semibold hover:bg-gray-800 transition"
  //                       >
  //                         Add to Cart
  //                       </button>
  //                     ) : (
  //                       <div className="cart-quantity-controls flex items-center space-x-3 mt-2">
  //                         <button
  //                           onClick={() => dispatch(decreaseUserCartItemQty(service.id))}
  //                           className="px-3 py-1 bg-gray-300 rounded text-lg"
  //                         >
  //                           -
  //                         </button>
  //                         <span className="text-lg">{isProductInCart?.numberOfPerson || 1}</span>
  //                         <button
  //                           onClick={() => increaeDealPerson({ dealId: service.id })}
  //                           className="px-3 py-1 bg-gray-300 rounded text-lg"
  //                         >
  //                           +
  //                         </button>
  //                       </div>
  //                     )}
  //                   </div>
  //                 </li>
  //               );
  //             })}
  //           </ul>
  //         )}
  //       </div>
  //     </div>
  //   ) : (
  //     <p className="text-xl text-gray-500">No deal available.</p>
  //   )}
  // </div>


  // );


  // return (
  //   <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 md:p-8">
  //     {specificDeal && specificDeal.length > 0 ? (
  //       <>
  //         {/* Main Card Section */}
  //         <div className="bg-white p-8 rounded-xl shadow-2xl max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
  //           {/* Left: Product Image */}
  //           <div className="relative flex justify-center">
  //             <img
  //               src={`${base_url}${specificDeal[0]?.imagePath}`}
  //               alt={specificDeal[0]?.dealName || "Product Image"}
  //               className="w-full max-h-96 object-cover rounded-lg"
  //             />
  //           </div>

  //           {/* Right: Product Details */}
  //           <div className="flex flex-col justify-center space-y-4">
  //             <h1 className="text-3xl font-bold text-gray-900">
  //               {specificDeal[0]?.dealName || "No Deal Name"}
  //             </h1>
  //             <p className="text-xl font-semibold text-red-500">
  //               Rs {specificDeal[0]?.dealPrice || "N/A"}
  //             </p>
  //             <p className="text-gray-600 leading-relaxed text-base">
  //               {specificDeal[0]?.description || "No description available."}
  //             </p>

  //             {/* Product Features */}
  //             {specificDeal[0]?.servies?.length > 0 && (
  //               <ul className="mt-2 text-gray-600 space-y-2">
  //                 {specificDeal.map((service, index) => {
  //                   const isProductInCart = Array.isArray(cartItem)
  //                     ? cartItem.find((item) => item.dealId === service.id)
  //                     : null;

  //                   return (
  //                     <li key={index} className="flex flex-col space-y-2">
  //                       <span>- {service.description || "No service description"}</span>

  //                       {/* Add to Cart or Quantity Controls */}
  //                       <div>
  //                         {!isProductInCart ? (
  //                           <button
  //                             onClick={() =>
  //                               handleAdd({
  //                                 dealId: service.id,
  //                                 name: service.dealName,
  //                                 description: service.description,
  //                                 price: service.dealPrice,
  //                               })
  //                             }
  //                             className="mt-2 w-full bg-black text-white py-2 rounded-lg text-lg font-semibold hover:bg-gray-800 transition"
  //                           >
  //                             Add to Cart
  //                           </button>
  //                         ) : (
  //                           <div className="cart-quantity-controls flex items-center space-x-3 mt-2">
  //                             <button
  //                               onClick={() => dispatch(decreaseUserCartItemQty(service.id))}
  //                               className="px-3 py-1 bg-gray-300 rounded text-lg"
  //                             >
  //                               -
  //                             </button>
  //                             <span className="text-lg">{isProductInCart?.numberOfPerson || 1}</span>
  //                             <button
  //                               onClick={() => increaeDealPerson({ dealId: service.id })}
  //                               className="px-3 py-1 bg-gray-300 rounded text-lg"
  //                             >
  //                               +
  //                             </button>
  //                           </div>
  //                         )}
  //                       </div>
  //                     </li>
  //                   );
  //                 })}
  //               </ul>
  //             )}
  //           </div>
  //         </div>

  //         {/* Deals Slider Section */}
  //           {/* Slider Section */}
  //           {allDeals.length >= 4 && (
  //             <div className="mt-8 w-full max-w-6xl">
  //               <h2 className="text-2xl font-bold text-gray-900 mb-4">More Deals</h2>
  //               <Slider {...sliderSettings}>
  //                 {allDeals.map((deal, index) => (
  //                   <div key={index} className="px-2">
  //                     <img
  //                       src={base_url + deal.image}
  //                       alt={deal.deal_name}
  //                       className="w-full h-48 object-cover rounded-lg shadow-md cursor-pointer transition-transform duration-300 hover:scale-105"
  //                       onClick={() => handleViewDetails(deal.id)}
  //                     />
  //                   </div>
  //                 ))}
  //               </Slider>
  //             </div>
  //           )}


  //       </>
  //     ) : (
  //       <p className="text-xl text-gray-500">No deal available.</p>
  //     )}
  //   </div>
  // );


  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      {specificDeal && specificDeal.length > 0 ? (
        <>
          {/* Main Card Section */}
          <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: Product Image - Moderate Size */}
            <div className="relative flex justify-center">
              <img
                src={`${base_url}${specificDeal[0]?.imagePath}`}
                alt={specificDeal[0]?.dealName || "Product Image"}
                className="w-full h-[250px] sm:h-[300px] lg:h-[350px] object-cover rounded-lg"
              />
            </div>

            {/* Right: Product Details */}
            <div className="flex flex-col justify-center space-y-5">
              <h1 className="text-2xl sm:text-3xl font-bold text-[#9f5d1a] leading-tight">
                {specificDeal[0]?.dealName || "No Deal Name"}
              </h1>
              <p className="text-xl sm:text-2xl font-semibold text-[#7e3f25]">
                Rs {specificDeal[0]?.dealPrice?.toLocaleString("en-IN") || "N/A"}
              </p>
              <p className="text-[#7e3f25] text-sm sm:text-base leading-relaxed">
                {specificDeal[0]?.description || "No description available."}
              </p>

              {/* Product Features */}
              {specificDeal[0]?.servies?.length > 0 && (
                <ul className="mt-4 text-[#7e3f25] space-y-4">
                  {specificDeal.map((service, index) => {
                    const isProductInCart = Array.isArray(cartItem)
                      ? cartItem.find((item) => item.dealId === service.id)
                      : null;

                    return (
                      <li key={index} className="flex flex-col space-y-2">
                        <span className="text-sm sm:text-base">
                          - {service.description || "No service description"}
                        </span>

                        {/* Add to Cart or Quantity Controls */}
                        <div>
                          {!isProductInCart ? (
                            <button
                              onClick={() =>
                                handleAdd({
                                  dealId: service.id,
                                  name: service.dealName,
                                  description: service.description,
                                  price: service.dealPrice,
                                })
                              }
                              className="w-full bg-black text-white py-2 rounded-lg text-base sm:text-lg font-semibold hover:bg-gray-900 transition"
                            >
                              Add to Cart
                            </button>
                          ) : (
                            <div className="w-full bg-black text-white py-2 rounded-lg flex items-center justify-between px-4">
                              <button
                                onClick={() => dispatch(decreaseUserCartItemQty(service.id))}
                                className="w-10 h-10 bg-gray-300 text-black rounded-full flex items-center justify-center hover:bg-gray-400 transition text-lg font-semibold"
                              >
                                -
                              </button>
                              <span className="text-lg sm:text-xl text-white font-medium">
                                {isProductInCart?.numberOfPerson || 1}
                              </span>
                              <button
                                onClick={() => increaeDealPerson({ dealId: service.id })}
                                className="w-10 h-10 bg-gray-300 text-black rounded-full flex items-center justify-center hover:bg-gray-400 transition text-lg font-semibold"
                              >
                                +
                              </button>
                            </div>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>

          {/* Deals Slider Section */}
          {allDeals.length >= 4 && (
            <div className="mt-12 w-full max-w-5xl">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#9f5d1a] mb-6 text-center lg:text-left">
                More Deals You’ll Love
              </h2>
              <Slider {...sliderSettings}>
                {allDeals.map((deal, index) => (
                  <div key={index} className="px-2">
                    <img
                      src={`${base_url}${deal.image}`}
                      alt={deal.deal_name}
                      className="w-full h-40 sm:h-48 lg:h-56 object-cover rounded-lg shadow-sm cursor-pointer transition-transform duration-300 hover:scale-105"
                      onClick={() => handleViewDetails(deal.id)}
                    />
                  </div>
                ))}
              </Slider>
            </div>
          )}
        </>
      ) : (
        /* No Deals Available Layout */
        <div className="flex flex-col items-center justify-center h-full text-center py-20 px-4 max-w-md w-full">
          <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#9f5d1a] mb-4">No Deals Available</h2>
            <p className="text-[#7e3f25] text-base sm:text-lg leading-relaxed mb-6">
              It looks like there are no deals right now. Stay tuned for exciting offers!
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-black text-white py-2 px-6 rounded-lg text-base sm:text-lg font-semibold hover:bg-gray-900 transition"
            >
              Refresh
            </button>
          </div>
        </div>
      )}
    </div>
  );


};

export default DealDetails;
