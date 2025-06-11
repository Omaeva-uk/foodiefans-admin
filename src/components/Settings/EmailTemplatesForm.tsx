import React, { useState, ChangeEvent } from 'react';

export default function EmailTemplatesForm() {
  const [activeTab, setActiveTab] = useState('marketing');
  const [formState, setFormState] = useState({
    welcomeEmail: 'Welcome to FoodieFan! We\'re excited to have you join our community of food enthusiasts and creators.\n\nHere\'s how to get started:\n1. Complete your profile\n2. Explore recipes and creators\n3. Save your favorite content',
    passwordResetEmail: 'You recently requested to reset your password for your FoodieFan account.\n\nPlease click the link below to reset your password:\n[PASSWORD_RESET_LINK]\n\nThis link will expire in 24 hours.',
    subscriptionConfirmationEmail: 'Thank you for subscribing to [CREATOR_NAME]\'s content.\n\nYou will now receive notifications when they share new recipes, techniques, and products.',
    orderConfirmationEmail: 'Thank you for your order #[ORDER_NUMBER]!\n\nOrder details:\n[ORDER_DETAILS]\n\nEstimated delivery: [DELIVERY_DATE]',
    marketingEmail: 'Check out the latest recipes and cooking tips from top creators on FoodieFan!\n\n[FEATURED_CONTENT]\n\nDiscover more on our platform.',
    newsletterEmail: 'FoodieFan Weekly Newsletter\n\nTop trending recipes this week:\n[WEEKLY_TRENDING]\n\nFeatured creator: [FEATURED_CREATOR]'
  });

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you would typically save to your backend
    alert('Email templates saved successfully!');
  };

  return (
    <div className="bg-white rounded-2xl shadow overflow-hidden">
      {/* Header */}
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-[#028b6e]">Email Templates</h2>
        <p className="text-gray-500 text-sm mt-1">Configure the emails sent to your FoodieFan users</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="px-6 flex space-x-4">
          <button
            onClick={() => setActiveTab('transactional')}
            className={`py-3 px-1 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'transactional'
                ? 'border-[#028b6e] text-[#028b6e]'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Transactional
          </button>
          <button
            onClick={() => setActiveTab('marketing')}
            className={`py-3 px-1 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'marketing'
                ? 'border-[#028b6e] text-[#028b6e]'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Marketing
          </button>
        </div>
      </div>

      {/* Form content */}
      <form onSubmit={handleSave} className="p-6">
        {/* Transactional Emails */}
        {activeTab === 'transactional' && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Welcome Email
              </label>
              <textarea
                name="welcomeEmail"
                value={formState.welcomeEmail}
                onChange={handleChange}
                rows={5}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#028b6e]/50 focus:border-[#028b6e] focus:outline-none"
              />
              <p className="text-xs text-gray-500 mt-1">Sent to users when they first create an account</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password Reset Email
              </label>
              <textarea
                name="passwordResetEmail"
                value={formState.passwordResetEmail}
                onChange={handleChange}
                rows={5}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#028b6e]/50 focus:border-[#028b6e] focus:outline-none"
              />
              <p className="text-xs text-gray-500 mt-1">Sent when users request a password reset</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subscription Confirmation
              </label>
              <textarea
                name="subscriptionConfirmationEmail"
                value={formState.subscriptionConfirmationEmail}
                onChange={handleChange}
                rows={5}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#028b6e]/50 focus:border-[#028b6e] focus:outline-none"
              />
              <p className="text-xs text-gray-500 mt-1">Sent when users subscribe to a creator</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Order Confirmation
              </label>
              <textarea
                name="orderConfirmationEmail"
                value={formState.orderConfirmationEmail}
                onChange={handleChange}
                rows={5}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#028b6e]/50 focus:border-[#028b6e] focus:outline-none"
              />
              <p className="text-xs text-gray-500 mt-1">Sent when users complete a purchase</p>
            </div>
          </div>
        )}

        {/* Marketing Emails */}
        {activeTab === 'marketing' && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Marketing Email
              </label>
              <textarea
                name="marketingEmail"
                value={formState.marketingEmail}
                onChange={handleChange}
                rows={5}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#028b6e]/50 focus:border-[#028b6e] focus:outline-none"
              />
              <p className="text-xs text-gray-500 mt-1">Promotional emails for platform features and content</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Newsletter Email
              </label>
              <textarea
                name="newsletterEmail"
                value={formState.newsletterEmail}
                onChange={handleChange}
                rows={5}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#028b6e]/50 focus:border-[#028b6e] focus:outline-none"
              />
              <p className="text-xs text-gray-500 mt-1">Regular newsletter sent to subscribed users</p>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <h3 className="text-sm font-medium text-yellow-800">Available Template Variables</h3>
              <ul className="mt-2 text-xs text-yellow-700 space-y-1">
                <li><strong>[USER_NAME]</strong> - The recipient&apos;s name</li>
                <li><strong>[CREATOR_NAME]</strong> - The creator&apos;s name</li>
                <li><strong>[ORDER_NUMBER]</strong> - The order reference number</li>
                <li><strong>[ORDER_DETAILS]</strong> - Details of purchased items</li>
                <li><strong>[DELIVERY_DATE]</strong> - Estimated delivery date</li>
                <li><strong>[PASSWORD_RESET_LINK]</strong> - Link to reset password</li>
                <li><strong>[FEATURED_CONTENT]</strong> - Featured recipes and products</li>
                <li><strong>[WEEKLY_TRENDING]</strong> - Trending content for newsletter</li>
                <li><strong>[FEATURED_CREATOR]</strong> - Featured creator profile</li>
              </ul>
            </div>
          </div>
        )}

        {/* Action buttons - shown on all tabs */}
        <div className="mt-8 pt-5 border-t border-gray-200 flex justify-end gap-3">
          <button
            type="button"
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
          >
            Preview Emails
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