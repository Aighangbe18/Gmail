import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../lib/api';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { Eye, EyeOff, Mail } from 'lucide-react'; // Eye icons

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    try {
      const res = await API.post('/auth/login', { email, password });
      const { user, token } = res.data;

      API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('token', token);
      login(user);

      toast.success('Login successful!');
      navigate('/inbox');
    } catch (err) {
      const message = err.response?.data?.error || 'Login failed. Try again.';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 font-roboto">
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-md bg-white rounded-xl shadow-lg p-8"
      >
        <div className="flex justify-center mb-6">
          <img
            src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_r5.png"
            alt="Gmail"
            className="h-12"
          />
        </div>

        <h2 className="text-2xl font-medium text-gray-800">Sign in</h2>
        <p className="text-sm text-gray-500 mb-4">to continue to Gmail</p>

        {/* 🔵 Google Button */}
        <button
          type="button"
          className="w-full flex items-center justify-center gap-3 border border-gray-300 py-2 rounded-md hover:bg-gray-100 transition mb-4"
          onClick={() => toast('Google login not implemented')}
        >
          <img
            src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_r5.png"
            alt="Google"
            className="w-5 h-5"
          />
          <span className="text-sm font-medium text-gray-700">Continue with Google</span>
        </button>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-4">
          <hr className="flex-grow border-gray-300" />
          <span className="text-sm text-gray-400">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email or phone"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border text-black border-gray-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-500 px-4 py-2 rounded-md outline-none"
            required
            disabled={loading}
          />

          {/* Password with eye icon */}
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 text-black focus:border-blue-600 focus:ring-1 focus:ring-blue-500 px-4 py-2 rounded-md outline-none pr-10"
              required
              disabled={loading}
            />
            <button
              type="button"
              onClick={togglePassword}
              className="absolute top-2 right-3 text-gray-500 hover:text-gray-700"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className="text-right">
            <a href="#" className="text-sm text-blue-600 hover:underline">
              Forgot password?
            </a>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className={`${
                loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
              } text-white px-6 py-2 rounded-md transition font-medium flex items-center justify-center gap-2`}
            >
              {loading && (
                <svg
                  className="w-4 h-4 animate-spin text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
              )}
              {loading ? 'Logging in...' : 'Next'}
            </button>
          </div>
        </form>

        <div className="mt-6 text-sm text-gray-600 text-center">
          Don’t have an account?{' '}
          <a href="/register" className="text-blue-600 hover:underline">
            Create account
          </a>
        </div>
      </motion.div>

      <div className="absolute bottom-4 text-sm text-gray-500">
        English (United States)
      </div>
    </div>
  );
}
