import cn from "classnames";
import StatusColor from "./ui/status-color";
import Badge from "./ui/badge";

export default function OrderViewHeader({
  order,
  wrapperClassName = "lg:px-11 lg:py-5 p-6",
  buttonSize = "medium",
}) {
  return (
    <div className={cn(`bg-[#F7F8FA] ${wrapperClassName}`)}>
      <div className="flex flex-col flex-wrap items-center justify-between mb-0 text-base font-bold gap-x-8 text-heading sm:flex-row lg:flex-nowrap">
        <div className="flex items-center gap-3">
          <span className="block text-xs shrink-0 grow-0 basis-auto xs:text-base lg:inline-block">
            {"Order Status"} :
          </span>
          <div className="w-full lg:w-auto">
            <Badge
              text={order?.status}
              color={StatusColor(order?.status)}
              className="min-h-[2rem] items-center justify-center text-[9px] !leading-none xs:text-sm"
            />
          </div>
        </div>
        <div className="flex items-center gap-3 md:ml-auto">
          <span className="block text-xs shrink-0 grow-0 basis-auto xs:text-base lg:inline-block">
            {"Payment Status"} :
          </span>
          <div className="w-full lg:w-auto">
            <Badge
              text={order?.payment_status === 1 ? "Paid" : "Not Paid"}
              color={StatusColor("payment-success")}
              className="min-h-[2rem] items-center justify-center truncate whitespace-nowrap text-[9px] !leading-none xs:text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
