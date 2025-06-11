import React from "react";

interface Coupon {
  code: string;
  discount: number;
  usageLimit: number;
  expiryDate: string;
  status: "active" | "expired";
  updatedOn: string;
}

interface CouponTableProps {
  coupons: Coupon[];
  onEdit: (coupon: Coupon) => void;
  onDelete: (coupon: Coupon) => void;
}

const CouponTable: React.FC<CouponTableProps> = ({ coupons, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto shadow rounded-xl border border-gray-200">
      <table className="min-w-full bg-white border-collapse">
        <thead>
          <tr className="bg-gray-100 text-gray-700 text-sm">
            <th className="py-3 px-4 text-left">Code</th>
            <th className="py-3 px-4 text-left">Discount (%)</th>
            <th className="py-3 px-4 text-left">Usage Limit</th>
            <th className="py-3 px-4 text-left">Expiry Date</th>
            <th className="py-3 px-4 text-left">Status</th>
            <th className="py-3 px-4 text-left">Updated On</th>
            <th className="py-3 px-4 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {coupons.map((coupon, index) => (
            <tr key={index} className="border-t border-gray-100 hover:bg-gray-50 text-sm">
              <td className="py-3 px-4 font-medium">{coupon.code}</td>
              <td className="py-3 px-4 text-gray-600">{coupon.discount}%</td>
              <td className="py-3 px-4 text-gray-600">{coupon.usageLimit}</td>
              <td className="py-3 px-4 text-gray-600">{coupon.expiryDate}</td>
              <td className="py-3 px-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    coupon.status === "active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  }`}
                >
                  {coupon.status}
                </span>
              </td>
              <td className="py-3 px-4 text-gray-600">{coupon.updatedOn}</td>
              <td className="py-3 px-4 text-center flex gap-2 justify-center">
                <button onClick={() => onEdit(coupon)} className="text-blue-500 hover:underline text-sm">
                  Edit
                </button>
                <button onClick={() => onDelete(coupon)} className="text-red-500 hover:underline text-sm">
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {coupons.length === 0 && (
            <tr>
              <td colSpan={7} className="py-6 text-center text-gray-500">
                No coupons found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CouponTable;
