// src/components/SidebarHeader.jsx
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";

export default function SidebarHeader({ expanded, setExpanded }) {
  return (
    <div className="flex items-center space-x-3">
      {/* Menu button for all screen sizes */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="text-gray-600 hover:text-gray-800 focus:outline-none hidden md:block"
      >
        <Menu size={22} />
      </button>

      {/* Gmail Logo */}
      <img
        src="/gm.jpg"
        alt="Gmail M Logo"
        className="w-8 h-6 ml-2 sm:ml-4"
      />

      {/* Gmail Text (hide on small screens) */}
      <Link
        to="/"
        className="text-lg sm:text-xl font-semibold text-gray-700 hidden sm:block"
      >
        Gmail
      </Link>
    </div>
  );
}
