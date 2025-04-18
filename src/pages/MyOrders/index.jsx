import React, { useState, useEffect } from "react";
import Scrollbar from "./includes/ui/scrollbar.jsx";
import { useDispatch, useSelector } from "react-redux";
import { ProgressSpinner } from "primereact/progressspinner";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { getOrders } from "../../store/AsynMethod/OrderMethod.js";
import OrderCard from "./includes/OrderCard.jsx";
import OrderDetails from "./includes/OrderDetails.jsx";
import OrderListMobile from "./includes/OrderListMobile.jsx";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Index(props) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.AuthReducers);
  const { allOrders } = useSelector((state) => state.OrderReducer);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const shopNow = (e) => {
    e.preventDefault();
    navigate("/#productList");
    setTimeout(() => {
      const elementPosition = productListRef.current.offsetTop;
      const offset = 5000;
      window.scrollTo({
        top: elementPosition + offset,
        behavior: "smooth",
      });
    }, 0);
  };

  useEffect(() => {
    setIsLoading(true);
    dispatch(getOrders(user.id))
      .then(() => {
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    dispatch(getOrders(user.id));
  }, []);

  useEffect(() => {
    if (allOrders.length > 0) {
      setSelectedOrder(allOrders[0]);
    }
  }, [allOrders]);

  const renderContent = () => {
    if (allOrders.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center h-full">
          <p className="text-xl font-semibold text-gray-600 mb-4">
            No order history available
          </p>
          <Link
            className="py-2 px-4 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition duration-300 ease-in-out no-underline"
            to="/#productList"
            onClick={shopNow}
          >
            Start Shopping
          </Link>
        </div>
      );
    }

    return (
      <>
        <div className="px-5">
          {allOrders.map((order, index) => (
            <OrderCard
              key={index}
              order={order}
              onClick={() => setSelectedOrder(order)}
              isActive={order?.id === selectedOrder?.id}
            />
          ))}
        </div>
        <div className="px-5 mt-4">
          <Link
            className="block w-full text-center py-2 px-4 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition duration-300 ease-in-out no-underline"
            to="/#productList"
            onClick={shopNow}
          >
            Continue Shopping
          </Link>
        </div>
      </>
    );
  };

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <ProgressSpinner />
        </div>
      ) : (
        <div className="flex flex-col items-start w-full px-5 py-10 mx-auto max-w-1920 bg-light lg:bg-gray-100 xl:flex-row xl:py-14 xl:px-8 2xl:px-14">
          <div className="hidden w-full overflow-hidden lg:flex">
            <div className="h-[80vh] min-h-[670px] w-full pr-5 md:w-1/3 md:shrink-0 lg:pr-5 ">
              <div className="flex h-full flex-col bg-white pb-5 md:border md:border-border-200">
                <h3 className="py-5 px-5 text-xl font-semibold text-heading">
                  {"My Orders"}
                </h3>
                <Scrollbar
                  className="w-full"
                  style={{ height: "calc(100% - 80px)" }}
                >
                  {renderContent()}
                </Scrollbar>
              </div>
            </div>
            {selectedOrder && <OrderDetails order={selectedOrder} />}
          </div>
        </div>
      )}
      <OrderListMobile orders={allOrders} />
    </>
  );
}

export default Index;
