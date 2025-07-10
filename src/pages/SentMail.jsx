import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function SentMail() {
  const { user } = useAuth();
  const [sentEmails, setSentEmails] = useState([]);

  useEffect(() => {
    if (!user?.email) return;

    const fetchSent = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/emails/sent/${user.email}`);
        setSentEmails(res.data);
      } catch (err) {
        console.error("Failed to fetch sent emails", err);
      }
    };

    fetchSent();
  }, [user]);

  return (
    <Layout>
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">Sent</h2>

        {sentEmails.length === 0 ? (
          <p className="text-gray-500 text-sm">No sent emails yet.</p>
        ) : (
          <ul className="space-y-2">
            {sentEmails.map((email) => (
              <li
                key={email._id}
                className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md hover:bg-gray-50 transition cursor-pointer"
              >
                <Link to={`/email/${email._id}`} className="block">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium text-sm text-gray-700">To: {email.to}</span>
                    <span className="text-xs text-gray-400">
                      {new Date(email.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <div className="text-sm text-gray-800 font-medium truncate">{email.subject}</div>
                  <div className="text-sm text-gray-600 line-clamp-2">{email.body}</div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Layout>
  );
}
