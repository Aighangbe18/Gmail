// ViewEmail.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../components/Layout";

export default function ViewEmail() {
  const { id } = useParams();
  const [email, setEmail] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/emails/${id}`).then((res) => setEmail(res.data));
  }, [id]);

  const handleDelete = async () => {
    await axios.delete(`http://localhost:5000/api/emails/${id}`);
    navigate("/");
  };

  if (!email) return <Layout><div className="p-4 text-gray-500">Loading...</div></Layout>;

  return (
    <Layout>
      <div className="p-4 max-w-3xl mx-auto">
        <h2 className="text-xl font-bold mb-2 text-gray-800">{email.subject}</h2>
        <p className="text-sm text-gray-600 mb-2">From: {email.from}</p>
        <p className="text-sm text-gray-600 mb-4">To: {email.to}</p>
        <p className="whitespace-pre-wrap text-gray-800 mb-6">{email.body}</p>
        <button onClick={handleDelete} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
          Delete
        </button>
        <button className="bg-blue-500 ml-10 hover:bg-blue-900 px-4 py-2 text-white rounded"
        onClick={ () => navigate ("/compose")}> Reply</button>
      </div>
    </Layout>
  );
}
