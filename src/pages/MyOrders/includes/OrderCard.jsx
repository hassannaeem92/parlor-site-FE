import dayjs from "dayjs";
import cn from "classnames";
import StatusColor from "./ui/status-color";

const OrderCard = ({ onClick, order, isActive }) => {
  const { id, status, created_at } = order;
  const amount = `Rs ${order?.total_sales}`;
  const total = `Rs ${order?.total_amount}`;

  return (
    <div
      onClick={onClick}
      role="button"
      className={cn(
        "mb-4 flex w-full shrink-0 cursor-pointer flex-col overflow-hidden rounded border-2 border-transparent bg-gray-100 last:mb-0",
        isActive === true && "!border-accent"
      )}
    >
      <div className="flex items-center justify-between border-b border-border-200 py-3 px-5 md:px-3 lg:px-5 ">
        <span className="flex shrink-0 text-sm font-bold text-heading  mr-4 lg:text-base">
          {"Order"}
          <span className="font-normal">#{id}</span>
        </span>
        <span
          className={`max-w-full truncate whitespace-nowrap rounded ${StatusColor(
            order?.status
          )} px-3 py-2 text-sm`}
          title={status}
        >
          {status}
        </span>
      </div>

      <div className="flex flex-col p-5 md:p-3 lg:px-4 lg:py-5">
        <p className="mb-4 flex w-full items-center justify-between text-sm text-heading last:mb-0">
          <span className="w-24 shrink-0 overflow-hidden">{"Order Date"}</span>
          <span className=" mr-auto ">:</span>
          <span className=" ml-1 ">
            {created_at
              ? dayjs(created_at).format("MMMM D, YYYY")
              : dayjs(new Date()).format("MMMM D, YYYY")}
          </span>
        </p>
        <p className="mb-4 flex w-full items-center justify-between text-sm text-heading last:mb-0">
          <span className="w-24 shrink-0 overflow-hidden">
            {"Delivery Time"}
          </span>
          <span className=" mr-auto  ">:</span>
          <span className="truncate  ml-1 ">{"Express Delivery"}</span>
        </p>
        <p className="mb-4 flex w-full items-center justify-between text-sm font-bold text-heading last:mb-0">
          <span className="w-24 shrink-0 overflow-hidden">{"Amount"}</span>
          <span className=" mr-auto ">:</span>
          <span className=" ml-1">{amount}</span>
        </p>
        <p className="mb-4 flex w-full items-center justify-between text-sm font-bold text-heading last:mb-0">
          <span className="w-24 flex-shrink-0 overflow-hidden">
            {"Total Price"}
          </span>
          <span className=" mr-auto ">:</span>
          <span className=" ml-1 ">{total}</span>
        </p>
      </div>
    </div>
  );
};

export default OrderCard;
