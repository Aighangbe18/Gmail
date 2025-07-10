import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import Layout from "../components/Layout";
import axios from "axios";

export default function Profile() {
  const { user, logout, setUser } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(user?.avatar || "");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

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
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    if (password) formData.append("password", password);
    if (avatar) formData.append("avatar", avatar);

    try {
      const res = await axios.put(`http://localhost:5000/api/auth/update/${user._id}`, formData);
      setUser(res.data.user);
      setMessage("✅ Profile updated successfully.");
    } catch (err) {
      setMessage("❌ Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow mt-6">
        <h2 className="text-xl font-semibold mb-4">My Profile</h2>

        {message && <p className="mb-4 text-sm text-center text-blue-600">{message}</p>}

        <form onSubmit={handleUpdate} className="space-y-4">
          {/* Avatar Upload */}
          <div className="flex items-center gap-4">
            <img
              src={preview || "/default-avatar.png"}
              alt="Avatar"
              className="w-16 h-16 rounded-full object-cover"
            />
            <input type="file" onChange={(e) => setAvatar(e.target.files[0])} />
          </div>

          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">New Password (optional)</label>
            <input
              type="password"
              placeholder="Leave blank to keep current"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="flex justify-between items-center">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
            <button
              type="button"
              onClick={logout}
              className="text-red-500 hover:underline"
            >
              Logout
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
