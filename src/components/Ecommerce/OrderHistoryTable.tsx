import React from "react";

interface Order {
  orderId: string;
  user: string;
  userAvatar: string;
  amount: string;
  paymentStatus: "Paid" | "Failed" | "Pending";
  orderStatus: "Completed" | "Cancelled" | "Processing";
  placedOn: string;
}

interface OrderHistoryTableProps {
  orders: Order[];
  onView: (order: Order) => void;
  onRefund: (order: Order) => void;
}

const OrderHistoryTable: React.FC<OrderHistoryTableProps> = ({ orders, onView, onRefund }) => {
  return (
    <div className="overflow-x-auto shadow rounded-xl border border-gray-200">
      <table className="min-w-full bg-white border-collapse">
        <thead>
          <tr className="bg-gray-100 text-gray-700 text-sm">
            <th className="py-3 px-4 text-left">Order ID</th>
            <th className="py-3 px-4 text-left">User</th>
            <th className="py-3 px-4 text-left">Amount</th>
            <th className="py-3 px-4 text-left">Payment Status</th>
            <th className="py-3 px-4 text-left">Order Status</th>
            <th className="py-3 px-4 text-left">Placed On</th>
            <th className="py-3 px-4 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index} className="border-t border-gray-100 hover:bg-gray-50 text-sm">
              <td className="py-3 px-4 font-medium">{order.orderId}</td>
              <td className="py-3 px-4 flex gap-2 items-center">
                <img src={order.userAvatar} alt={order.user} className="w-8 h-8 rounded-full" />
                <span>{order.user}</span>
              </td>
              <td className="py-3 px-4 text-gray-600">{order.amount}</td>
              <td className="py-3 px-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    order.paymentStatus === "Paid"
                      ? "bg-green-100 text-green-700"
                      : order.paymentStatus === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {order.paymentStatus}
                </span>
              </td>
              <td className="py-3 px-4">{order.orderStatus}</td>
              <td className="py-3 px-4 text-gray-600">{order.placedOn}</td>
              <td className="py-3 px-4 flex justify-center gap-2">
                <button
                  onClick={() => onView(order)}
                  className="text-blue-500 hover:underline text-sm"
                >
                  View
                </button>
                {order.paymentStatus === "Paid" && order.orderStatus === "Completed" && (
                  <button
                    onClick={() => onRefund(order)}
                    className="text-red-500 hover:underline text-sm"
                  >
                    Refund
                  </button>
                )}
              </td>
            </tr>
          ))}
          {orders.length === 0 && (
            <tr>
              <td colSpan={7} className="py-6 text-center text-gray-500">
                No orders found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrderHistoryTable;
