import React, { useState, ChangeEvent } from 'react';

export default function ContactInfoForm() {
  const [contactInfo, setContactInfo] = useState({
    supportEmail: 'support@foodiefan.com',
    supportPhone: '+44 20 1234 5678',
    supportHours: 'Monday - Friday, 9:00 AM - 5:00 PM GMT',
    supportAddress: '123 FoodieFan Street\nLondon, SW1A 1AA\nUnited Kingdom',
    contactFormEnabled: true
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    // Type guard for checkbox inputs
    const finalValue = type === 'checkbox' 
      ? (e.target as HTMLInputElement).checked 
      : value;

    setContactInfo(prev => ({
      ...prev,
      [name]: finalValue
    }));
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you would typically save to your backend
    alert('Contact information saved successfully!');
  };

  return (
    <div className="bg-white rounded-2xl shadow overflow-hidden">
      {/* Header */}
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-[#028b6e]">Contact Information</h2>
        <p className="text-gray-500 text-sm mt-1">Set your FoodieFan support contact details for users</p>
      </div>

      {/* Form content */}
      <form onSubmit={handleSave} className="p-6">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Support Email
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
                  </svg>
                </span>
                <input
                  type="email"
                  name="supportEmail"
                  placeholder="support@example.com"
                  value={contactInfo.supportEmail}
                  onChange={handleChange}
                  className="w-full p-3 pl-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#028b6e]/50 focus:border-[#028b6e] focus:outline-none"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">The email address where users can contact support</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Support Phone
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/>
                  </svg>
                </span>
                <input
                  type="tel"
                  name="supportPhone"
                  placeholder="+1 (555) 123-4567"
                  value={contactInfo.supportPhone}
                  onChange={handleChange}
                  className="w-full p-3 pl-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#028b6e]/50 focus:border-[#028b6e] focus:outline-none"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Include country code for international users</p>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Support Hours
            </label>
            <input
              type="text"
              name="supportHours"
              placeholder="Monday - Friday, 9:00 AM - 5:00 PM"
              value={contactInfo.supportHours}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#028b6e]/50 focus:border-[#028b6e] focus:outline-none"
            />
            <p className="text-xs text-gray-500 mt-1">Specify your business hours and timezone</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Support Address
            </label>
            <textarea
              name="supportAddress"
              placeholder="Enter your physical address"
              rows={3}
              value={contactInfo.supportAddress}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#028b6e]/50 focus:border-[#028b6e] focus:outline-none"
            />
            <p className="text-xs text-gray-500 mt-1">Address will be displayed in the contact page and emails</p>
          </div>
          
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="contactFormEnabled"
                name="contactFormEnabled"
                type="checkbox"
                checked={contactInfo.contactFormEnabled}
                onChange={handleChange}
                className="h-4 w-4 text-[#028b6e] focus:ring-[#028b6e] rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="contactFormEnabled" className="font-medium text-gray-700">Enable contact form</label>
              <p className="text-gray-500">Display a contact form on your support page for user inquiries</p>
            </div>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <h3 className="text-sm font-medium text-blue-800">Contact Information Tips</h3>
            <ul className="mt-2 text-xs text-blue-700 space-y-1">
              <li>Provide clear contact hours to set customer expectations</li>
              <li>Consider adding live chat for faster customer support</li>
              <li>Regularly monitor your support email for timely responses</li>
              <li>Include your business registration information if required by local regulations</li>
            </ul>
          </div>
        </div>

        {/* Action buttons */}
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