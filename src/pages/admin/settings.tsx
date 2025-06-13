import AdminLayout from "../../components/Layout/AdminLayout";
import PlatformSettingsForm from "../../components/Settings/PlatformSettingsForm";
import PaymentSettingsForm from "../../components/Settings/PaymentSettingsForm";
import EmailTemplatesForm from "../../components/Settings/EmailTemplatesForm";
import SocialLinksForm from "../../components/Settings/SocialLinksForm";
import ContactInfoForm from "../../components/Settings/ContactInfoForm";
import { useState } from "react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("platform");

  return (
    <AdminLayout>
      <div className="p-6 bg-gray-50 rounded-2xl shadow">
        <h1 className="text-2xl font-bold text-[#028b6e] mb-6">Settings</h1>

        <div className="flex gap-4 mb-6">
          {["platform", "payment", "email", "social", "contact"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl shadow text-sm font-semibold ${
                activeTab === tab
                  ? "bg-[#028b6e] text-white"
                  : "bg-white hover:bg-gray-100 text-[#028b6e]"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)} Settings
            </button>
          ))}
        </div>

        {activeTab === "platform" && <PlatformSettingsForm />}
        {activeTab === "payment" && <PaymentSettingsForm />}
        {activeTab === "email" && <EmailTemplatesForm />}
        {activeTab === "social" && <SocialLinksForm />}
        {activeTab === "contact" && <ContactInfoForm />}
      </div>
    </AdminLayout>
  );
}
