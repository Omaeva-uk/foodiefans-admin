import React, { useState } from 'react';

export default function PlatformSettingsForm() {
  const [activeTab, setActiveTab] = useState('general');
  const [formState, setFormState] = useState({
    platformName: 'FoodieFan',
    platformDescription: 'A marketplace for food enthusiasts and creators to share recipes, cooking techniques, and culinary products.',
    platformEmail: 'admin@foodiefan.com',
    supportEmail: 'support@foodiefan.com',
    commissionRate: 15,
    minimumWithdrawal: 50,
    maintenanceMode: false,
    allowUserRegistration: true,
    enableCreatorApplication: true,
    notifyAdminNewUser: true,
    notifyAdminNewOrder: true,
    currency: 'GBP',
    dateFormat: 'DD/MM/YYYY',
    primaryColor: '#028b6e',
    secondaryColor: '#026655',
    logoPreview: '/logo.png',
    faviconPreview: '/favicon.ico'
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormState(prev => ({
          ...prev,
          [field]: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Here you would typically save to your backend
    alert('Settings saved successfully!');
  };

  return (
    <div className="bg-white rounded-2xl shadow overflow-hidden">
      {/* Header */}
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-[#028b6e]">Platform Settings</h2>
        <p className="text-gray-500 text-sm mt-1">Configure your FoodieFan marketplace settings</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="px-6 flex space-x-4">
          <button
            onClick={() => setActiveTab('general')}
            className={`py-3 px-1 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'general'
                ? 'border-[#028b6e] text-[#028b6e]'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            General
          </button>
          <button
            onClick={() => setActiveTab('appearance')}
            className={`py-3 px-1 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'appearance'
                ? 'border-[#028b6e] text-[#028b6e]'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Appearance
          </button>
          <button
            onClick={() => setActiveTab('financial')}
            className={`py-3 px-1 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'financial'
                ? 'border-[#028b6e] text-[#028b6e]'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Financial
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`py-3 px-1 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'notifications'
                ? 'border-[#028b6e] text-[#028b6e]'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Notifications
          </button>
          <button
            onClick={() => setActiveTab('advanced')}
            className={`py-3 px-1 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'advanced'
                ? 'border-[#028b6e] text-[#028b6e]'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Advanced
          </button>
        </div>
      </div>

      {/* Form content */}
      <form onSubmit={handleSave} className="p-6">
        {/* General Settings */}
        {activeTab === 'general' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Platform Name
                </label>
                <input
                  name="platformName"
                  value={formState.platformName}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#028b6e]/50 focus:border-[#028b6e] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Platform Email
                </label>
                <input
                  name="platformEmail"
                  type="email"
                  value={formState.platformEmail}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#028b6e]/50 focus:border-[#028b6e] focus:outline-none"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Platform Description
              </label>
              <textarea
                name="platformDescription"
                value={formState.platformDescription}
                onChange={handleChange}
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#028b6e]/50 focus:border-[#028b6e] focus:outline-none"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Support Email
                </label>
                <input
                  name="supportEmail"
                  type="email"
                  value={formState.supportEmail}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#028b6e]/50 focus:border-[#028b6e] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Currency
                </label>
                <select
                  name="currency"
                  value={formState.currency}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#028b6e]/50 focus:border-[#028b6e] focus:outline-none"
                >
                  <option value="GBP">British Pound (£)</option>
                  <option value="USD">US Dollar ($)</option>
                  <option value="EUR">Euro (€)</option>
                  <option value="CAD">Canadian Dollar (C$)</option>
                  <option value="AUD">Australian Dollar (A$)</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date Format
                </label>
                <select
                  name="dateFormat"
                  value={formState.dateFormat}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#028b6e]/50 focus:border-[#028b6e] focus:outline-none"
                >
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Registration Settings
              </label>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="allowUserRegistration"
                  name="allowUserRegistration"
                  checked={formState.allowUserRegistration}
                  onChange={handleChange}
                  className="h-4 w-4 text-[#028b6e] focus:ring-[#028b6e] rounded"
                />
                <label htmlFor="allowUserRegistration" className="ml-2 text-sm text-gray-600">
                  Allow new user registration
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="enableCreatorApplication"
                  name="enableCreatorApplication"
                  checked={formState.enableCreatorApplication}
                  onChange={handleChange}
                  className="h-4 w-4 text-[#028b6e] focus:ring-[#028b6e] rounded"
                />
                <label htmlFor="enableCreatorApplication" className="ml-2 text-sm text-gray-600">
                  Enable creator applications
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Appearance Settings */}
        {activeTab === 'appearance' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Platform Logo
                </label>
                <div className="flex items-center gap-4">
                  {formState.logoPreview && (
                    <img 
                      src={formState.logoPreview} 
                      alt="Logo Preview" 
                      className="h-16 w-auto object-contain border border-gray-200 rounded p-1" 
                    />
                  )}
                  <div className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, 'logoPreview')}
                      className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                    />
                    <p className="text-xs text-gray-500 mt-1">Recommended size: 200x50px</p>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Favicon
                </label>
                <div className="flex items-center gap-4">
                  {formState.faviconPreview && (
                    <img 
                      src={formState.faviconPreview} 
                      alt="Favicon Preview" 
                      className="h-10 w-auto object-contain border border-gray-200 rounded p-1" 
                    />
                  )}
                  <div className="flex-1">
                    <input
                      type="file"
                      accept="image/x-icon,image/png"
                      onChange={(e) => handleFileChange(e, 'faviconPreview')}
                      className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                    />
                    <p className="text-xs text-gray-500 mt-1">Recommended size: 32x32px</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Primary Color
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    name="primaryColor"
                    value={formState.primaryColor}
                    onChange={handleChange}
                    className="w-12 h-10 p-1 border border-gray-300 rounded"
                  />
                  <input
                    type="text"
                    name="primaryColor"
                    value={formState.primaryColor}
                    onChange={handleChange}
                    className="flex-1 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#028b6e]/50 focus:border-[#028b6e] focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Secondary Color
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    name="secondaryColor"
                    value={formState.secondaryColor}
                    onChange={handleChange}
                    className="w-12 h-10 p-1 border border-gray-300 rounded"
                  />
                  <input
                    type="text"
                    name="secondaryColor"
                    value={formState.secondaryColor}
                    onChange={handleChange}
                    className="flex-1 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#028b6e]/50 focus:border-[#028b6e] focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Financial Settings */}
        {activeTab === 'financial' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Creator Commission Rate (%)
                </label>
                <input
                  type="number"
                  name="commissionRate"
                  value={formState.commissionRate}
                  onChange={handleChange}
                  min="0"
                  max="100"
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#028b6e]/50 focus:border-[#028b6e] focus:outline-none"
                />
                <p className="text-xs text-gray-500 mt-1">Platform fee charged on creator sales</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Minimum Withdrawal Amount
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                    {formState.currency === 'GBP' ? '£' : 
                     formState.currency === 'USD' ? '$' : 
                     formState.currency === 'EUR' ? '€' : 
                     formState.currency === 'CAD' ? 'C$' : 
                     formState.currency === 'AUD' ? 'A$' : ''}
                  </span>
                  <input
                    type="number"
                    name="minimumWithdrawal"
                    value={formState.minimumWithdrawal}
                    onChange={handleChange}
                    min="0"
                    className="w-full p-3 pl-8 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#028b6e]/50 focus:border-[#028b6e] focus:outline-none"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Minimum amount creators can withdraw</p>
              </div>
            </div>
          </div>
        )}

        {/* Notification Settings */}
        {activeTab === 'notifications' && (
          <div className="space-y-6">
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Admin Notifications
              </label>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="notifyAdminNewUser"
                  name="notifyAdminNewUser"
                  checked={formState.notifyAdminNewUser}
                  onChange={handleChange}
                  className="h-4 w-4 text-[#028b6e] focus:ring-[#028b6e] rounded"
                />
                <label htmlFor="notifyAdminNewUser" className="ml-2 text-sm text-gray-600">
                  Notify admins of new user registrations
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="notifyAdminNewOrder"
                  name="notifyAdminNewOrder"
                  checked={formState.notifyAdminNewOrder}
                  onChange={handleChange}
                  className="h-4 w-4 text-[#028b6e] focus:ring-[#028b6e] rounded"
                />
                <label htmlFor="notifyAdminNewOrder" className="ml-2 text-sm text-gray-600">
                  Notify admins of new orders
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Advanced Settings */}
        {activeTab === 'advanced' && (
          <div className="space-y-6">
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                System Settings
              </label>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="maintenanceMode"
                  name="maintenanceMode"
                  checked={formState.maintenanceMode}
                  onChange={handleChange}
                  className="h-4 w-4 text-[#028b6e] focus:ring-[#028b6e] rounded"
                />
                <label htmlFor="maintenanceMode" className="ml-2 text-sm text-gray-600">
                  Enable maintenance mode
                </label>
              </div>
              <p className="text-xs text-gray-500 mt-1 ml-6">
                When enabled, the site will display a maintenance message to users
              </p>
            </div>
          </div>
        )}

        {/* Action buttons - shown on all tabs */}
        <div className="mt-8 pt-5 border-t border-gray-200 flex justify-end gap-3">
          <button
            type="button"
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-[#028b6e] text-white rounded-xl shadow hover:bg-[#026655] transition-colors"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}