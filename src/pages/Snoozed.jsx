// src/pages/Snoozed.jsx
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";

export default function Snoozed() {
  const [emails, setEmails] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user?.email) return;
    axios.get(`http://localhost:5000/api/emails/snoozed/${user.email}`).then((res) => {
      setEmails(res.data);
    });
  }, [user]);

  return (
    <Layout>
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Snoozed</h2>

      {emails.length === 0 ? (
        <p className="text-gray-500">You have no snoozed emails.</p>
      ) : (
        <ul className="space-y-2">
          {emails.map((email) => (
            <li
              key={email._id}
              className="bg-white p-4 rounded-lg shadow-sm hover:bg-gray-100 transition cursor-pointer"
            >
              <Link to={`/email/${email._id}`} className="block">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold text-sm">{email.from}</span>
                  <span className="text-xs text-gray-400">
                    {new Date(email.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <p className="text-sm text-gray-800 font-medium truncate">{email.subject}</p>
                <p className="text-sm text-gray-600 truncate">{email.body}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
    </Layout>
  );
}
