import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProgressSpinner } from "primereact/progressspinner";
import { getSpecificServiceDetails } from "../../store/AsynMethod/ServiceMethod";
import '../../styles/ServiceDetails.scss';
import massageImage from '../../assets/images/masaag-image1.jpg'; // Replace with your image path
import { useNavigate, useParams } from "react-router-dom";
import { getCategoriesWithSubCategories, getServicePrices, getspecificDeal } from "../../store/AsynMethod/ProductMethod";
import { base_url } from "../../api/backend";
import './DealsDetails.scss';
import { all } from "axios";
import { IoLogoWhatsapp } from "react-icons/io5";
import { IoCall } from "react-icons/io5";
import {getAllDeals} from "../../store/AsynMethod/ProductMethod";
import { getUserCartItem, increaseUserCartItemQty } from "../../store/AsynMethod/CartMethod";

import {
    addItemToCart,
    decreaseUserCartItemQty,
  } from "../../store/AsynMethod/CartMethod";




// const DealView = () => {
//     const navigate = useNavigate();

//     const { id } = useParams();
//     const dispatch = useDispatch();
//     // const { specificservice } = useSelector((state) => state.ServiceReducers);
//     const { specificDeal } = useSelector((state) => state.ProductReducers);

//     const { categoriesWithSub } = useSelector((state) => state.ProductReducers);
//     // const [specificCategory, setSpecificCategory] = useState({});
//     const { allDeals } = useSelector((state) => state.ProductReducers);
//     // const testDeal = [{id: 1, image: '/files-1739224091628-313762804.png', name: 'test', description: 'test', price: 100}];

//     useEffect(() => {
//         dispatch(getAllDeals());
//       }, [dispatch]);

//     useEffect(() => {

//         debugger
//         console.log(allDeals);
//     }, [allDeals]);


//     const handleViewDetails = (id) => {
//         navigate(`/deal-details/${id}`);
//     };

//     return (
//         <div className="min-h-screen bg-gray-100 p-10">
//             <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {allDeals && allDeals.length > 0 ? (
//                     allDeals.map((deal) => (
//                         <div
//                             key={deal.id}
//                             className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition"
//                         >
//                             <img
//                                 src={`${base_url}${deal.image}`}
//                                 alt={deal.deal_name}
//                                 className="w-full h-48 object-cover rounded-md"
//                             />
//                             <h3 className="text-lg font-semibold mt-3">{deal.deal_name}</h3>
//                             <p className="text-gray-600 mt-1">Rs {deal.deal_price}</p>
//                             <p className="text-gray-500 mt-2 text-sm">{deal.deal_description}</p>
//                             <button style={{ cursor: 'pointer' }} onClick={() => handleViewDetails(deal.id)} className="mt-4 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition">
//                                 View
//                             </button>
//                         </div>
//                     ))
//                 ) : (
//                     <p className="text-xl text-gray-500">No deals available.</p>
//                 )}
//             </div>
//         </div>
//     );





// };



function DealView({ deal, varientId }) {
    const [quantity, setQuantity] = useState(0);
    const { cartItem } = useSelector((state) => state.CartReducers);
    const { user } = useSelector((state) => state.AuthReducers);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { allDeals } = useSelector((state) => state.ProductReducers);

  
    // useEffect(() => {
    //     dispatch(getUserCartItem());
    //     dispatch(getAllDeals());
    //   }, [dispatch]);


    useEffect(() => {
        dispatch(getUserCartItem());
        dispatch(getAllDeals());

      }, [dispatch]);
    
      useEffect(() => {
        if(cartItem){
            
        }

      }, [cartItem]);
    

      const handleAdd = (deal) => {
        dispatch(addItemToCart(deal));
      };

      const increaeDealPerson = (deal) => {
        dispatch(increaseUserCartItemQty(deal));
      };

      

      const handleViewDetails = (id) => {
            navigate(`/deal-details/${id}`);
        };

    const isProductInCart = cartItem?.find(
      (item) =>
        item?.product_id === deal?.id &&
        item?.varient_id === deal?.varients[varientId]?.varient_id
    );
  

    // return (
    //     <div className="min-h-screen bg-gray-100 p-10">
    //       <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    //         {allDeals && allDeals.length > 0 ? (
    //           allDeals.map((deal) => {
    //             const isProductInCart = Array.isArray(cartItem)
    //               ? cartItem.find((item) => item.dealId === deal.id)
    //               : null;
    //             console.log(isProductInCart, "dddd");
      
    //             return (
    //               <div
    //                 key={deal.id}
    //                 className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition"
    //               >
    //                 <div className="cursor-pointer">
    //                   <img
    //                     src={`${base_url}${deal.image}`}
    //                     alt={deal.title}
    //                     className="w-full h-48 object-cover rounded-md"
    //                     onClick={() => handleViewDetails(deal.id)}
    //                   />
    //                 </div>
      
    //                 <h3 className="text-lg font-semibold mt-3">{deal.title}</h3>
    //                 <p className="text-gray-600 mt-1">RS {deal.deal_price?.toLocaleString("en-IN")}</p>
    //                 <p className="text-gray-500 mt-2 text-sm">{deal.deal_description}</p>
      
    //                 <div className="addToCart-section">
    //                   {!isProductInCart ? (
    //                     deal.deal_price > 0 ? (
    //                       <button
    //                         onClick={() =>
    //                           handleAdd({
    //                             dealId: deal.id,
    //                             name: deal.deal_name,
    //                             description: deal.deal_description,
    //                             price: deal.deal_price,
    //                           })
    //                         }
    //                         className="mt-4 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
    //                       >
    //                         Add
    //                       </button>
    //                     ) : (
    //                       <span className="text-red-500">Out of Stock</span>
    //                     )
    //                   ) : (
    //                     <div className="cart-quantity-controls flex items-center space-x-2">
    //                       <button
    //                         onClick={() => dispatch(decreaseUserCartItemQty(isProductInCart.dealId))}
    //                         className="px-2 py-1 bg-gray-300 rounded"
    //                       >
    //                         -
    //                       </button>
    //                       <span>{isProductInCart?.numberOfPerson || 1}</span>
    //                       <button
    //                         onClick={() =>
    //                             increaeDealPerson({
    //                             dealId: deal.id,
    //                           })
    //                         }
    //                         className="px-2 py-1 bg-gray-300 rounded"
    //                       >
    //                         +
    //                       </button>
    //                     </div>
    //                   )}
    //                 </div>
    //               </div>
    //             );
    //           })
    //         ) : (
    //           <p className="text-xl text-gray-500">No deals available.</p>
    //         )}
    //       </div>
    //     </div>
    //   );
      

    return (
      <>
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Header */}
          <div className="mb-10 text-center lg:text-left">
            <h1 className="text-4xl font-extrabold text-[#9f5d1a] tracking-tight">
              Featured Deals
            </h1>
            <p className="mt-3 text-lg text-[#7e3f25] max-w-2xl mx-auto lg:mx-0">
              Discover our handpicked collection of exclusive offers and unbeatable prices
            </p>
            <div className="mt-4 h-1 w-20 bg-[#9f5d1a] mx-auto lg:mx-0 rounded-full"></div>
          </div>
    
          <div className="flex flex-col lg:flex-row gap-8">
            {/* <div className="lg:w-1/4">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4 text-[#9f5d1a]">Filters</h2>
                
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-[#7e3f25] mb-2">Price Range</h3>
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between mt-2 text-sm text-[#7e3f25]">
                    <span>Rs0</span>
                    <span>Rs10,000</span>
                  </div>
                </div>
    
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-[#7e3f25] mb-2">Category</h3>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded text-[#9f5d1a]" />
                      <span className="ml-2 text-sm text-[#7e3f25]">Electronics</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded text-[#9f5d1a]" />
                      <span className="ml-2 text-sm text-[#7e3f25]">Fashion</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded text-[#9f5d1a]" />
                      <span className="ml-2 text-sm text-[#7e3f25]">Home</span>
                    </label>
                  </div>
                </div>
    
                <div>
                  <h3 className="text-sm font-medium text-[#7e3f25] mb-2">Availability</h3>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded text-[#9f5d1a]" />
                    <span className="ml-2 text-sm text-[#7e3f25]">In Stock Only</span>
                  </label>
                </div>
    
                <button className="mt-6 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-900 transition">
                  Apply Filters
                </button>
              </div>
            </div> */}
    
    <div className="lg:w-4/1">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {allDeals && allDeals.length > 0 ? (
      allDeals.map((deal) => {
        const isProductInCart = Array.isArray(cartItem)
          ? cartItem.find((item) => item.dealId === deal.id)
          : null;

        return (
          <div
            key={deal.id}
            className="bg-white rounded-xl shadow-sm overflow-hidden transform transition-all hover:scale-105 hover:shadow-md"
          >
            <div className="relative">
              <img
                src={`${base_url}${deal.image}`}
                alt={deal.title}
                className="w-full h-56 object-cover cursor-pointer"
                onClick={() => handleViewDetails(deal.id)}
              />
              {deal.deal_price === 0 && (
                <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  Out of Stock
                </span>
              )}
            </div>

            <div className="p-5">
              <h3 className="text-lg font-semibold text-[#9f5d1a] truncate">{deal.title}</h3>
              <p className="text-[#7e3f25] font-medium mt-1">
                Rs {deal.deal_price?.toLocaleString("en-IN")}
              </p>
              <p className="text-[#7e3f25] text-sm mt-2 line-clamp-2">{deal.deal_description}</p>

              <div className="mt-4">
                {!isProductInCart ? (
                  deal.deal_price > 0 && (
                    <button
                      onClick={() =>
                        handleAdd({
                          dealId: deal.id,
                          name: deal.deal_name,
                          description: deal.deal_description,
                          price: deal.deal_price,
                        })
                      }
                      className="w-full bg-[#9f5d1a] text-white py-2 rounded-lg hover:bg-[#7e3f25] transition"
                    >
                      Add to Cart
                    </button>
                  )
                ) : (
                  <div className="flex items-center justify-between bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => dispatch(decreaseUserCartItemQty(isProductInCart.dealId))}
                      className="px-3 py-1 bg-white text-black rounded-md hover:bg-gray-200"
                    >
                      -
                    </button>
                    <span className="text-[#7e3f25] font-medium">
                      {isProductInCart?.numberOfPerson || 1}
                    </span>
                    <button
                      onClick={() => increaeDealPerson({ dealId: deal.id })}
                      className="px-3 py-1 bg-white text-black rounded-md hover:bg-gray-200"
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })
    ) : (
      <div className="col-span-full text-center py-12">
        <p className="text-xl text-[#9f5d1a]">No deals available at the moment.</p>
        <p className="text-[#7e3f25] mt-2">Check back later for exciting offers!</p>
      </div>
    )}
  </div>
</div>
          </div>
        </div>
      </div>

      <div className="floating-buttons">
  <a
    href="https://wa.me/+923091113535"
    className="floating-btn whatsapp"
    target="_blank"
    rel="noopener noreferrer"
    onClick={(e) => {
      e.preventDefault();
      window.open("https://wa.me/+923091113535", "_blank");
    }}
  >
    <IoLogoWhatsapp />
    <span className="number">WHATSAPP NOW</span>
  </a>
  <a
    href="tel:+923091113535"
    className="floating-btn phone"
    onClick={(e) => {
      if (!navigator.userAgent.match(/Mobi/i)) {
        e.preventDefault();
        alert("Calling is only available on mobile devices.");
      }
    }}
  >
    <IoCall />
    <span className="number">REQUEST CALL BACK</span>
  </a>
</div>       

      </>
    );
    

  }


export default DealView;
