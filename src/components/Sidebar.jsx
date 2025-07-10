import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Inbox, Send, Star, AlertCircle, Clock, FileText, MessageCircle,
  CalendarClock, Mail, ShieldAlert, Trash2, Users, Bell, FolderKanban,
  Tag, PlusCircle, UploadCloud, Pen, ChevronDown
} from "lucide-react";

export default function Sidebar({ expanded, setExpanded }) {
  const [showMore, setShowMore] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const location = useLocation();

  const toggleMore = () => setShowMore(!showMore);
  const toggleCategories = () => setShowCategories(!showCategories);
  const isActive = (path) => location.pathname === path;

  const menuItemClass = (path) =>
    `flex items-center space-x-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200
     ${isActive(path)
        ? "bg-blue-100 text-black font-semibold"
        : "text-gray-700 hover:bg-gray-200 hover:text-black"}`;

  const renderLink = (to, label, Icon) => (
    <li>
      <Link to={to} className={menuItemClass(to)} onClick={() => setExpanded(false)}>
        <Icon size={20} className="shrink-0" />
        {expanded && <span>{label}</span>}
      </Link>
    </li>
  );

  const SidebarContent = (
    <div className="p-4">
      {expanded && (
        <button className="bg-blue-200 text-black w-40 h-15 py-4 px-4 rounded-2xl font-normal text-xl mb-4 flex shadow-md hover:bg-blue-300 transition">
          <Pen className="mr-3" />
          <Link to="/compose"> Compose</Link>
        </button>
      )}

      <ul className="space-y-1 text-sm">
        {renderLink("/inbox", "Inbox", Inbox)}
        {renderLink("/labels/starred", "Starred", Star)}
        {renderLink("/snoozed", "Snoozed", Clock)}
        {renderLink("/sent", "Sent Mail", Send)}
        {renderLink("/drafts", "Drafts", FileText)}
        <li className="w-full">
          <button onClick={toggleMore} className={menuItemClass("")}>
            <ChevronDown className="text-black cursor-pointer" size={18} />
            {expanded && <span>{showMore ? " Less" : " More"}</span>}
          </button>
        </li>

        {showMore && (
          <>
            {renderLink("/labels/important", "Important", AlertCircle)}
            {renderLink("/chats", "Chats", MessageCircle)}
            {renderLink("/scheduled", "Scheduled", CalendarClock)}
            {renderLink("/all-mail", "All Mail", Mail)}
            {renderLink("/spam", "Spam", ShieldAlert)}
            {renderLink("/trash", "Trash", Trash2)}

            <li onClick={toggleCategories} className="cursor-pointer">
              <div className={menuItemClass("")}>
                <Users size={20} />
                {expanded && <span>Categories</span>}
              </div>
              {showCategories && expanded && (
                <ul className="ml-8 mt-2 space-y-2">
                  {renderLink("/categories/social", "Social", Users)}
                  {renderLink("/categories/updates", "Updates", Bell)}
                  {renderLink("/categories/forums", "Forums", FolderKanban)}
                  {renderLink("/categories/promotions", "Promotions", UploadCloud)}
                </ul>
              )}
            </li>
          </>
        )}

        <hr className="my-3 border-gray-200" />

        {renderLink("/manage-labels", "Manage Labels", FolderKanban)}
        {renderLink("/create-label", "Create Label", PlusCircle)}
        {renderLink("/labels", "All Labels", Tag)}
        {renderLink("/upgrade", "Upgrade", UploadCloud)}
      </ul>
    </div>
  );

  return (
    <>
      {/* ✅ Desktop Sidebar (unchanged) */}
      <div className={`
        ${expanded ? "w-64" : "w-20"}
        h-screen bg-blue-50 overflow-y-auto border-r shadow-sm
        transition-all duration-300 z-40 hidden md:block fixed md:relative top-0 left-0
      `}>
        {SidebarContent}
      </div>

      {/* ✅ Mobile Sidebar Drawer */}
      {expanded && (
        <><div
  className="fixed inset-0 bg-transparent z-40 md:hidden"
  onClick={() => setExpanded(false)}
/>


          <div className="fixed top-0 left-0 w-64 h-screen bg-blue-50 z-50 shadow-lg transition-transform md:hidden">
            {SidebarContent}
          </div>
        </>
      )}
    </>
  );
}
