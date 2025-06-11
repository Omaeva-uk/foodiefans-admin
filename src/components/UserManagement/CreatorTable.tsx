import React from "react";

interface Creator {
  avatar: string;
  displayName: string;
  username: string;
  email: string;
  featured: boolean;
  status: "active" | "inactive";
  verifiedEmail: boolean;
  verifiedId: boolean;
  verifiedAccount: boolean;
  updatedOn: string;
}

interface CreatorTableProps {
  creators: Creator[];
  onEdit: (creator: Creator) => void;
  onDelete: (creator: Creator) => void;
}

const CreatorTable: React.FC<CreatorTableProps> = ({ creators, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto shadow rounded-xl border border-gray-200">
      <table className="min-w-full bg-white border-collapse">
        <thead>
          <tr className="bg-gray-100 text-gray-700 text-sm">
            <th className="py-3 px-4 text-left">Avatar</th>
            <th className="py-3 px-4 text-left">Display Name</th>
            <th className="py-3 px-4 text-left">Username</th>
            <th className="py-3 px-4 text-left">Email</th>
            <th className="py-3 px-4 text-left">Featured</th>
            <th className="py-3 px-4 text-left">Status</th>
            <th className="py-3 px-4 text-left">Verified Email?</th>
            <th className="py-3 px-4 text-left">Verified ID?</th>
            <th className="py-3 px-4 text-left">Verified Account?</th>
            <th className="py-3 px-4 text-left">Updated On</th>
            <th className="py-3 px-4 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {creators.map((creator, index) => (
            <tr key={index} className="border-t border-gray-100 hover:bg-gray-50 text-sm">
              <td className="py-3 px-4">
                <img
                  src={creator.avatar}
                  alt={creator.displayName}
                  className="w-10 h-10 rounded-full object-cover"
                />
              </td>
              <td className="py-3 px-4 font-medium">{creator.displayName}</td>
              <td className="py-3 px-4 text-gray-600">@{creator.username}</td>
              <td className="py-3 px-4 text-gray-600">{creator.email}</td>
              <td className="py-3 px-4 text-center">
                {creator.featured ? (
                  <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full">Y</span>
                ) : (
                  <span className="bg-red-100 text-red-700 text-xs font-semibold px-2 py-1 rounded-full">N</span>
                )}
              </td>
              <td className="py-3 px-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    creator.status === "active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  }`}
                >
                  {creator.status}
                </span>
              </td>
              <td className="py-3 px-4 text-center">
                {creator.verifiedEmail ? (
                  <span className="text-green-600 font-semibold">Y</span>
                ) : (
                  <span className="text-red-600 font-semibold">N</span>
                )}
              </td>
              <td className="py-3 px-4 text-center">
                {creator.verifiedId ? (
                  <span className="text-green-600 font-semibold">Y</span>
                ) : (
                  <span className="text-red-600 font-semibold">N</span>
                )}
              </td>
              <td className="py-3 px-4 text-center">
                {creator.verifiedAccount ? (
                  <span className="text-green-600 font-semibold">Y</span>
                ) : (
                  <span className="text-red-600 font-semibold">N</span>
                )}
              </td>
              <td className="py-3 px-4 text-gray-600">{creator.updatedOn}</td>
              <td className="py-3 px-4 text-center flex gap-2 justify-center">
                <button
                  onClick={() => onEdit(creator)}
                  className="text-blue-500 hover:underline text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(creator)}
                  className="text-red-500 hover:underline text-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {creators.length === 0 && (
            <tr>
              <td colSpan={11} className="py-6 text-center text-gray-500">
                No creators found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CreatorTable;
