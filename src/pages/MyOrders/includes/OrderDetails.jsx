// import { useModalAction } from "@/components/ui/modal/modal.context";
// import { SadFaceIcon } from "@/components/icons/sad-face";
// import Badge from "@/components/ui/badge";
//import OrderViewHeader from "./order-view-header";

import { OrderItems } from "./OrderItems";
import OrderViewHeader from "./OrderViewHeader";

// const RenderStatusBadge = ({ status }) => {
//   switch (status.toLowerCase()) {
//     case "approved":
//       return (
//         <Badge
//           text={`${"text-refund"} ${"text-approved"}`}
//           color="bg-accent"
//           className="mr-4"
//         />
//       );

//     case "rejected":
//       return (
//         <Badge
//           text={`${"text-refund"} ${"text-rejected"}`}
//           color="bg-red-500"
//           className="mr-4"
//         />
//       );
//     case "processing":
//       return (
//         <Badge
//           text={`${"text-refund"} ${"text-processing"}`}
//           color="bg-yellow-500"
//           className="mr-4 "
//         />
//       );
//     // case 'pending':
//     default:
//       return (
//         <Badge
//           text={`${"text-refund"} ${"text-pending"}`}
//           color="bg-purple-500"
//           className="mr-4 "
//         />
//       );
//   }
// };

// function RefundView({ status, orderId }) {
//   const { openModal } = useModalAction();
//   return (
//     <>
//       {status ? (
//         <RenderStatusBadge status={status} />
//       ) : (
//         <button
//           className="flex items-center text-sm font-semibold text-body transition-colors hover:text-accent disabled:cursor-not-allowed disabled:text-gray-400 disabled:hover:text-gray-400 mr-4"
//           onClick={() => openModal("REFUND_REQUEST", orderId)}
//           disabled={Boolean(status)}
//         >
//           <SadFaceIcon width={18} className="mr-2" />
//           {"text-ask-refund"}
//         </button>
//       )}
//     </>
//   );
// }

const OrderDetails = ({ order }) => {
  const {
    id,
    products,
    status,
    user,
    billing_address,
    shipping_address,
    contact,
  } = order ?? {};

  const amount = `Rs ${order.total_sales}`;
  const discount = `Rs ${order.total_discount}`;
  const total = `Rs ${order.total_amount}`;

  return (
    <div className="flex w-full flex-col border border-border-200 bg-white lg:w-2/3">
      <div className="flex flex-col items-center p-5 md:flex-row md:justify-between">
        <h2 className="mb-2 flex text-sm font-semibold text-heading md:text-lg">
          {"Order Details"} <span className="px-2">-</span> {order.id}
        </h2>
      </div>
      <div className="relative mx-5 mb-6 overflow-hidden rounded">
        <OrderViewHeader
          order={order}
          wrapperClassName="px-7 py-4"
          buttonSize="small"
        />
      </div>

      <div className="flex flex-col border-b border-border-200 sm:flex-row">
        <div className="flex w-full flex-col border-b border-border-200 px-5 py-4 sm:border-b-0 sm:border-r md:w-3/5">
          <div className="mb-4">
            <span className="mb-2 block text-sm font-bold text-heading">
              {"Contact Number"}
            </span>
            <div>
              <span className="text-sm text-body">{contact}</span>
            </div>
          </div>
          <div className="mb-4">
            <span className="mb-2 block text-sm font-bold text-heading">
              {"Shipping Address"}
            </span>
            <div>
              <span className="text-sm text-body">{shipping_address}</span>
            </div>
          </div>

          <div>
            <span className="mb-2 block text-sm font-bold text-heading">
              {"Billing Address"}
            </span>
            <div>
              <span className="text-sm text-body">{billing_address}</span>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col px-5 py-4 md:w-2/5">
          <div className="mb-3 flex justify-between">
            <span className="text-sm text-body">{"Sub Total"}</span>
            <span className="text-sm text-heading">{amount}</span>
          </div>

          <div className="mb-3 flex justify-between">
            <span className="text-sm text-body">{"Discount"}</span>
            <span className="text-sm text-heading">{discount}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-sm font-bold text-heading">{"Total"}</span>
            <span className="text-sm font-bold text-heading">{total}</span>
          </div>
        </div>
      </div>

      {/* Order Table */}
      <div>
        <OrderItems
          products={order?.products}
          orderId={order?.id}
          orderStatus={order?.status}
        />
      </div>
    </div>
  );
};

export default OrderDetails;

function formatAddress(address) {
  if (!address) return;
  const temp = ["street_address", "state", "city", "zip", "country"].reduce(
    (acc, k) => ({ ...acc, [k]: address[k] }),
    {}
  );
  const formattedAddress = Object.fromEntries(
    Object.entries(temp).filter(([_, v]) => Boolean(v))
  );
  return Object.values(formattedAddress).join(", ");
}
