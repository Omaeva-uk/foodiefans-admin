import AdminLayout from "../../components/Layout/AdminLayout";
import CouponTable from "../../components/Ecommerce/CouponTable";

// Define a proper interface for coupons
interface Coupon {
  code: string;
  discount: number;
  usageLimit: number;
  expiryDate: string;
  status: string;
  updatedOn: string;
}

const dummyCoupons: Coupon[] = [
  {
    code: "FOODIE10",
    discount: 10,
    usageLimit: 100,
    expiryDate: "31 Mar 2025",
    status: "active",
    updatedOn: "22 Mar 2025",
  },
  {
    code: "SAVE20",
    discount: 20,
    usageLimit: 50,
    expiryDate: "15 Mar 2025",
    status: "expired",
    updatedOn: "16 Mar 2025",
  },
];

export default function CouponsPage() {
  const handleEdit = (coupon: Coupon) => {
    alert(`Edit coupon: ${coupon.code}`);
  };
  
  const handleDelete = (coupon: Coupon) => {
    alert(`Delete coupon: ${coupon.code}`);
  };
  
  return (
    <AdminLayout>
      <div className="p-6 bg-gray-50 rounded-2xl shadow">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-[#028b6e]">Manage Coupons</h1>
        </div>
        <CouponTable coupons={dummyCoupons} onEdit={handleEdit} onDelete={handleDelete} />
      </div>
    </AdminLayout>
  );
}