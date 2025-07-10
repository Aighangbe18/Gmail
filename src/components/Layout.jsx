// src/components/Layout.jsx
import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  const [expanded, setExpanded] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Update window width on resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-collapse on mobile
  useEffect(() => {
    if (windowWidth < 768) setExpanded(false);
    else setExpanded(true);
  }, [windowWidth]);

  const isMobile = windowWidth < 768;

  return (
    <div className="h-screen flex flex-col bg-blue-50">
      {/* Navbar always visible */}
      <Navbar expanded={expanded} setExpanded={setExpanded} />

      <div className="flex flex-1 relative overflow-hidden">
        {/* Sidebar */}
        <Sidebar expanded={expanded} setExpanded={setExpanded} />

        {/* Transparent background when sidebar open on mobile */}
        {expanded && isMobile && (
          <div
            className="fixed inset-0 bg-transparent z-30 md:hidden"
            onClick={() => setExpanded(false)}
          />
        )}

        {/* Main Content */}
        <main
          className={`flex-1 transition-all duration-300 overflow-y-auto bg-white rounded-3xl m-2 p-4 z-10
            ${expanded && isMobile ? "blur-sm pointer-events-none" : ""}
          `}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
