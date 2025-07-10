import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import Layout from "../components/Layout";

export default function Starred() {
  const [starredEmails, setStarredEmails] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchStarred = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/emails/starred/${user.email}`
        );
        setStarredEmails(res.data);
      } catch (error) {
        console.error("Failed to fetch starred emails:", error);
      }
    };

    if (user?.email) fetchStarred();
  }, [user]);

  return (
    <Layout>
      <div className="px-4 py-6">
        <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-gray-800">
          Starred
        </h2>

        {starredEmails.length === 0 ? (
          <p className="text-gray-500">No starred emails.</p>
        ) : (
          <ul className="space-y-3">
            {starredEmails.map((email) => (
              <li
                key={email._id}
                className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition p-4 cursor-pointer"
              >
                <Link to={`/email/${email._id}`} className="block space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-800 text-sm truncate max-w-[70%]">
                      {email.from || "Unknown Sender"}
                    </span>
                    <span className="text-xs text-gray-400 whitespace-nowrap">
                      {new Date(email.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-gray-900 text-sm font-semibold truncate max-w-[80%]">
                      {email.subject || "(No Subject)"}
                    </p>
                    <Star className="text-yellow-400 shrink-0" size={16} />
                  </div>

                  <p className="text-gray-600 text-sm truncate">{email.body}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Layout>
  );
}
