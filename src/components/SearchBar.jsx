import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [q, setQ] = useState("");
  const [read, setRead] = useState("");
  const [label, setLabel] = useState("");

  const handleSearch = () => {
    onSearch({ q, read, label });
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
      <input
        type="text"
        placeholder="Search emails..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
        className="p-2 border rounded w-full sm:w-64"
      />

      <select
        value={read}
        onChange={(e) => setRead(e.target.value)}
        className="p-2 border rounded"
      >
        <option value="">All</option>
        <option value="true">Read</option>
        <option value="false">Unread</option>
      </select>

      <select
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        className="p-2 border rounded"
      >
        <option value="">All Labels</option>
        <option value="Starred">Starred</option>
        <option value="Important">Important</option>
      </select>

      <button
        onClick={handleSearch}
        className="bg-black text-white px-4 py-2 rounded"
      >
        Search
      </button>
    </div>
  );
}
