// src/pages/Settings.jsx
import Layout from "../components/Layout";
import {
  Bell,
  Sparkles,
  LayoutList,
  Palette,
  Save,
} from "lucide-react";
import { useState } from "react";

export default function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [smartCompose, setSmartCompose] = useState(true);
  const [conversationView, setConversationView] = useState(true);
  const [theme, setTheme] = useState("light");

  return (
    <Layout>
      <div className="p-6 max-w-4xl mx-auto text-black">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Settings</h2>

        <div className="space-y-8">
          {/* GENERAL SETTINGS */}
          <section>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-blue-600">
              <Bell size={18} /> General Preferences
            </h3>
            <div className="space-y-4 bg-white shadow rounded-lg p-4 border border-gray-200">
              <Toggle
                label="Enable Notifications"
                value={notifications}
                onChange={() => setNotifications(!notifications)}
              />
              <Toggle
                label="Smart Compose Suggestions"
                value={smartCompose}
                onChange={() => setSmartCompose(!smartCompose)}
              />
              <Toggle
                label="Conversation View"
                value={conversationView}
                onChange={() => setConversationView(!conversationView)}
              />
            </div>
          </section>

          {/* THEME SETTINGS */}
          <section>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-blue-600">
              <Palette size={18} /> Theme
            </h3>
            <div className="bg-white shadow rounded-lg p-4 border border-gray-200">
              <select
                className="w-full px-4 py-2 border rounded text-sm focus:outline-none"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
              >
                <option value="light">Default Light</option>
                <option value="dark">Dark Mode</option>
                <option value="custom">Custom Theme</option>
              </select>
            </div>
          </section>

          {/* SAVE BUTTON */}
          <div className="flex justify-end">
            <button className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition">
              <Save size={18} /> Save Changes
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

// Reusable toggle component
function Toggle({ label, value, onChange }) {
  return (
    <label className="flex justify-between items-center text-sm font-medium">
      <span>{label}</span>
      <div
        onClick={onChange}
        className={`w-10 h-5 flex items-center rounded-full p-1 cursor-pointer transition duration-300 ${
          value ? "bg-blue-600" : "bg-gray-300"
        }`}
      >
        <div
          className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform ${
            value ? "translate-x-5" : ""
          }`}
        />
      </div>
    </label>
  );
}
