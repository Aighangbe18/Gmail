import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { X } from "lucide-react";

export default function Compose() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [labels, setLabels] = useState([]);
  const [showCompose, setShowCompose] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("from", user.email);
    formData.append("to", to);
    formData.append("subject", subject);
    formData.append("body", body);
    if (attachment) formData.append("attachment", attachment);
    formData.append("labels", JSON.stringify(labels));

    try {
      await axios.post("http://localhost:5000/api/emails/send", formData);
      navigate("/inbox");
    } catch (err) {
      console.error("Error sending email:", err);
      alert("Failed to send email.");
    }
  };

  const toggleLabel = (label) => {
    setLabels((prev) =>
      prev.includes(label)
        ? prev.filter((l) => l !== label)
        : [...prev, label]
    );
  };

  return (
    <Layout>
      {showCompose && (
        <div className="fixed bottom-4 text-black right-4 w-[95%] sm:w-[500px] bg-white shadow-xl rounded-lg overflow-hidden border border-gray-300 z-50 max-h-[90vh] flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between bg-gray-100 px-4 py-2 border-b">
            <h3 className="text-sm font-semibold text-gray-700">New Message</h3>
            <button
              onClick={() => setShowCompose(false)}
              className="text-gray-600 hover:text-red-500"
            >
              <X size={18} />
            </button>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="px-4 py-3 space-y-3 flex-1 overflow-y-auto"
          >
            {/* To Field */}
            <div className="flex items-center gap-2">
              <label className="text-sm w-12 shrink-0">To</label>
              <input
                type="email"
                placeholder="recipient@example.com"
                className="flex-1 border-b p-1 text-sm focus:outline-none"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                required
              />
            </div>

            {/* Subject Field */}
            <div className="flex items-center gap-2">
              <label className="text-sm w-12 shrink-0">Subject</label>
              <input
                type="text"
                placeholder="Subject"
                className="flex-1 border-b p-1 text-sm focus:outline-none"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
            </div>

            {/* Message Body */}
            <textarea
              placeholder="Compose your message..."
              className="w-full p-2 text-sm rounded h-50 resize-none focus:outline-none"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
            />

            {/* Attachment + Labels + Send Button */}
            <div className="flex items-center justify-between flex-wrap gap-3 mt-2">
              <div className="flex items-center gap-2 flex-wrap">
                <input
                  type="file"
                  onChange={(e) => setAttachment(e.target.files[0])}
                  className="text-xs"
                />
                {["Starred", "Important"].map((label) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => toggleLabel(label)}
                    className={`px-2 py-1 rounded text-xs border ${
                      labels.includes(label)
                        ? "bg-blue-100 text-blue-600 border-blue-300"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      )}
    </Layout>
  );
}
