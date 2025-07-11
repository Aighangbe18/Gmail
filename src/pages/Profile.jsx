import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import Layout from "../components/Layout";
import axios from "axios";
import { Camera } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user, logout, setUser } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(user?.avatar || "");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login"); // Redirect if not logged in
    }
  }, [user]);

  useEffect(() => {
    if (avatar) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(avatar);
    }
  }, [avatar]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!user || !user._id) {
      setMessage("❌ Cannot update profile: User not found.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    if (password) formData.append("password", password);
    if (avatar) formData.append("avatar", avatar);

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/auth/update/${user._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setUser(res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setMessage("✅ Profile updated successfully.");
    } catch (err) {
      console.error("Update error:", err);
      setMessage("❌ Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <Layout>
      <div className="max-w-2xl mx-auto mt-10 px-6 py-8 bg-white rounded-3xl shadow-xl border border-gray-100">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">My Profile</h2>

        {message && (
          <div className="mb-6 text-center text-sm text-white bg-blue-600 px-4 py-2 rounded-lg shadow">
            {message}
          </div>
        )}

        <form onSubmit={handleUpdate} className="space-y-6">
          {/* Avatar Upload */}
          <div className="flex flex-col items-center gap-2 relative">
            <div className="relative group cursor-pointer">
              <img
                src={preview || "/default-avatar.png"}
                alt="Avatar"
                className="w-24 h-24 rounded-full object-cover ring-2 ring-blue-400 transition duration-300"
              />
              <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 rounded-full cursor-pointer transition">
                <Camera size={20} className="text-white" />
                <input
                  type="file"
                  onChange={(e) => setAvatar(e.target.files[0])}
                  className="hidden"
                />
              </label>
            </div>
            <p className="text-xs text-gray-500">Click to change profile picture</p>
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 outline-none"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 outline-none"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password <span className="text-xs text-gray-500">(leave blank to keep current)</span>
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 outline-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-between items-center pt-4">
            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-2 text-white font-semibold rounded-lg transition duration-200 ${
                loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>

            <button
              type="button"
              onClick={logout}
              className="text-red-500 hover:underline font-medium"
            >
              Logout
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
