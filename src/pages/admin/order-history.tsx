import AdminLayout from "../../components/Layout/AdminLayout";
import OrderHistoryTable from "../../components/Ecommerce/OrderHistoryTable";

// Define interface for order objects
interface Order {
  orderId: string;
  user: string;
  userAvatar: string;
  amount: string;
  paymentStatus: string;
  orderStatus: string;
  placedOn: string;
}

const dummyOrders: Order[] = [
  {
    orderId: "ORD-1001",
    user: "John Doe",
    userAvatar: "/avatar1.png",
    amount: "£50.00",
    paymentStatus: "Paid",
    orderStatus: "Completed",
    placedOn: "20 Mar 2025",
  },
  {
    orderId: "ORD-1002",
    user: "Jane Smith",
    userAvatar: "/avatar2.png",
    amount: "£25.00",
    paymentStatus: "Pending",
    orderStatus: "Processing",
    placedOn: "21 Mar 2025",
  },
  {
    orderId: "ORD-1003",
    user: "Sam Wilson",
    userAvatar: "/avatar3.png",
    amount: "£30.00",
    paymentStatus: "Failed",
    orderStatus: "Cancelled",
    placedOn: "19 Mar 2025",
  },
];

export default function OrderHistoryPage() {
  const handleView = (order: Order) => {
    alert(`Viewing order ${order.orderId}`);
  };

  const handleRefund = (order: Order) => {
    alert(`Initiate refund for order ${order.orderId}`);
  };

  return (
    <AdminLayout>
      <div className="p-6 bg-gray-50 rounded-2xl shadow">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-[#028b6e]">Order History</h1>
        </div>
        <OrderHistoryTable orders={dummyOrders} onView={handleView} onRefund={handleRefund} />
      </div>
    </AdminLayout>
  );
}