import React, { useRef, useState } from 'react';

const dummyWalletTransactions = [
  {
    id: "TXN-9875",
    user: "John Doe",
    avatar: "/avatar1.jpg",
    userType: "Fan",
    transactionType: "Credit",
    amount: 50,
    date: "22 Mar 2025",
    time: "14:35",
    status: "Success",
    notes: "Membership purchase"
  },
  {
    id: "TXN-9874",
    user: "Jamie Oliver",
    avatar: "/avatar2.jpg",
    userType: "Creator",
    transactionType: "Debit",
    amount: 200,
    date: "21 Mar 2025",
    time: "10:12",
    status: "Success",
    notes: "Earnings withdrawal"
  },
  {
    id: "TXN-9873",
    user: "Gordon Ramsay",
    avatar: "/avatar3.jpg",
    userType: "Creator",
    transactionType: "Credit",
    amount: 150,
    date: "20 Mar 2025",
    time: "09:45",
    status: "Pending",
    notes: "Cookbook sales"
  },
  {
    id: "TXN-9872",
    user: "Mary Berry",
    avatar: "/avatar1.jpg",
    userType: "Creator",
    transactionType: "Debit",
    amount: 120,
    date: "19 Mar 2025",
    time: "16:30",
    status: "Success",
    notes: "Monthly payout"
  },
  {
    id: "TXN-9871",
    user: "Nigella Lawson",
    avatar: "/avatar1.jpg",
    userType: "Creator",
    transactionType: "Credit",
    amount: 75,
    date: "19 Mar 2025",
    time: "11:22",
    status: "Failed",
    notes: "Payment processing error"
  }
];

export default function WalletTransactionsTable() {
  const [statusFilter, setStatusFilter] = useState('all');
  const [transactionTypeFilter, setTransactionTypeFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const erroredImages = useRef(new Set());

  const handleImageError = (user, e) => {
    if (erroredImages.current.has(user)) return;
    
    erroredImages.current.add(user);
    e.target.src = "/avatar-placeholder.jpg";
  };

  // Apply filters
  const filteredTransactions = dummyWalletTransactions.filter(txn => {
    const matchesStatus = statusFilter === 'all' || txn.status === statusFilter;
    const matchesType = transactionTypeFilter === 'all' || txn.transactionType === transactionTypeFilter;
    const matchesSearch = searchQuery === '' || 
      txn.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      txn.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesStatus && matchesType && matchesSearch;
  });

  // Calculate totals
  const creditTotal = filteredTransactions
    .filter(txn => txn.transactionType === "Credit" && txn.status === "Success")
    .reduce((sum, txn) => sum + txn.amount, 0);
  
  const debitTotal = filteredTransactions
    .filter(txn => txn.transactionType === "Debit" && txn.status === "Success")
    .reduce((sum, txn) => sum + txn.amount, 0);

  return (
    <div className="bg-white shadow rounded-2xl overflow-hidden">
      {/* Header with filters */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-bold text-[#028b6e]">Wallet Transactions</h2>
            <p className="text-gray-500 text-sm mt-1">Recent platform financial activities</p>
          </div>
          <div className="flex gap-3">
            <div className="bg-[#028b6e]/10 px-4 py-2 rounded-xl">
              <div className="text-xs text-[#028b6e]">Credits</div>
              <div className="text-lg font-bold text-[#028b6e]">£{creditTotal.toFixed(2)}</div>
            </div>
            <div className="bg-gray-100 px-4 py-2 rounded-xl">
              <div className="text-xs text-gray-600">Debits</div>
              <div className="text-lg font-bold text-gray-700">£{debitTotal.toFixed(2)}</div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          {/* Search input */}
          <div className="relative flex-grow max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="text"
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#028b6e]/50"
              placeholder="Search by user or transaction ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {/* Status filter */}
          <div>
            <select
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#028b6e]/50"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="Success">Success</option>
              <option value="Pending">Pending</option>
              <option value="Failed">Failed</option>
            </select>
          </div>
          
          {/* Transaction type filter */}
          <div>
            <select
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#028b6e]/50"
              value={transactionTypeFilter}
              onChange={(e) => setTransactionTypeFilter(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="Credit">Credits</option>
              <option value="Debit">Debits</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Transactions table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-600 border-b border-gray-200">
              <th className="py-3 px-4 font-semibold">Transaction ID</th>
              <th className="py-3 px-4 font-semibold">User</th>
              <th className="py-3 px-4 font-semibold">User Type</th>
              <th className="py-3 px-4 font-semibold">Transaction</th>
              <th className="py-3 px-4 font-semibold">Amount</th>
              <th className="py-3 px-4 font-semibold">Date & Time</th>
              <th className="py-3 px-4 font-semibold">Status</th>
              <th className="py-3 px-4 font-semibold">Notes</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length > 0 ? filteredTransactions.map((txn, idx) => (
              <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4 font-medium text-[#028b6e]">{txn.id}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <img 
                      src={txn.avatar} 
                      alt={txn.user} 
                      className="w-8 h-8 rounded-full object-cover border border-gray-200" 
                      onError={(e) => handleImageError(txn.user, e)}
                    />
                    <span className="font-medium">{txn.user}</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    txn.userType === "Creator" 
                      ? "bg-blue-100 text-blue-700" 
                      : "bg-purple-100 text-purple-700"
                  }`}>
                    {txn.userType}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-1.5">
                    <span className={`${
                      txn.transactionType === "Credit" 
                        ? "text-green-600" 
                        : "text-gray-600"
                    }`}>
                      {txn.transactionType === "Credit" ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </span>
                    {txn.transactionType}
                  </div>
                </td>
                <td className={`py-3 px-4 font-medium ${
                  txn.transactionType === "Credit" 
                    ? "text-green-600" 
                    : "text-gray-600"
                }`}>
                  £{txn.amount.toFixed(2)}
                </td>
                <td className="py-3 px-4">
                  <div>{txn.date}</div>
                  <div className="text-xs text-gray-500">{txn.time}</div>
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      txn.status === "Success"
                        ? "bg-green-100 text-green-700"
                        : txn.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {txn.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-gray-600 max-w-[200px] truncate" title={txn.notes}>
                  {txn.notes}
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={8} className="py-6 text-center text-gray-500">
                  No transactions found matching your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Footer with pagination */}
      <div className="p-4 flex items-center justify-between text-sm border-t border-gray-100">
        <div className="text-gray-500">
          Showing {filteredTransactions.length} of {dummyWalletTransactions.length} transactions
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled>
            Previous
          </button>
          <button className="px-2 py-1 rounded bg-[#028b6e] text-white">1</button>
          <button className="px-2 py-1 rounded hover:bg-gray-100 transition-colors">2</button>
          <button className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-50 transition-colors">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}