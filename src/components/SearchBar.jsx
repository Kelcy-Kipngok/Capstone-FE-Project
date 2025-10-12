import React, { useState } from "react";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query.trim());
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center justify-center mt-6 gap-2"
    >
      <input
        type="text"
        placeholder="Search for books by title, author, or keyword..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-3/4 sm:w-2/3 md:w-1/2 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
      />
      <button
        type="submit"
        className="px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;
