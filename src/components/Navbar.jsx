// src/components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  HelpCircle,
  Settings,
  Bot,
  Grid,
  UserCircle2,
  ChevronDown,
  Search,
  Menu,
} from "lucide-react";
import SidebarHeader from "./SidebarHeader";
import { useState, useEffect } from "react";

export default function Navbar({ expanded, setExpanded }) {
  const { user, logout } = useAuth();
  const [showSupport, setShowSupport] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setIsTyping(e.target.value.length > 0);
  };

  // Optional: Close menus when clicking outside
  useEffect(() => {
    const closeMenus = (e) => {
      if (!e.target.closest(".profile-menu")) setProfileOpen(false);
      if (!e.target.closest(".support-menu")) setShowSupport(false);
    };
    window.addEventListener("click", closeMenus);
    return () => window.removeEventListener("click", closeMenus);
  }, []);

  return (
    <nav className="bg-blue-50 border-b border-gray-200 px-4 py-2 flex items-center justify-between shadow-sm h-16 z-50 relative">
      {/* LEFT: Mobile Menu + Logo */}
      <div className="flex items-center space-x-2">
        <button
          className="md:hidden text-gray-700"
          onClick={() => setExpanded((prev) => !prev)}
        >
          <Menu size={24} />
        </button>
        <SidebarHeader expanded={expanded} setExpanded={setExpanded} />
      </div>

      {/* CENTER: Search */}
      <div className="hidden sm:block flex-1 px-6 max-w-3xl">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-4 text-black" />
          <input
            type="text"
            onChange={handleChange}
            placeholder="Search mail"
            className={`w-full h-13 pl-10 pr-10 py-2 rounded-full text-black text-sm focus:outline-none transition-colors duration-200 ${
              isTyping ? "bg-white" : "bg-gray-100"
            }`}
          />
          <ChevronDown
            className="absolute right-3 top-4 text-black cursor-pointer"
            size={18}
          />
        </div>
      </div>

      {/* RIGHT: Icons and Profile */}
      <div className="flex items-center space-x-4 text-gray-600">
        {/* Help Menu */}
        <div className="relative support-menu">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowSupport((prev) => !prev);
              setProfileOpen(false);
            }}
            className="hover:text-gray-800"
          >
            <HelpCircle size={22} />
          </button>
          {showSupport && (
            <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-md shadow-lg text-sm z-50">
              <ul className="py-2 px-3 text-gray-700">
                <li className="py-1 hover:bg-gray-100 cursor-pointer">Help</li>
                <li className="py-1 hover:bg-gray-100 cursor-pointer">Training</li>
                <li className="py-1 hover:bg-gray-100 cursor-pointer">Updates</li>
                <li className="py-1 hover:bg-gray-100 cursor-pointer">Send Feedback</li>
              </ul>
            </div>
          )}
        </div>

        {/* Icons */}
        <button
          title="Settings"
          onClick={() => navigate("/settings")}
          className="hover:text-gray-800"
        >
          <Settings size={22} />
        </button>
        <button title="Gemini" className="hover:text-gray-800">
          <Bot size={22} />
        </button>
        <button title="Apps" className="hover:text-gray-800">
          <Grid size={22} />
        </button>

        {/* Profile Dropdown */}
        {user ? (
          <div className="relative profile-menu">
            <button
              className="hover:text-gray-800"
              onClick={(e) => {
                e.stopPropagation();
                setProfileOpen((prev) => !prev);
                setShowSupport(false);
              }}
            >
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt="Avatar"
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <UserCircle2 size={28} />
              )}
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                <div className="px-4 py-3 text-sm text-gray-700 border-b">
                  Signed in as<br />
                  <strong>{user.email}</strong>
                </div>
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-gray-100 text-gray-700 text-sm"
                >
                  My Profile
                </Link>
                <div
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500 text-sm"
                  onClick={() => {
                    logout();
                    navigate("/login");
                  }}
                >
                  Logout
                </div>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="text-blue-500 hover:underline text-sm">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
