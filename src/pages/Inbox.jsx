import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { io } from "socket.io-client";
import { Star } from "lucide-react";
import Layout from "../components/Layout";

export default function Inbox() {
  const [emails, setEmails] = useState([]);
  const { user } = useAuth();

  // Fetch emails
  useEffect(() => {
    if (!user?.email) return;

    const fetchInbox = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/emails/inbox/${user.email}`);
        setEmails(res.data);
      } catch (error) {
        console.error("Failed to fetch inbox:", error);
      }
    };

    fetchInbox();
  }, [user]);

  // Real-time socket
  useEffect(() => {
    if (!user?.email) return;

    const socket = io("http://localhost:5000");

    socket.on("emailReceived", (email) => {
      if (email.to === user.email) {
        setEmails((prev) => [email, ...prev]);
      }
    });

    return () => socket.disconnect();
  }, [user]);

  if (!user) {
    return <div className="p-6 text-gray-500">Loading...</div>;
  }

  return (
    <Layout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">Inbox</h2>
        <span className="text-sm text-gray-500 mt-1 sm:mt-0">{emails.length} message(s)</span>
      </div>

      {emails.length === 0 ? (
        <p className="text-gray-500 text-center mt-10">No emails in your inbox.</p>
      ) : (
        <div className="bg-white rounded-md border border-gray-200 shadow-sm overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {emails.map((email) => (
              <li key={email._id} className="hover:bg-gray-100 transition-colors duration-200">
                <Link
                  to={`/email/${email._id}`}
                  className="flex flex-col sm:flex-row sm:items-center justify-between px-4 py-3 space-y-1 sm:space-y-0"
                >
                  {/* Left: From and subject */}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-800 truncate">
                      {email.from || "Unknown Sender"}
                    </p>
                    <p className="text-sm text-gray-600 truncate">
                      {email.subject || "(No Subject)"}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {email.body || "No message preview"}
                    </p>
                  </div>

                  {/* Right: Time and star */}
                  <div className="flex items-center gap-2 ml-4 shrink-0">
                    <Star size={18} className="text-yellow-400" />
                    <span className="text-xs text-gray-500">
                      {new Date(email.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Layout>
  );
}
