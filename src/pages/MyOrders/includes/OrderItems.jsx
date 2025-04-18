import { Table } from "./ui/table";

const OrderItemList = (_, record) => {
  const price = `Rs ${record.salePrice}`;
  let name = record.title;
  return (
    <div className="flex items-center">
      <div className="relative flex h-16 w-16 shrink-0 overflow-hidden rounded">
        <img
          className="h-full w-full object-cover"
          src={record?.image_path + record?.product_img?.image}
          alt={`Product ${record.id}`}
        />
      </div>

      <div className="flex flex-col overflow-hidden ml-4">
        <div className="mb-1 flex space-x-1 ">
          <div className="inline-block overflow-hidden truncate text-sm text-body transition-colors hover:text-accent hover:underline">
            {name}
          </div>
        </div>
        <span className="mb-1 inline-block overflow-hidden truncate text-sm font-semibold text-accent">
          {price}
        </span>
      </div>
    </div>
  );
};
export const OrderItems = ({ products, orderId, orderStatus }) => {
  const orderTableColumns = [
    {
      title: <span className="pl-20 ">{"Item"}</span>,
      dataIndex: "items",
      key: "items",
      align: "left",
      width: 250,
      ellipsis: true,
      render: OrderItemList,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      align: "center",
      width: 100,
      render: function renderQuantity(quantity) {
        return <p className="text-base">{quantity}</p>;
      },
    },
    {
      title: "Price",
      dataIndex: "salePrice",
      key: "salePrice",
      align: "right",
      width: 100,
      render: function RenderPrice(salePrice) {
        const price = `Rs ${salePrice}`;

        return <div>{price}</div>;
      },
    },
  ];

  return (
    <Table
      columns={orderTableColumns}
      data={products}
      className="orderDetailsTable w-full"
      rowClassName="!cursor-auto"
      scroll={{ x: 350, y: 500 }}
    />
  );
};
