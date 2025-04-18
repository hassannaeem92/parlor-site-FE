import Collapse from "rc-collapse";
import "rc-collapse/assets/index.css";
import OrderCard from "./OrderCard";
import OrderDetails from "./OrderDetails";
import { useState } from "react";

const OrderListMobile = ({ orders }) => {
  const [selectedOrder, setSelectedOrder] = useState(null);

  return (
    <div className="flex w-full flex-col lg:hidden">
      <div className="flex h-full w-full flex-col px-0 pb-5">
        <h3 className="pb-5 text-xl font-semibold text-heading">
          {"My Orders"}
        </h3>
        <Collapse
          accordion={true}
          defaultActiveKey="active"
          expandIcon={() => null}
        >
          {orders.map((order, index) => (
            <Collapse.Panel
              header={
                <OrderCard
                  key={`mobile_${index}`}
                  order={order}
                  onClick={() => setSelectedOrder(order)}
                  isActive={order?.id === selectedOrder?.id}
                />
              }
              headerClass="accordion-title"
              key={index}
              className="mb-4"
            >
              {selectedOrder && <OrderDetails order={selectedOrder} />}
            </Collapse.Panel>
          ))}
        </Collapse>
      </div>
    </div>
  );
};

export default OrderListMobile;
