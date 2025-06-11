import React, { useState, useRef } from 'react';
import { X, Upload } from 'lucide-react';

// Create a proper interface for the form data
interface CreatorFormData {
  firstName: string;
  lastName: string;
  username: string;
  displayName: string;
  email: string;
  walletBalance: string;
  gender: string;
  password: string;
  confirmPassword: string;
  bio: string;
  featured: boolean;
  status: string;
  verifiedEmail: boolean;
  verifiedId: boolean;
  verifiedAccount: boolean;
  avatar: File | null;
}

interface CreateCreatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (formData: CreatorFormData) => void; // Use the typed interface instead of any
}

export default function CreateCreatorModal({ isOpen, onClose, onCreate }: CreateCreatorModalProps) {
  const [formData, setFormData] = useState<CreatorFormData>({
    firstName: '',
    lastName: '',
    username: '',
    displayName: '',
    email: '',
    walletBalance: '',
    gender: 'male',
    password: '',
    confirmPassword: '',
    bio: '',
    featured: false,
    status: 'active',
    verifiedEmail: false,
    verifiedId: false,
    verifiedAccount: false,
    avatar: null,
  });
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [passwordMatch, setPasswordMatch] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const target = e.target as HTMLInputElement;
      setFormData({ ...formData, [name]: target.checked });
    } else if (type === 'file') {
      const target = e.target as HTMLInputElement;
      if (target.files && target.files[0]) {
        const file = target.files[0];
        if (file.size > 5 * 1024 * 1024) {
          alert('Avatar must be smaller than 5MB!');
          return;
        }
        setFormData({ ...formData, [name]: file });
        setAvatarPreview(URL.createObjectURL(file));
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
    
    // Check password confirmation
    if (name === 'password' || name === 'confirmPassword') {
      const isMatch = name === 'password' 
        ? value === formData.confirmPassword
        : formData.password === value;
      setPasswordMatch(isMatch);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setPasswordMatch(false);
      return;
    }
    
    onCreate(formData);
    onClose();
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl shadow-2xl w-[95vw] md:w-[800px] p-8 relative max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-600 hover:text-red-500">
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold text-[#028b6e] mb-8 text-center">Add New Creator</h2>
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First row - Avatar and name fields */}
          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {/* Avatar upload */}
            <div className="flex flex-col items-center justify-center gap-3">
              <div 
                className="w-32 h-32 rounded-full border-2 border-dashed border-[#028b6e] flex items-center justify-center overflow-hidden cursor-pointer bg-gray-50 hover:border-[#025f4c] transition-colors"
                onClick={triggerFileInput}
              >
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Avatar Preview" className="w-full h-full object-cover" />
                ) : (
                  <Upload size={36} className="text-[#028b6e]" />
                )}
              </div>
              <input
                type="file"
                ref={fileInputRef}
                name="avatar"
                accept="image/*"
                onChange={handleChange}
                className="hidden"
              />
              <p className="text-xs text-gray-500 text-center">
                Avatar must be smaller than 5MB!
              </p>
            </div>
            
            {/* First Name, Last Name */}
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="p-3 border rounded-xl focus:ring-2 focus:outline-none focus:ring-[#028b6e]"
                />
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="p-3 border rounded-xl focus:ring-2 focus:outline-none focus:ring-[#028b6e]"
                />
              </div>
            </div>
          </div>
          
          {/* Rest of the form fields */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="p-3 border rounded-xl focus:ring-2 focus:outline-none focus:ring-[#028b6e]"
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Display Name</label>
            <input
              type="text"
              name="displayName"
              value={formData.displayName}
              onChange={handleChange}
              required
              className="p-3 border rounded-xl focus:ring-2 focus:outline-none focus:ring-[#028b6e]"
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="p-3 border rounded-xl focus:ring-2 focus:outline-none focus:ring-[#028b6e]"
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Wallet Balance</label>
            <input
              type="number"
              name="walletBalance"
              value={formData.walletBalance}
              onChange={handleChange}
              step="0.01"
              className="p-3 border rounded-xl focus:ring-2 focus:outline-none focus:ring-[#028b6e]"
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={3}
              className="p-3 border rounded-xl focus:ring-2 focus:outline-none focus:ring-[#028b6e]"
              placeholder="Creator's bio or description"
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Gender</label>
            <div className="flex gap-6 p-3 border rounded-xl">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={formData.gender === 'male'}
                  onChange={handleChange}
                  className="text-[#028b6e] h-4 w-4"
                />
                <span>Male</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={formData.gender === 'female'}
                  onChange={handleChange}
                  className="text-[#028b6e] h-4 w-4"
                />
                <span>Female</span>
              </label>
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className={`p-3 border rounded-xl focus:ring-2 focus:outline-none ${
                formData.password && !passwordMatch 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'focus:ring-[#028b6e]'
              }`}
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className={`p-3 border rounded-xl focus:ring-2 focus:outline-none ${
                formData.confirmPassword && !passwordMatch 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'focus:ring-[#028b6e]'
              }`}
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="p-3 border rounded-xl focus:ring-2 focus:outline-none focus:ring-[#028b6e]"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          
          {/* Verification checkboxes */}
          <div className="flex flex-col gap-3 p-3 border rounded-xl">
            <label className="text-sm font-medium text-gray-700">Verification</label>
            
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="verifiedEmail"
                checked={formData.verifiedEmail}
                onChange={handleChange}
                className="rounded text-[#028b6e] h-4 w-4"
              />
              <span className="text-sm">Verified Email</span>
            </label>
            
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="verifiedId"
                checked={formData.verifiedId}
                onChange={handleChange}
                className="rounded text-[#028b6e] h-4 w-4"
              />
              <span className="text-sm">Verified ID</span>
            </label>
            
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="verifiedAccount"
                checked={formData.verifiedAccount}
                onChange={handleChange}
                className="rounded text-[#028b6e] h-4 w-4"
              />
              <span className="text-sm">Verified Account</span>
            </label>
          </div>
          
          <div className="flex flex-col gap-3 p-3 border rounded-xl">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="rounded text-[#028b6e] h-4 w-4"
              />
              <span className="text-sm font-medium">Featured Creator</span>
            </label>
            <p className="text-xs text-gray-500">Featured creators are displayed prominently on the platform</p>
          </div>
          
          {!passwordMatch && (
            <p className="text-red-500 text-sm md:col-span-2 text-center">Passwords do not match</p>
          )}
          
          <div className="md:col-span-2 flex justify-center mt-4">
            <button
              type="submit"
              className="bg-[#028b6e] hover:bg-[#025f4c] text-white px-12 py-3 rounded-xl font-medium transition-transform hover:scale-[1.02]"
            >
              Create Creator
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}