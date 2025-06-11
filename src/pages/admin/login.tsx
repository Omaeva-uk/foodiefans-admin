import { useState, useEffect } from "react";
import { useRouter } from "next/router";
// import axios from "axios"; // Keep for future API integration
import { Eye, EyeOff, Lock, Mail } from "lucide-react";

// Define types for validation errors
interface ValidationErrors {
  email?: string;
  password?: string;
}

export default function AdminLoginPage() {
  const [formValues, setFormValues] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const router = useRouter();

  useEffect(() => {
    const videoElement = document.getElementById('background-video') as HTMLVideoElement;
    if (videoElement) {
      videoElement.onloadeddata = () => {
        videoElement.play().catch(e => console.error("Video autoplay failed:", e));
      };
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors: ValidationErrors = {};
    if (!formValues.email) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)) newErrors.email = 'Invalid email';
    if (!formValues.password) newErrors.password = 'Password is required';
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    console.log("Admin form submission started");
    e.preventDefault();
    
    const validationErrors = validate();
    console.log("Admin validation results:", validationErrors);
    
    if (Object.keys(validationErrors).length > 0) {
      console.log("Admin validation failed, setting errors");
      setErrors(validationErrors);
    } else {
      console.log("Admin validation passed, proceeding with login");
      
      try {
        console.log("Checking admin credentials for:", formValues.email);
        
        // HARDCODED CREDENTIALS FOR DEVELOPMENT
        let mockResponse;
        
        // ADMIN CREDENTIALS (matches client login system)
        if (formValues.email === "admin@foodiefan.com" && formValues.password === "admin123") {
          console.log("Admin credentials matched successfully");
          mockResponse = {
            data: {
              message: 'Admin login successful',
              role: 'admin',
              user: {
                id: 'admin-1',
                name: 'Super Admin',
                email: formValues.email,
                permissions: ['all'],
                role: 'admin'
              }
            }
          };
        }
        // BACKUP ADMIN CREDENTIALS (alternative)
        else if (formValues.email === "superadmin@foodiefan.com" && formValues.password === "superadmin123") {
          console.log("Super admin credentials matched");
          mockResponse = {
            data: {
              message: 'Super Admin login successful',
              role: 'admin',
              user: {
                id: 'admin-2',
                name: 'Super Administrator',
                email: formValues.email,
                permissions: ['all'],
                role: 'admin'
              }
            }
          };
        }
        else {
          console.log("No admin credential match found");
          throw new Error('Invalid admin credentials');
        }
        
        console.log("Admin mock response data:", mockResponse.data);
        
        // Store admin data in localStorage (same pattern as client)
        console.log("Storing admin data in localStorage");
        localStorage.setItem('user', JSON.stringify(mockResponse.data.user));
        localStorage.setItem('userRole', mockResponse.data.role);
        localStorage.setItem('isAdmin', 'true'); // Additional admin flag
        
        console.log("Admin login successful, redirecting to dashboard");
        alert('Admin login successful!');
        
      
        router.push('/admin/dashboard');
        
      } catch (error) {
        console.log("Error in admin login process");
        console.error(error);
        alert('Invalid admin credentials. Use: admin@foodiefan.com / admin123');
      }

      /*  REAL API INTEGRATION
      
      try {
        console.log("Calling real admin API...");
        const response = await axios.post('http://localhost:3001/admin/login', formValues);
        console.log("API Response:", response.data);
        
        // Store real API response
        localStorage.setItem('auth_token', response.data.access_token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('userRole', response.data.user.role);
        localStorage.setItem('isAdmin', 'true');
        
        alert('Admin login successful!');
        router.push('/admin/dashboard');
        
      } catch (error) {
        console.error("API Error:", error);
        if (error.response?.status === 401) {
          alert('Invalid admin credentials');
        } else if (error.response?.status === 403) {
          alert('Access denied. Admin privileges required.');
        } else {
          alert('Login failed. Please check your connection and try again.');
        }
      }
      */
    }
  };

  return (
    <div 
      className="min-h-screen w-full max-w-[1920px] mx-auto flex items-center justify-center overflow-hidden relative"
      style={{
        backgroundImage: 'url(/adminbg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay to darken the background image */}
      <div className="absolute inset-0 bg-green/40 z-0"></div>
      
      {/* Masked video background - centered with 95% width */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div
          className="w-[95%] mx-auto overflow-hidden"
          style={{
      
            maskImage: 'url(/shape1.svg)',
            WebkitMaskImage: 'url(/shape1.svg)',
            
            maskSize: '100% 100%',
            WebkitMaskSize: '100% 100%',
            
            maskPosition: 'center',
            WebkitMaskPosition: 'center',
            
            maskRepeat: 'no-repeat',
            WebkitMaskRepeat: 'no-repeat',
           
            boxShadow: '0 5px 25px rgba(0,0,0,0.15)'
          }}
        >
          <div className="relative w-full h-full">
            <video
              id="background-video"
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src="/fans1.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            
            {/* Optional gradient overlay on the video */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          </div>
        </div>
      </div>

      {/* Login Form */}
      <div className="bg-white/30 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/30 w-[90vw] md:w-[400px] z-20 relative">
        <img src="/logo-white.png" alt="FoodieFans Admin" className="h-10 mx-auto mb-8" />
        <h2 className="text-2xl font-bold text-center text-white mb-6">Admin Login</h2>
        
  
        <div className="mb-4 p-3 bg-blue-100/20 backdrop-blur-sm rounded-lg text-xs text-center border border-white/20">
          <p className="font-semibold text-white">Admin Test Credentials:</p>
          <p className="text-blue-100">admin@foodiefan.com / admin123</p>
          <p className="text-blue-100">superadmin@foodiefan.com / superadmin123</p>
        </div>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="relative">
            <input
              type="email"
              name="email"
              placeholder="Admin Email"
              value={formValues.email}
              onChange={handleChange}
              className="w-full p-3 pl-10 rounded-full border-none focus:ring-2 focus:ring-white focus:outline-none bg-white/60"
            />
            <Mail size={20} className="absolute left-3 top-3 text-[#4EB596]" />
            {errors.email && <p className="text-red-100 text-xs mt-1 pl-3">{errors.email}</p>}
          </div>
          
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formValues.password}
              onChange={handleChange}
              className="w-full p-3 pl-10 rounded-full border-none focus:ring-2 focus:ring-white focus:outline-none bg-white/60"
            />
            <Lock size={20} className="absolute left-3 top-3 text-[#4EB596]" />
            <div
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 cursor-pointer text-[#4EB596]"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </div>
            {errors.password && <p className="text-red-100 text-xs mt-1 pl-3">{errors.password}</p>}
          </div>
          
          <button
            type="submit"
            className="w-full bg-white text-[#4EB596] p-3 rounded-full font-medium transition-all hover:shadow-lg mt-2"
          >
            Login as Admin
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-white/80 text-sm">
            FoodieFans Admin Portal
          </p>
          <p className="text-white/60 text-xs mt-1">
            {/* Development Mode - Hardcoded Auth */}
            Secure Admin Access
          </p>
        </div>
      </div>
    </div>
  );
}