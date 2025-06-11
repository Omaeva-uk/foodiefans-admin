import React from "react";

interface Fan {
  avatar: string;
  displayName: string;
  username: string;
  email: string;
  status: "active" | "inactive";
  verified: boolean;
  updatedOn: string;
}

interface FanTableProps {
  fans: Fan[];
  onEdit: (fan: Fan) => void;
  onDelete: (fan: Fan) => void;
}

const FanTable: React.FC<FanTableProps> = ({ fans = [], onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto shadow rounded-xl border border-gray-200">
      <table className="min-w-full bg-white border-collapse">
        <thead>
          <tr className="bg-gray-100 text-gray-700 text-sm">
            <th className="py-3 px-4 text-left">Avatar</th>
            <th className="py-3 px-4 text-left">Display Name</th>
            <th className="py-3 px-4 text-left">Username</th>
            <th className="py-3 px-4 text-left">Email</th>
            <th className="py-3 px-4 text-left">Status</th>
            <th className="py-3 px-4 text-left">Verified Email?</th>
            <th className="py-3 px-4 text-left">Updated On</th>
            <th className="py-3 px-4 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(fans) && fans.length > 0 ? (
            fans.map((fan, index) => (
              <tr key={index} className="border-t border-gray-100 hover:bg-gray-50 text-sm">
                <td className="py-3 px-4">
                  <img
                    src={fan.avatar}
                    alt={fan.displayName}
                    className="w-10 h-10 rounded-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/placeholder-avatar.jpg";
                    }}
                  />
                </td>
                <td className="py-3 px-4 font-medium">{fan.displayName}</td>
                <td className="py-3 px-4 text-gray-600">@{fan.username}</td>
                <td className="py-3 px-4 text-gray-600">{fan.email}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      fan.status === "active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    }`}
                  >
                    {fan.status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  {fan.verified ? (
                    <span className="text-green-600 font-semibold">Yes</span>
                  ) : (
                    <span className="text-red-600 font-semibold">No</span>
                  )}
                </td>
                <td className="py-3 px-4 text-gray-600">{fan.updatedOn}</td>
                <td className="py-3 px-4 text-center flex gap-2 justify-center">
                  <button
                    onClick={() => onEdit(fan)}
                    className="text-blue-500 hover:underline text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(fan)}
                    className="text-red-500 hover:underline text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={8} className="py-6 text-center text-gray-500">
                No fans found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FanTable;