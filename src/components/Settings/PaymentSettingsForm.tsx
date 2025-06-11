import React, { useState } from 'react';

export default function PaymentSettingsForm() {
  const [activeTab, setActiveTab] = useState('general');
  const [formState, setFormState] = useState({
    // General payment settings
    defaultCurrency: 'GBP',
    currencySymbol: '£',
    decimalPlaces: 2,
    payoutThreshold: 50,
    processingFee: 2.9,
    processingFeeCurrency: 'percentage', 
    taxRate: 20,
    
    // Payment providers
    stripeEnabled: true,
    stripePublicKey: 'pk_test_123456789',
    stripeSecretKey: '••••••••••••••••••••••',
    paypalEnabled: true,
    paypalClientId: 'client_id_123456789',
    paypalClientSecret: '••••••••••••••••••••••',
    
    // Payout methods
    bankTransferEnabled: true,
    paypalPayoutEnabled: true,
    minimumBankTransfer: 100,
    minimumPaypalPayout: 25,
    
    // Invoicing
    enableInvoices: true,
    invoicePrefix: 'FOODIE-',
    companyName: 'FoodieFan Ltd',
    companyAddress: '123 Food Street, London, UK',
    companyVatNumber: 'GB123456789',
    
    // Advanced settings
    automaticPayouts: false,
    payoutSchedule: 'monthly', // 'weekly', 'biweekly', 'monthly'
    payoutDayOfWeek: 1, // Monday = 1, Sunday = 7
    payoutDayOfMonth: 1,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked } = target;
    setFormState(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically save to your backend
    alert('Payment settings saved successfully!');
  };

  return (
    <div className="bg-white rounded-2xl shadow overflow-hidden">
      {/* Header */}
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-[#028b6e]">Payment Settings</h2>
        <p className="text-gray-500 text-sm mt-1">Configure how payments and payouts work on your platform</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="px-6 flex space-x-4 overflow-x-auto">
          <button
            onClick={() => setActiveTab('general')}
            className={`py-3 px-1 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'general'
                ? 'border-[#028b6e] text-[#028b6e]'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            General
          </button>
          <button
            onClick={() => setActiveTab('providers')}
            className={`py-3 px-1 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'providers'
                ? 'border-[#028b6e] text-[#028b6e]'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Payment Providers
          </button>
          <button
            onClick={() => setActiveTab('payouts')}
            className={`py-3 px-1 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'payouts'
                ? 'border-[#028b6e] text-[#028b6e]'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Payout Methods
          </button>
          <button
            onClick={() => setActiveTab('invoicing')}
            className={`py-3 px-1 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'invoicing'
                ? 'border-[#028b6e] text-[#028b6e]'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Invoicing
          </button>
          <button
            onClick={() => setActiveTab('advanced')}
            className={`py-3 px-1 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${
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
        {/* General Payment Settings */}
        {activeTab === 'general' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Default Currency
                </label>
                <select
                  name="defaultCurrency"
                  value={formState.defaultCurrency}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#028b6e]/50 focus:border-[#028b6e] focus:outline-none"
                >
                  <option value="GBP">British Pound (GBP)</option>
                  <option value="USD">US Dollar (USD)</option>
                  <option value="EUR">Euro (EUR)</option>
                  <option value="CAD">Canadian Dollar (CAD)</option>
                  <option value="AUD">Australian Dollar (AUD)</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">Currency used throughout the platform</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Currency Symbol
                </label>
                <input
                  name="currencySymbol"
                  value={formState.currencySymbol}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#028b6e]/50 focus:border-[#028b6e] focus:outline-none"
                />
                <p className="text-xs text-gray-500 mt-1">Symbol displayed before prices (£, $, €, etc.)</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Decimal Places
                </label>
                <select
                  name="decimalPlaces"
                  value={formState.decimalPlaces}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#028b6e]/50 focus:border-[#028b6e] focus:outline-none"
                >
                  <option value="0">0 (e.g., £50)</option>
                  <option value="1">1 (e.g., £50.5)</option>
                  <option value="2">2 (e.g., £50.50)</option>
                  <option value="3">3 (e.g., £50.500)</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">Number of decimal places for prices</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Payout Threshold
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                    {formState.currencySymbol}
                  </span>
                  <input
                    type="number"
                    name="payoutThreshold"
                    value={formState.payoutThreshold}
                    onChange={handleChange}
                    min="0"
                    className="w-full p-3 pl-8 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#028b6e]/50 focus:border-[#028b6e] focus:outline-none"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Minimum earnings for withdrawal</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Processing Fee
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    name="processingFee"
                    value={formState.processingFee}
                    onChange={handleChange}
                    min="0"
                    step="0.1"
                    className="flex-1 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#028b6e]/50 focus:border-[#028b6e] focus:outline-none"
                  />
                  <select
                    name="processingFeeCurrency"
                    value={formState.processingFeeCurrency}
                    onChange={handleChange}
                    className="w-28 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#028b6e]/50 focus:border-[#028b6e] focus:outline-none"
                  >
                    <option value="percentage">%</option>
                    <option value="fixed">{formState.currencySymbol}</option>
                  </select>
                </div>
                <p className="text-xs text-gray-500 mt-1">Fee charged per transaction</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tax Rate (%)
                </label>
                <input
                  type="number"
                  name="taxRate"
                  value={formState.taxRate}
                  onChange={handleChange}
                  min="0"
                  max="100"
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#028b6e]/50 focus:border-[#028b6e] focus:outline-none"
                />
                <p className="text-xs text-gray-500 mt-1">Default tax rate applied to transactions</p>
              </div>
            </div>
          </div>
        )}

        {/* Payment Providers */}
        {activeTab === 'providers' && (
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-xl mb-6">
              <div className="flex items-start">
                <div className="flex items-center h-6">
                  <input
                    id="stripeEnabled"
                    name="stripeEnabled"
                    type="checkbox"
                    checked={formState.stripeEnabled}
                    onChange={handleChange}
                    className="h-4 w-4 text-[#028b6e] focus:ring-[#028b6e] rounded"
                  />
                </div>
                <div className="ml-3 flex items-center">
                  <svg className="h-6 w-6 mr-2" viewBox="0 0 24 24" fill="#635BFF">
                    <path d="M13.07 12.11c0-1.33-.96-1.33-1.36-1.33h-1.27v2.66h1.27c.4 0 1.36 0 1.36-1.33zm-1.36-2.65c.5 0 1.03 0 1.03-.97s-.53-.97-1.03-.97H10.44v1.94h1.27zm6.99-4.32H5.29c-.7 0-1.27.57-1.27 1.27v11.17c0 .7.57 1.27 1.27 1.27h13.41c.7 0 1.27-.57 1.27-1.27V6.41c0-.7-.57-1.27-1.27-1.27zM13.07 14.3h-2.63V8.35h2.62c1.5 0 2.41.77 2.41 1.91 0 .74-.41 1.28-1 1.5.87.2 1.33.8 1.33 1.62.01 1.25-.93 1.92-2.73 1.92z" />
                  </svg>
                  <span className="text-sm font-medium text-gray-700">Enable Stripe Payments</span>
                </div>
              </div>
              
              {formState.stripeEnabled && (
                <div className="mt-4 ml-7 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Stripe Public Key
                    </label>
                    <input
                      name="stripePublicKey"
                      value={formState.stripePublicKey}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#028b6e]/50 focus:border-[#028b6e] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Stripe Secret Key
                    </label>
                    <input
                      type="password"
                      name="stripeSecretKey"
                      value={formState.stripeSecretKey}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#028b6e]/50 focus:border-[#028b6e] focus:outline-none"
                    />
                  </div>
                </div>
              )}
            </div>
            
            <div className="bg-gray-50 p-4 rounded-xl">
              <div className="flex items-start">
                <div className="flex items-center h-6">
                  <input
                    id="paypalEnabled"
                    name="paypalEnabled"
                    type="checkbox"
                    checked={formState.paypalEnabled}
                    onChange={handleChange}
                    className="h-4 w-4 text-[#028b6e] focus:ring-[#028b6e] rounded"
                  />
                </div>
                <div className="ml-3 flex items-center">
                  <svg className="h-6 w-6 mr-2" viewBox="0 0 24 24" fill="#0070BA">
                    <path d="M20.9 9.5c.1.8 0 1.3-.3 2-.9 2.2-3.8 3-6.9 3h-.6c-.5 0-.9.4-1 .9l-.1.4-.6 3.5-.1.3c-.1.5-.5.8-1 .8h-2c-.3 0-.5-.2-.4-.6l.8-5.1v-.1c0-.5.4-.9 1-.9h1.2c2.9 0 5.2-.6 5.9-2.5.3-.7.3-1.3.1-1.8m-7.5-4.3c.1-.5.5-.8 1-.8h4.3c.3 0 .6 0 .9.1.1 0 .2 0 .3.1h.1c.1 0 .3.1.4.1.1 0 .1 0 .2.1.4.2.7.5.8.9V6c-.2-.9-.9-1.3-1.9-1.5-.4-.1-.8-.1-1.3-.1h-4.3c-.5 0-1 .4-1.1.9L10.1 14H8L9.4 5.2z" />
                  </svg>
                  <span className="text-sm font-medium text-gray-700">Enable PayPal Payments</span>
                </div>
              </div>
              
              {formState.paypalEnabled && (
                <div className="mt-4 ml-7 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      PayPal Client ID
                    </label>
                    <input
                      name="paypalClientId"
                      value={formState.paypalClientId}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#028b6e]/50 focus:border-[#028b6e] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      PayPal Client Secret
                    </label>
                    <input
                      type="password"
                      name="paypalClientSecret"
                      value={formState.paypalClientSecret}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#028b6e]/50 focus:border-[#028b6e] focus:outline-none"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Payout Methods */}
        {activeTab === 'payouts' && (
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-xl mb-6">
              <div className="flex items-start">
                <div className="flex items-center h-6">
                  <input
                    id="bankTransferEnabled"
                    name="bankTransferEnabled"
                    type="checkbox"
                    checked={formState.bankTransferEnabled}
                    onChange={handleChange}
                    className="h-4 w-4 text-[#028b6e] focus:ring-[#028b6e] rounded"
                  />
                </div>
                <div className="ml-3">
                  <label htmlFor="bankTransferEnabled" className="text-sm font-medium text-gray-700">
                    Enable Bank Transfer Payouts
                  </label>
                  <p className="text-xs text-gray-500 mt-1">
                    Allow creators to receive payments via direct bank transfer
                  </p>
                </div>
              </div>
              
              {formState.bankTransferEnabled && (
                <div className="mt-4 ml-7">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Minimum Bank Transfer Amount
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                      {formState.currencySymbol}
                    </span>
                    <input
                      type="number"
                      name="minimumBankTransfer"
                      value={formState.minimumBankTransfer}
                      onChange={handleChange}
                      min="0"
                      className="w-full p-3 pl-8 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#028b6e]/50 focus:border-[#028b6e] focus:outline-none"
                    />
                  </div>
                </div>
              )}
            </div>
            
            <div className="bg-gray-50 p-4 rounded-xl">
              <div className="flex items-start">
                <div className="flex items-center h-6">
                  <input
                    id="paypalPayoutEnabled"
                    name="paypalPayoutEnabled"
                    type="checkbox"
                    checked={formState.paypalPayoutEnabled}
                    onChange={handleChange}
                    className="h-4 w-4 text-[#028b6e] focus:ring-[#028b6e] rounded"
                  />
                </div>
                <div className="ml-3">
                  <label htmlFor="paypalPayoutEnabled" className="text-sm font-medium text-gray-700">
                    Enable PayPal Payouts
                  </label>
                  <p className="text-xs text-gray-500 mt-1">
                    Allow creators to receive payments via PayPal
                  </p>
                </div>
              </div>
              
              {formState.paypalPayoutEnabled && (
                <div className="mt-4 ml-7">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Minimum PayPal Payout Amount
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                      {formState.currencySymbol}
                    </span>
                    <input
                      type="number"
                      name="minimumPaypalPayout"
                      value={formState.minimumPaypalPayout}
                      onChange={handleChange}
                      min="0"
                      className="w-full p-3 pl-8 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#028b6e]/50 focus:border-[#028b6e] focus:outline-none"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Invoicing */}
        {activeTab === 'invoicing' && (
          <div className="space-y-6">
            <div className="flex items-start mb-4">
              <div className="flex items-center h-6">
                <input
                  id="enableInvoices"
                  name="enableInvoices"
                  type="checkbox"
                  checked={formState.enableInvoices}
                  onChange={handleChange}
                  className="h-4 w-4 text-[#028b6e] focus:ring-[#028b6e] rounded"
                />
              </div>
              <div className="ml-3">
                <label htmlFor="enableInvoices" className="text-sm font-medium text-gray-700">
                  Enable Automatic Invoicing
                </label>
                <p className="text-xs text-gray-500 mt-1">
                  Automatically generate invoices for all transactions
                </p>
              </div>
            </div>
            
            {formState.enableInvoices && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Invoice Number Prefix
                  </label>
                  <input
                    name="invoicePrefix"
                    value={formState.invoicePrefix}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#028b6e]/50 focus:border-[#028b6e] focus:outline-none"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Prefix added to all invoice numbers (e.g., INV-, FOODIE-, etc.)
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company Name
                  </label>
                  <input
                    name="companyName"
                    value={formState.companyName}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#028b6e]/50 focus:border-[#028b6e] focus:outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company Address
                  </label>
                  <textarea
                    name="companyAddress"
                    value={formState.companyAddress}
                    onChange={handleChange}
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#028b6e]/50 focus:border-[#028b6e] focus:outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    VAT/Tax Number
                  </label>
                  <input
                    name="companyVatNumber"
                    value={formState.companyVatNumber}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#028b6e]/50 focus:border-[#028b6e] focus:outline-none"
                  />
                </div>
              </>
            )}
          </div>
        )}

        {/* Advanced Payment Settings */}
        {activeTab === 'advanced' && (
          <div className="space-y-6">
            <div className="flex items-start mb-4">
              <div className="flex items-center h-6">
                <input
                  id="automaticPayouts"
                  name="automaticPayouts"
                  type="checkbox"
                  checked={formState.automaticPayouts}
                  onChange={handleChange}
                  className="h-4 w-4 text-[#028b6e] focus:ring-[#028b6e] rounded"
                />
              </div>
              <div className="ml-3">
                <label htmlFor="automaticPayouts" className="text-sm font-medium text-gray-700">
                  Enable Automatic Payouts
                </label>
                <p className="text-xs text-gray-500 mt-1">
                  Automatically process payouts on a scheduled basis
                </p>
              </div>
            </div>
            
            {formState.automaticPayouts && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Payout Schedule
                  </label>
                  <select
                    name="payoutSchedule"
                    value={formState.payoutSchedule}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#028b6e]/50 focus:border-[#028b6e] focus:outline-none"
                  >
                    <option value="weekly">Weekly</option>
                    <option value="biweekly">Bi-weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
                
                {formState.payoutSchedule === 'weekly' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Day of Week
                    </label>
                    <select
                      name="payoutDayOfWeek"
                      value={formState.payoutDayOfWeek}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#028b6e]/50 focus:border-[#028b6e] focus:outline-none"
                    >
                      <option value="1">Monday</option>
                      <option value="2">Tuesday</option>
                      <option value="3">Wednesday</option>
                      <option value="4">Thursday</option>
                      <option value="5">Friday</option>
                      <option value="6">Saturday</option>
                      <option value="7">Sunday</option>
                    </select>
                  </div>
                )}
                
                {formState.payoutSchedule === 'monthly' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Day of Month
                    </label>
                    <input
                      type="number"
                      name="payoutDayOfMonth"
                      value={formState.payoutDayOfMonth}
                      onChange={handleChange}
                      min="1"
                      max="28"
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#028b6e]/50 focus:border-[#028b6e] focus:outline-none"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Choose a day between 1-28 (to avoid month-end issues)
                    </p>
                  </div>
                )}
              </>
            )}
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