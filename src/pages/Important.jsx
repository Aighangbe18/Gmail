// Important.jsx
import Layout from "../components/Layout";

export default function Important() {
  return (
    <Layout>
      <h1 className="text-lg md:text-xl font-semibold text-gray-800 p-4">Important</h1>
      <p className="text-gray-500 px-4">No important emails found.</p>
    </Layout>
  );
}