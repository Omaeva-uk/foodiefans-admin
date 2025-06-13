import AdminLayout from "../../components/Layout/AdminLayout";
import WalletTransactionsTable from "../../components/Wallet/WalletTransactionsTable";

export default function WalletPage() {
  return (
    <AdminLayout>
      <div className="p-6 bg-gray-50 rounded-2xl shadow">
        
        <WalletTransactionsTable />
      </div>
    </AdminLayout>
  );
}
